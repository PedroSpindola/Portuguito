import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import style from "../Styles.js/StylesAdicionarQuestaoLista";
import Styles from "../Styles.js/StylesHome";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AdicionarQuestao() {
  const [pergunta, setPergunta] = useState("");
  const [resposta1, setResposta1] = useState("");
  const [resposta2, setResposta2] = useState("");
  const [resposta3, setResposta3] = useState("");
  const [resposta4, setResposta4] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("Pergunta:", pergunta);
    console.log("Resposta 1:", resposta1);
    console.log("Resposta 2:", resposta2);
    console.log("Resposta 3:", resposta3);
    console.log("Resposta 4:", resposta4);
    console.log("Resposta Correta:", respostaCorreta);
    console.log("URL da Imagem:", urlImagem);
  };

  return (
    <View style={style.container}>
      <View style={style.voltar}>
        <TouchableOpacity
          style={style.paginationButton}
          onPress={() => navigation.navigate("Listas")}
        >
          <Ionicons name="arrow-back" style={style.iconStyle} />
        </TouchableOpacity>
      </View>
      <Text style={style.title}>Adicionar Questão</Text>
      <View style={style.inputContainer}>
        <Text>Pergunta:</Text>
        <TextInput
          style={style.input}
          value={pergunta}
          onChangeText={setPergunta}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text>Resposta 1:</Text>
        <TextInput
          style={style.input}
          value={resposta1}
          onChangeText={setResposta1}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text>Resposta 2:</Text>
        <TextInput
          style={style.input}
          value={resposta2}
          onChangeText={setResposta2}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text>Resposta 3:</Text>
        <TextInput
          style={style.input}
          value={resposta3}
          onChangeText={setResposta3}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text>Resposta 4:</Text>
        <TextInput
          style={style.input}
          value={resposta4}
          onChangeText={setResposta4}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text>Resposta Correta:</Text>
        <TextInput
          style={style.input}
          value={respostaCorreta}
          onChangeText={setRespostaCorreta}
          required
        />
      </View>
      <View style={style.inputContainer}>
        <Text>URL da Imagem:</Text>
        <TextInput
          style={style.input}
          value={urlImagem}
          onChangeText={setUrlImagem}
        />
      </View>
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}
