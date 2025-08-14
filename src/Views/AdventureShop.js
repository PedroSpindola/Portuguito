import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../Styles.js/StyleAdventureShop";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import characters from "../data/characters";

export default function AdventureShop() {
    const navigation = useNavigation();
    const [coins, setCoins] = useState(0);

    const aventureiros = Object.entries(characters).map(([key, value], index) => ({
        id: key,
        title: value.name,
        image: value.imagemFront,
        description: value.description,
        price: value.price
    }));

    const sections = [
        { 
            title: "Aventureiros", 
            data: aventureiros 
        },
        {
            title: "Fotos de Perfil",
            data: [
                { id: "7", title: "Exemplo 1", image: require("../Imagens/adventure/portuguitaBack.png"), description: "Descrição 1", price: 100 },
                { id: "8", title: "Exemplo 2", image: require("../Imagens/adventure/portuguitaBack.png"), description: "Descrição 2", price: 200 },
                { id: "9", title: "Exemplo 3", image: require("../Imagens/adventure/portuguitaBack.png"), description: "Descrição 3", price: 300 },
            ]
        },
        {
            title: "Conquistas",
            data: [
                { id: "10", title: "Exemplo 1", image: require("../Imagens/adventure/portuguitaBack.png"), description: "Descrição 1", price: 100 },
                { id: "11", title: "Exemplo 2", image: require("../Imagens/adventure/portuguitaBack.png"), description: "Descrição 2", price: 200 },
                { id: "12", title: "Exemplo 3", image: require("../Imagens/adventure/portuguitaBack.png"), description: "Descrição 3", price: 300 },
            ]
        }
    ];

    const renderCard = ({ item }) => (
        <View style={Styles.card}>
            <Text style={Styles.cardTitle}>{item.title}</Text>
            <Image source={item.image} style={Styles.cardImage} resizeMode="contain" />
            <Text style={Styles.cardDescription}>{item.description}</Text>
            <View style={Styles.cardPriceContainer}>
                <Ionicons name="logo-usd" size={14} color="#FF6F6F" />
                <Text style={Styles.cardPrice}>{item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Mercado da Aventura</Text>
                <View style={Styles.coinsContainer}>
                    <Ionicons name="logo-usd" size={20} color="#FF6F6F" />
                    <Text style={Styles.coinsText}>{coins}</Text>
                </View>
            </View>

            <ScrollView>
                {sections.map((section, index) => (
                    <View key={index} style={Styles.section}>
                        <Text style={Styles.sectionTitle}>{section.title}</Text>
                        <FlatList
                            data={section.data}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
