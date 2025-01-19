import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Styles from "../Styles.js/StyleChallengeRanking";
import { useNavigation } from "@react-navigation/native";

const rankingData = Array.from({ length: 50 }, (_, index) => ({
    position: index + 1,
    name: `Aluno ${index + 1}`,
}));

const userPosition = {
    position: 20,
    name: "Marcos",
};

const RankingRow = ({ position, name, isUser = false }) => (
    <View
        style={[
            Styles.row,
            isUser && { backgroundColor: "#E89CA3" },
        ]}
    >
        <Text style={Styles.cell}>{position}</Text>
        <Text style={Styles.cell}>{name}</Text>
    </View>
);

export default function ChallengeRanking () {
    const navigation = useNavigation();

    const modifiedRanking = rankingData.map((item) =>
        item.position === userPosition.position
            ? { ...item, name: `Marcos` }
            : item
    );

    return (
        <View style={Styles.container}>
            {/* Título */}
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Ranking semanal</Text>
            </View>

            {/* Cabeçalho tabela */}
            <View style={Styles.tableHeader}>
                <Text style={[Styles.cell, Styles.columnHeader]}>Posição</Text>
                <Text style={[Styles.cell, Styles.columnHeader]}>Aluno</Text>
            </View>

            {/* Ranking */}
            <ScrollView style={Styles.scrollContainer} persistentScrollbar={true}>
                {modifiedRanking.slice(0, 90).map((item, index) => (
                    <RankingRow
                        key={index}
                        position={item.position}
                        name={item.name}
                        isUser={item.position === userPosition.position}
                    />
                ))}
            </ScrollView>

            {/* Exibe posição do jogador*/}
            <View style={[Styles.row, Styles.userRow]}>
                <Text style={Styles.cell}>{userPosition.position}</Text>
                <Text style={Styles.cell}>{userPosition.name}</Text>
            </View>

            {/* Botão voltar */}
            <TouchableOpacity 
                style={Styles.button}
                onPress={() => 
                    navigation.goBack()
                }
            >
                <Text style={Styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};
