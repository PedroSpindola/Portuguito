import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, BackHandler, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { getAlunosWithList } from "../FuncoesFirebase/ListQuery";
import Styles from "../Styles.js/StylesEstatisticasAlunos";
import { Ionicons } from '@expo/vector-icons';

export default function EstatisticasAluno() {
  const [alunos, setAlunos] = useState([]);
  const [informacoes, setInformacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const route = useRoute();
  const id = route.params?.itemId;

  const handleButtonPress = (aluno) => {
    setInformacoes((prev) =>
      prev.includes(aluno) ? prev.filter(item => item !== aluno) : [...prev, aluno]
    );
  };

  useEffect(() => {
    setLoading(true);
    const fetchAlunos = async () => {
      const alunosData = await getAlunosWithList(id);

      setAlunos(alunosData);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }

    fetchAlunos();
  }, [id]);

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

  return (
    <View style={Styles.resultadoAlunos}>
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
          alunos.length > 0 ? (
            <ScrollView contentContainerStyle={Styles.scrollContainer}>
              {
                alunos.map((aluno, index) => (
                  <View key={index} style={Styles.card}>
                    <View style={Styles.cardContent}>
                      <Text style={Styles.text}>Aluno: {aluno.name}</Text>
                      <TouchableOpacity
                        style={Styles.button}
                        onPress={() => handleButtonPress(aluno.name)}
                      >
                        <Text style={Styles.buttonText}>Ver</Text>
                      </TouchableOpacity>
                    </View>
                    {informacoes.includes(aluno.name) && (
                      <View style={Styles.infoContainer}>
                        <Text style={Styles.infoText}>
                          Acertos: {aluno.correctAnswers}
                        </Text>
                        <Text style={Styles.infoText}>
                          Erros: {aluno.incorrectAnswers}
                        </Text>
                        {aluno.finalizeList ? (
                          <Text style={Styles.infoText}>Status: Finalizada</Text>
                        ) : (
                          <Text style={Styles.infoText}>Status: Incompleta</Text>
                        )}
                      </View>
                    )}
                  </View>
                ))
              }
            </ScrollView>
          ) : (
            <View style={Styles.emptyContainer}>
              <View style={Styles.emptyMessage}>
                <Text style={Styles.emptyText}>Nenhum aluno acessou esta lista ainda</Text>
                <TouchableOpacity
                  style={Styles.backButton}
                  onPress={() => navigation.navigate("Listas")}
                >
                  <Text style={Styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )
      }
    </View>
  )
}
