import React from "react"; 
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Styles from "../Styles.js/StyleAdventureRanking";
import { useNavigation } from "@react-navigation/native";

const DUMMY_RANKING_DATA = [
    { userId: 'user001', userName: 'Beatriz Costa', fasesConcluidas: 25, position: 1 },
    { userId: 'user002', userName: 'Lucas Martins', fasesConcluidas: 23, position: 2 },
    { userId: 'user003', userName: 'Juliana Alves', fasesConcluidas: 22, position: 3 },
    { userId: 'my_user_id', userName: 'Você (Léo)', fasesConcluidas: 20, position: 4 },
    { userId: 'user005', userName: 'Fernanda Lima', fasesConcluidas: 18, position: 5 },
    { userId: 'user006', userName: 'Rafael Oliveira', fasesConcluidas: 15, position: 6 },
    { userId: 'user007', userName: 'Patrícia Souza', fasesConcluidas: 14, position: 7 },
    { userId: 'user008', userName: 'Thiago Pereira', fasesConcluidas: 12, position: 8 },
    { userId: 'user009', userName: 'Gabriela Santos', fasesConcluidas: 11, position: 9 },
    { userId: 'user010', userName: 'Márcio Ferreira', fasesConcluidas: 10, position: 10 },
];

const CURRENT_USER_ID = 'my_user_id';

const RankingRow = ({ position, nome, fasesConcluidas, isUser = false }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (isUser) {
                    Alert.alert("Ação", "Você clicou na sua própria linha.");
                    return;
                }
                Alert.alert("Visualizar Perfil", `Isso navegaria para o perfil de ${nome}.`);
            }}
            style={[
                Styles.row,
                isUser && { backgroundColor: "#E89CA3" },
            ]}
        >
            <Text style={[Styles.cell, Styles.positionCell]}>{position}</Text>
            <Text style={[Styles.cell, Styles.nameCell]}>{nome}</Text>
            <Text style={Styles.cell}>{fasesConcluidas}</Text>
        </TouchableOpacity>
    );
};

export default function AdventureRanking() {
    const navigation = useNavigation();

    const currentUserData = DUMMY_RANKING_DATA.find(user => user.userId === CURRENT_USER_ID);

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Ranking da Aventura</Text>
            </View>

            <View style={Styles.tableHeader}>
                <Text style={[Styles.cell, Styles.columnHeader]}>Posição</Text>
                <Text style={[Styles.cell, Styles.nameCell, Styles.columnHeader]}>Aluno</Text>
                <Text style={[Styles.cell, Styles.columnHeader]}>{`Mundos\nCompletos`}</Text>
            </View>

            <ScrollView style={Styles.scrollContainer} persistentScrollbar={true}>
                {DUMMY_RANKING_DATA.map((item) => (
                    <RankingRow
                        key={item.userId}
                        position={item.position}
                        nome={item.userName}
                        fasesConcluidas={item.fasesConcluidas}
                        isUser={item.userId === CURRENT_USER_ID}
                    />
                ))}
            </ScrollView>

            {currentUserData && (
                <View style={[Styles.row, Styles.userRow]}>
                    <Text style={[Styles.cell, Styles.positionCell]}>{currentUserData.position}</Text>
                    <Text style={[Styles.cell, Styles.nameCell]}>{currentUserData.userName}</Text>
                    <Text style={Styles.cell}>{currentUserData.fasesConcluidas}</Text>
                </View>
            )}

            <TouchableOpacity
                style={Styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={Styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}