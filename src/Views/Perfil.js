import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesPerfil";
import { onAuthStateChanged } from 'firebase/auth';
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { getAuth, signOut } from "firebase/auth";

export default function Perfil() {
  const [usuario, setUsuario] = useState();

  const logout = () => {
    const auth = getAuth();

    signOut(auth);
  }

  useEffect(() => {
    const fetchData = async (user) => {
      try {
        const usuario = await getInfoUser(user.email);
        setUsuario(usuario);
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
      }
    };

    const unsubscribeFromAuthStateChanged = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchData(user);
      }
    });

    return () => {
      unsubscribeFromAuthStateChanged();
    };
  }, []);

  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
      style={Styles.gradient} >
      <View style={Styles.container}>
        <View style={Styles.backgroundUser}>
          <Image style={Styles.image} source={require("../Imagens/profile/profileBase.jpg")} />
        </View>
        <TouchableOpacity style={[Styles.botao, Styles.sombra]} onPress={() => logout()}>
          <Text style={Styles.txtBotao}>Sair</Text>
        </TouchableOpacity>
        <View style={Styles.containerFilho}>
          <View style={Styles.input}>
            <Text style={Styles.txtInput}>Nome: {usuario ? usuario.nome : ""}</Text>
          </View>
        </View>
        <View style={Styles.containerFilho}>
          <View style={[Styles.input, Styles.campoEmail]}>
            <Text style={Styles.txtInput}>E-mail: {usuario ? usuario.email : ""}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}