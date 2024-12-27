import React, { useState, useEffect } from "react"; 
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Styles from "../Styles.js/StylesEstatisticasAlunos";

export default function EstatisticasAluno() {
  const navigation = useNavigation();

  const route = useRoute();
  const id = route.params.itemId;

  const [informacoes, setInformacoes] = useState([]);

  const alunos = [
    { nome: "Aluno 1", acertos: 5, tentativas: 3, status: "Completo" },
    { nome: "Aluno 2", acertos: 0, tentativas: 2, status: "Incompleto" },
    { nome: "Aluno 3", acertos: 3, tentativas: 1, status: "Parcial" },
  ];

  const handleButtonPress = (aluno) => { 
    setInformacoes((prev) =>
      prev.includes(aluno) ? prev.filter(item => item !== aluno) : [...prev, aluno]
    );
  };

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
      <ScrollView contentContainerStyle={Styles.scrollContainer}>
        {alunos.map((aluno, index) => (
          <View key={index} style={Styles.card}>
            <View style={Styles.cardContent}>
              <Text style={Styles.text}>Aluno: {aluno.nome}</Text>
              <TouchableOpacity style={Styles.button} onPress={() => handleButtonPress(aluno.nome)}>
                <Text style={Styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>
            {informacoes.includes(aluno.nome) && (
              <View style={Styles.infoContainer}>
                <Text style={Styles.infoText}>Acertos: {aluno.acertos}</Text>
                <Text style={Styles.infoText}>Tentativas: {aluno.tentativas}</Text>
                <Text style={Styles.infoText}>Status: {aluno.status}</Text>
                <TouchableOpacity style={Styles.verQuestaoButton}>
                  <Text style={Styles.verQuestaoText}>Ver questão</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
