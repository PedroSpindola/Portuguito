import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Styles from '../Styles.js/StyleMenuAdventure';
import { Ionicons } from '@expo/vector-icons';
import characters from '../data/characters'; // agora JS com require nas imagens
import { LinearGradient } from 'expo-linear-gradient';

export default function MenuAdventure() {
  const navigation = useNavigation();

  // Transformar o objeto em array para navegação
  const characterList = Object.entries(characters).map(([key, value]) => ({
    key,
    ...value
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCharacter = characterList[currentIndex];

  const nextCharacter = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % characterList.length);
  };

  const prevCharacter = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + characterList.length) % characterList.length);
  };

  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={Styles.gradient}>
      <View style={Styles.container}>

        {/* Botões do topo */}
        <View style={Styles.topo}>
          <TouchableOpacity style={Styles.buttonTop} onPress={() => navigation.navigate("AdventureShop")}>
            <Ionicons name="storefront-outline" style={Styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.buttonTop} onPress={() => navigation.navigate("AdventureRanking")}>
            <Ionicons name="podium-outline" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>

        {/* Área do personagem */}
        <View style={Styles.personagemArea}>
          <TouchableOpacity onPress={prevCharacter}>
            <Text style={Styles.seta}>{'<'}</Text>
          </TouchableOpacity>

          <View style={Styles.personagem}>
            <Image
              style={Styles.imagemPersonagem}
              source={currentCharacter.imagemFront}
            />
            <Text style={Styles.caractherName}>{currentCharacter.name}</Text>
          </View>

          <TouchableOpacity onPress={nextCharacter}>
            <Text style={Styles.seta}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Iniciar */}
        <TouchableOpacity
          style={Styles.botaoIniciar}
          onPress={() =>
            navigation.navigate("AdventureFases", {
              screen: "AdventureFases",
              characterInfo: currentCharacter,
              currentFase: 1,
            })
          }>
          <Text style={Styles.textoIniciar}>Iniciar Aventura</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}
