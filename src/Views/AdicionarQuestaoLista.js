import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import style from "../Styles.js/StylesAdicionarQuestaoLista";
import Styles from "../Styles.js/StylesHome";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getFirestore, setDoc, collection } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AdicionarQuestao() {
  const [pergunta, setPergunta] = useState("");
  const [resposta1, setResposta1] = useState("");
  const [resposta2, setResposta2] = useState("");
  const [resposta3, setResposta3] = useState("");
  const [resposta4, setResposta4] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  const [descritor, setDescritor] = useState("");

  const navigation = useNavigation();

  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser.uid;

  const handleSubmit = () => {
    Alert.alert("Questão Adicionada com Sucesso!");
    clearForm();
    saveData();
    navigation.navigate("Listas");
  };

  const clearForm = () => {
    setPergunta("");
    setResposta1("");
    setResposta2("");
    setResposta3("");
    setResposta4("");
    setRespostaCorreta("");
    setUrlImagem("");
    setDescritor("");
  };

  const saveData = async () => {
    const refUser = doc(db, "users", user);
    const refCreatedQuestions = collection(refUser, "createdQuestions");

    const questionData = {
      pergunta,
      respostaCorreta,
      respostas: [resposta1, resposta2, resposta3, resposta4],
      urlImagem,
      descritor,
    };

    try {
      await setDoc(doc(refCreatedQuestions), questionData);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.voltar}>
        <TouchableOpacity
          style={style.paginationButton}
          onPress={() => clearForm() || navigation.navigate("Listas")}
        >
          <Ionicons name="arrow-back" style={style.iconStyle} />
        </TouchableOpacity>
      </View>
      <View style={style.infoContainer}>
        <TouchableOpacity>
          <AntDesign name="infocirlceo" size={34} style={style.antDesign} />
        </TouchableOpacity>
      </View>
      <Text style={Styles.frase}>Adicionar Questão</Text>
      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>Pergunta:</Text>
        <TextInput
          style={Styles.input}
          value={pergunta}
          onChangeText={setPergunta}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>Resposta 1:</Text>
        <TextInput
          style={Styles.input}
          value={resposta1}
          onChangeText={setResposta1}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>Resposta 2:</Text>
        <TextInput
          style={Styles.input}
          value={resposta2}
          onChangeText={setResposta2}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>Resposta 3:</Text>
        <TextInput
          style={Styles.input}
          value={resposta3}
          onChangeText={setResposta3}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>Resposta 4:</Text>
        <TextInput
          style={Styles.input}
          value={resposta4}
          onChangeText={setResposta4}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>Resposta Correta:</Text>
        <TextInput
          style={Styles.input}
          value={respostaCorreta}
          onChangeText={setRespostaCorreta}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>URL da Imagem:</Text>
        <TextInput
          style={Styles.input}
          value={urlImagem}
          onChangeText={setUrlImagem}
        />
      </View>

      <View style={style.inputContainer}>
        <Text style={Styles.txtInput}>Descritor:</Text>
        <View style={Styles.input}>
          <Picker
            selectedValue={descritor}
            onValueChange={(itemValue) => setDescritor(itemValue)}
          >
            <Picker.Item
              value="DD1"
              label="Procedimentos de leitura"
              style={style.pickerItem}
            />
            <Picker.Item
              value="DD2"
              label="Coerência e Coesão textual"
              style={style.pickerItem}
            />
            <Picker.Item
              value="DD3"
              label="Variação Linguística"
              style={style.pickerItem}
            />
            <Picker.Item
              value="DD4"
              label="Implicações do gênero textual"
              style={style.pickerItem}
            />
          </Picker>
        </View>
      </View>

      <View style={Styles.containerBotao}>
        <TouchableOpacity style={Styles.botao} onPress={handleSubmit}>
          <Text style={Styles.txtBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
