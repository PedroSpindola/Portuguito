import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Styles from "../Styles.js/StylesMenu";

export default function Menu() {
  const navigation = useNavigation();

  const route = useRoute();
  const id = route.params.itemId;

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

  const Botao = ({ titulo, onPress }) => (
    <TouchableOpacity style={Styles.descritores} onPress={onPress}>
      <Text style={Styles.txtDescritores}>{titulo}</Text>
    </TouchableOpacity>
  );

  const BotaoGrande = ({ titulo, onPress }) => (
    <TouchableOpacity style={Styles.descritoresGrande} onPress={onPress}>
      <Text style={Styles.txtDescritores}>{titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <View style={Styles.containerFilho}>
          <Botao
            titulo="Procedimentos de leitura"
            onPress={() => {
              navigation.navigate("DescritoresProcedimentoLeitura", { id });
            }}
          />
          <Botao
            titulo="Implicações do gênero textual"
            onPress={() => {
              navigation.navigate("DescritorImplicacoesGeneroTextual", { id });
            }}
          />
        </View>
        <View style={Styles.containerFilho}>
          <Botao
            titulo="Variação Linguística"
            onPress={() => {
              navigation.navigate("DescritorVariacaoLinguistica", { id });
            }}
          />
          <Botao
            titulo="Coerência e Coesão textuais"
            onPress={() => {
              navigation.navigate("DescritorCoerenciaCoesaoTextual", { id });
            }}
          />
        </View>
        <View style={Styles.containerFilho}>
          <Botao
            titulo="Relações entre recursos expressivos e efeitos de sentido"
            onPress={() => {
              navigation.navigate("DescritorRelacoesEntreRecursosExpressivos", {
                id,
              });
            }}
          />
          <Botao
            titulo="Questões feitas por você"
            onPress={() => {
              navigation.navigate("DescritorFeitasPorVoce", {
                id,
              });
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
