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
import { Switch } from "react-native";


import style from "../Styles.js/StylesAdicionarQuestaoLista";
import Styles from "../Styles.js/StylesHome";

export default function AdicionarAvaliacao() {
  const [descricao, setDescricao] = useState("");
  const [isSuggestion, setIsSuggestion] = useState(true);


  const navigation = useNavigation();
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser?.uid;

  const handleSubmit = async () => {
    if (!descricao) {
      Alert.alert("Preencha todos os campos obrigatórios!");
      return;
    }

    await saveData();
    Alert.alert("Avaliação enviada com sucesso!");
    clearForm();
    navigation.goBack();
  };

  const clearForm = () => {
    setDescricao("");
  };

  const saveData = async () => {
    try {

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", user));
      const querySnapshot = await getDocs(q);

      const email = querySnapshot.empty ? "" : querySnapshot.docs[0].data().email;
      const nome = querySnapshot.empty ? "" : querySnapshot.docs[0].data().nome;
      const isProfessor = querySnapshot.empty ? false : querySnapshot.docs[0].data().souProfessor;

      const rateData = {
        nome: nome,
        email: email,
        tipo: isSuggestion ? "Sugestão" : "Problema",
        descricao: descricao,
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

        <Text style={Styles.frase}>Como está sendo sua experiência?</Text>

        <View style={style.inputContainer}>
          <Text style={Styles.txtInput}>Descrição:</Text>
          <TextInput
            style={[Styles.input, { height: 100, width:'97%' }]}
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
          <Text style={Styles.txtInput}>Sugestão</Text>
          <Switch
            value={!isSuggestion}
            onValueChange={(value) => setIsSuggestion(!value)}
            trackColor={{ false: "#f4f3f4", true: "#f4f3f4" }}
            thumbColor={isSuggestion ? "#FFB9BD" : "#FFB9BD"}
          />
          <Text style={Styles.txtInput}>Problema</Text>
        </View>

        <View>
            <Text style={Styles.txtAllert}>Em breve, você receberá nossa resposta por e-mail.</Text>
        </View>

        <View style={Styles.containerBotao}>
          <TouchableOpacity style={Styles.botao} onPress={handleSubmit}>
            <Text style={Styles.txtBotao}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
