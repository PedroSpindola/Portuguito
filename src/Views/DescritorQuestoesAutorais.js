import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function DescritorQuestoesAutorais() {
  const navigation = useNavigation();

  const route = useRoute();

  const id = route.params.id;

  console.log(id);

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  });

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <View style={Styles.voltar}>
          <TouchableOpacity
            style={Styles.paginationButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <Descritores titulo="Geral" descritor="DD1" id={id} />
        <Descritores
          titulo="Coerência e Coesão Textual"
          descritor="DD2"
          id={id}
        />
        <Descritores titulo="Variação Linguística" descritor="DD3" id={id} />
        <Descritores
          titulo="Implicações do Gênero Textual"
          descritor="DD4"
          id={id}
        />{" "}
        <Descritores
          titulo="Procedimentos de Leitura"
          descritor="DD5"
          id={id}
        />
      </View>
    </LinearGradient>
  );
}
