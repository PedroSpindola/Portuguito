import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import TabNav from "./TabNav";
import LoginNav from "./LoginNav";
import TabNavAluno from "./TabNavAluno";
import { useAuthentication } from "../hooks/useAutentication";
import { userVerification } from "../FuncoesFirebase/Funcoes";
import { updateSequenceDays } from "../FuncoesFirebase/Funcoes";
import LoadingScreen from "../Componentes/LoadingScreen";

export default function Navegacao() {
  const user = useAuthentication();

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [user])

  useEffect(() => {
    const fetchVerification = async () => {
      if (user) {
        try {
          const result = await userVerification(user.email);
          setUserInfo(result);

          await updateSequenceDays(user.email);
        } catch (error) {
          console.error("Erro ao buscar verificação do usuário:", error);
        }
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchVerification();
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {
          !isLoading ? (
            user !== null ? (
              userInfo === 'teacher' ? (
                <TabNav />
              ) : (
                <TabNavAluno />
              )
            ) : (
              <LoginNav />
            )
          ) : (
            <LoadingScreen />
          )
        }
      </NavigationContainer>
    </SafeAreaView>
  );
}
