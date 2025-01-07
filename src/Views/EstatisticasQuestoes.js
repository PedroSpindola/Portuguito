import React, { useEffect, useState } from "react";  
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { getFirestore, where, collection, query, getDocs } from "firebase/firestore";
import Styles from "../Styles.js/StylesEstatisticasQuestions";

export default function EstatisticasQuestoes() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.itemId;

  const [questoes, setQuestoes] = useState([]);
  
  const loadQuestoes = async () => {
    const db = getFirestore(FIREBASE_APP);
    const listAlunoRef = collection(db, "ListaAluno");
    const listAlunoQuery = query(listAlunoRef, where("codigo", "==", id));
    const listAlunoSnapshot = await getDocs(listAlunoQuery);

  
    let questoesData = {};

    listAlunoSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.acertoQuestoes && Array.isArray(data.acertoQuestoes)) {
        data.acertoQuestoes.forEach((resultado, index) => {
          const questaoId = index + 1; 
          if (!questoesData[questaoId]) {
            questoesData[questaoId] = { id: questaoId, erros: 0, acertos: 0 };
          }
          if (resultado) {
            questoesData[questaoId].acertos += 1;
          } else {
            questoesData[questaoId].erros += 1;
          }
        });
      }
    });

    const questoesArray = Object.values(questoesData);
    setQuestoes(questoesArray);
  };

  loadQuestoes();

  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate("Listas");
      return true;
    };

    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    
    return () => backHandler.remove();
  }, []);
  
  
  return (
    <ScrollView contentContainerStyle={Styles.scrollContent}>
      <View style={Styles.container}>
        <View style={Styles.card}>
          <View style={Styles.header}>
            <Text style={Styles.headerText}>Questão</Text>
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
      </View>
    </ScrollView>
  );
};
