import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Styles from '../Styles.js/StyleMenuAdventure';
import { Ionicons } from '@expo/vector-icons';
import characters from '../data/characters.json';
import { LinearGradient } from 'expo-linear-gradient';

export default function MenuAdventure() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={Styles.gradient}>
      <View style={Styles.container}>
        <View style={Styles.topo}>
          <TouchableOpacity style={Styles.buttonTop}>
            <Ionicons name="storefront-outline" style={Styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.buttonTop}
            onPress={() =>
              navigation.navigate("AdventureRanking", {
                screen: "AdventureRanking",
              })
            }>
            <Ionicons name="podium-outline" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>

        <View style={Styles.personagemArea}>
          <TouchableOpacity disabled={true} style={{ opacity: 0.4 }}>
            <Text style={Styles.seta}>{'<'}</Text>
          </TouchableOpacity>

          <View style={Styles.personagem}>
            <Image
              style={Styles.imagemPersonagem}
              source={require('../Imagens/adventure/portuguitaFront.png')}
            />
            <Text style={Styles.caractherName}>Portuguita</Text>
          </View>

          <TouchableOpacity disabled={true} style={{ opacity: 0.4 }}>
            <Text style={Styles.seta}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Iniciar */}
        <TouchableOpacity
          style={Styles.botaoIniciar}
          onPress={() =>
            navigation.navigate("AdventureFases", {
              screen: "AdventureFases",
              character: characters['portuguita'],
              currentFase: 1,
            })
          }>
          <Text style={Styles.textoIniciar}>Iniciar Aventura</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
