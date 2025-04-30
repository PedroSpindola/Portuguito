import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";

import style from "../Styles.js/StylesAdicionarQuestaoLista";
import Styles from "../Styles.js/StylesHome";

export default function AdicionarAvaliacao() {
  const [nome, setNome] = useState("");
  const [sugestoes, setSugestoes] = useState("");
  const [bugs, setBugs] = useState("");

  const navigation = useNavigation();
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser?.uid;
  const isProfessor = null;

  const handleSubmit = async () => {
    if (!nome || !sugestoes || !bugs) {
      Alert.alert("Preencha todos os campos obrigatórios!");
      return;
    }

    await saveData();
    Alert.alert("Avaliação enviada com sucesso!");
    clearForm();
    navigation.goBack();
  };

  const clearForm = () => {
    setNome("");
    setSugestoes("");
    setBugs("");
  };

  const saveData = async () => {
    try {

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", user));
      const querySnapshot = await getDocs(q);

      const email = querySnapshot.empty ? "" : querySnapshot.docs[0].data().email;
      const isProfessor = querySnapshot.empty ? false : querySnapshot.docs[0].data().souProfessor;

      const rateData = {
        nome,
        email: email,
        sugestoes,
        bugs,
        userId: user,
        data: new Date(),
        souProfessor: isProfessor
      };

      await addDoc(collection(db, "avaliacoes"), rateData);
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
      Alert.alert("Erro ao salvar a avaliação. Tente novamente.");
    }
  };

    return (
      <LinearGradient colors={['#D5D4FB', '#9B98FC']}
      style={Styles.gradient} >
        <ScrollView contentContainerStyle={style.container}>
            <View style={style.voltar}>
                <TouchableOpacity
                    style={style.paginationButton}
                    onPress={() => {
                        clearForm();
                        navigation.goBack();
                    }}
                >
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </TouchableOpacity>
            </View>

            <Text style={Styles.frase}>Avaliar o aplicativo</Text>

            <View style={style.inputContainer}>
                <Text style={Styles.txtInput}>Nome:</Text>
                <TextInput
                    style={Styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
            </View>

            <View style={style.inputContainer}>
                <Text style={Styles.txtInput}>Sugestões e Críticas:</Text>
                <TextInput
                    style={Styles.input}
                    value={sugestoes}
                    onChangeText={setSugestoes}
                />
            </View>

            <View style={style.inputContainer}>
                <Text style={Styles.txtInput}>Problema encontrado:</Text>
                <TextInput
                    style={Styles.input}
                    value={bugs}
                    onChangeText={setBugs}
                />
            </View>

            <View style={Styles.containerBotao}>
                <TouchableOpacity style={Styles.botao} onPress={handleSubmit}>
                    <Text style={Styles.txtBotao}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </LinearGradient>
    );
}
