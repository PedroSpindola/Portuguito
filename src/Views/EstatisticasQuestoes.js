import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { getFirestore, where, collection, query, getDocs } from "firebase/firestore";
import Styles from "../Styles.js/StylesEstatisticasQuestions";
import { async } from "@firebase/util";
import { Ionicons } from '@expo/vector-icons';

export default function EstatisticasQuestoes() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.itemId;
  const [questoes, setQuestoes] = useState([]);

  useEffect(() => {
    const getQuestionStats = async () => {
      const db = getFirestore(FIREBASE_APP);
      const listAlunoRef = collection(db, "ListaAluno");
      const listAlunoQuery = query(listAlunoRef, where("codigo", "==", id));
      const listAlunoSnapshot = await getDocs(listAlunoQuery);
      const answersByAluno = [];
      const questionStats = [];

      listAlunoSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.acertoQuestoes) {
          answersByAluno.push(data.acertoQuestoes);
        }
      });

      answersByAluno.forEach((alunoAnswer) => {
        alunoAnswer.forEach((answer, index) => {
          const questaoId = index + 1;
          if (questionStats[questaoId] === undefined) {
            questionStats[questaoId] = { id: questaoId, erros: 0, acertos: 0 };
          }
          
          if (answer) {
            questionStats[questaoId].acertos += 1;
            return;
          }
          questionStats[questaoId].erros += 1;
        });
      });

      setQuestoes(questionStats);
    }

    getQuestionStats();
  }, [id]);

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
                <View style={Styles.voltar}>
                  <TouchableOpacity style={Styles.paginationButton} onPress={() => navigation.navigate('Listas')}>
                    <Ionicons name="arrow-back" style={Styles.iconStyle} />
                </TouchableOpacity>
                </View>
      
      <View style={Styles.container}>
        {questoes.map((questao) => (
          <View key={questao.id} style={Styles.card}>
            <View style={Styles.header}>
              <Text style={Styles.headerText}>Questão</Text>
              <Text style={[Styles.headerText, Styles.acertosHeader]}>Acertos</Text>
            </View>
            <View style={Styles.body}>
              <View style={Styles.bodyRow}>
                <Text style={Styles.bodyText}>{questao.id}</Text>
                <Text style={[Styles.bodyText, Styles.acertosBody]}>{questao.acertos}/{questao.erros + questao.acertos}</Text>
              </View>
            </View>
            <TouchableOpacity style={Styles.button}>
              <Text style={Styles.buttonText}>Ver Questão</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
