import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, BackHandler, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { getFirestore, where, collection, query, getDocs } from "firebase/firestore";
import Styles from "../Styles.js/StylesEstatisticasQuestions";
import { Ionicons } from '@expo/vector-icons';

export default function EstatisticasQuestoes() {
  const navigation = useNavigation();
  const route = useRoute();
  const listId = route.params.itemId;
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getQuestionStats = async () => {
      const db = getFirestore(FIREBASE_APP);
      const listAlunoRef = collection(db, "ListaAluno");
      const listAlunoQuery = query(listAlunoRef, where("codigo", "==", listId));
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
      setLoading(false);
    }

    getQuestionStats();
  }, [listId]);

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
    <View style={Styles.resultadoQuestoes}>
      <View style={Styles.voltar}>
        <TouchableOpacity style={Styles.paginationButton} onPress={() => navigation.navigate('Listas')}>
          <Ionicons name="arrow-back" style={Styles.iconStyle} />
        </TouchableOpacity>
      </View>

      {
        loading ? (
          <View style={Styles.loadingContainer}>
            <ActivityIndicator size="50" color="#EFEFFE" style={Styles.loadingElement}></ActivityIndicator>
            <Text style={Styles.loadingText}>Carregando Estatísticas...</Text>
          </View>
        ) : (
          questoes.length > 0 ? (
            <ScrollView contentContainerStyle={Styles.scrollContent}>
              {questoes.map((questao, index) => (
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
                  <TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('StackNav', { screen: 'Questao', params: { listId, index } })}>
                    <Text style={Styles.buttonText}>Ver Questão</Text>
                  </TouchableOpacity>
                </View>
              ))
              }
            </ScrollView>
          ) : (
            <View style={Styles.emptyContainer}>
              <View style={Styles.emptyMessage}>
                <Text style={Styles.emptyText}>Nenhuma questão respondida ainda</Text>
                <TouchableOpacity
                  style={Styles.backButton}
                  onPress={() => navigation.navigate("Listas")}
                >
                  <Text style={Styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )}
    </View>
  );
};
