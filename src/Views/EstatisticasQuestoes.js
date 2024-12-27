import React, { useEffect } from "react";  
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { getAlunosWithList } from "../FuncoesFirebase/ListQuery";
import Styles from "../Styles.js/StylesEstatisticasQuestions";

export default function EstatisticasQuestoes() {
    const navigation = useNavigation();

    const route = useRoute();
    const id = route.params.itemId;

    useEffect(() => {
      const onBackPress = () => {
        navigation.navigate("Listas");
  
        return true;
      };
    
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
    
      return () => backHandler.remove();
    }, []);

  const questoes = [
    {
      id: 1,
      erros: 2,
      acertos: 3,
    },
    {
      id: 2,
      erros: 0,
      acertos: 5,
    },
    {
      id: 3,
      erros: 5,
      acertos: 0,
    },
  ];

  return (
    <ScrollView contentContainerStyle={Styles.scrollContent}>
      <View style={Styles.container}>
        <View style={Styles.content}>
          {[1, 2, 3].map((grupo, index) => (
            <View key={index} style={Styles.card}>
              <View style={Styles.header}>
                <Text style={Styles.headerText}>Questão:</Text>
                <Text style={[Styles.headerText, Styles.errorsHeader]}>Número de erros</Text>
                <Text style={[Styles.headerText, Styles.acertosHeader]}>Acertos</Text>
              </View>
              <View style={Styles.body}>
                {questoes.map((questao) => (
                  <View key={questao.id} style={Styles.bodyRow}>
                    <Text style={Styles.bodyText}>Questão {questao.id}</Text>
                    <Text style={[Styles.bodyText, Styles.errorsBody]}>{questao.erros}</Text>
                    <Text style={[Styles.bodyText, Styles.acertosBody]}>{questao.acertos}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={Styles.button}>
                <Text style={Styles.buttonText}>Ver questões</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
