import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Styles from "../Styles.js/StyleChallengeRanking";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";

const RankingRow = ({ position, nome, isUser = false }) => (
    <View
        style={[
            Styles.row,
            isUser && { backgroundColor: "#E89CA3" },
        ]}
    >
        <Text style={Styles.cell}>{position}</Text>
        <Text style={Styles.cell}>{nome}</Text>
    </View>
);

export default function ChallengeRanking() {
    const db = getFirestore(FIREBASE_APP);
    const [rankingData, setRankingData] = useState([]);
    const [userPosition, setUserPosition] = useState(null);
    const navigation = useNavigation();

    const userId = FIREBASE_AUTH.currentUser?.uid;

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const usersRef = collection(db, "users");
                const usersSnapshot = await getDocs(usersRef);

                const usersData = [];

                for (const userDoc of usersSnapshot.docs) {
                    const desafioInfoRef = collection(userDoc.ref, "desafioInfo");
                    const desafioInfoSnapshot = await getDocs(desafioInfoRef);

                    if (!desafioInfoSnapshot.empty) {
                        let totalUltimaFaseConcluida = 0;

                        desafioInfoSnapshot.forEach((doc) => {
                            const { ultimaFaseConcluida = 0 } = doc.data();
                            totalUltimaFaseConcluida += ultimaFaseConcluida;
                        });

                        usersData.push({
                            id: userDoc.id,
                            nome: userDoc.data().nome || "Usuário Desconhecido",
                            total: totalUltimaFaseConcluida,
                        });
                    }
                }

                const sortedData = usersData.sort((a, b) => b.total - a.total);
                const rankedData = sortedData.map((item, index) => ({
                    ...item,
                    position: index + 1,
                }));

                const currentUser = rankedData.find((item) => item.id === userId);
                if (currentUser) {
                    setUserPosition(currentUser);
                }

                setRankingData(rankedData);
            } catch (error) {
                console.error("Erro ao buscar o ranking: ", error);
            }
        };

        fetchRanking();
    }, [db, userId]);

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Ranking semanal</Text>
            </View>

            <View style={Styles.tableHeader}>
                <Text style={[Styles.cell, Styles.columnHeader]}>Posição</Text>
                <Text style={[Styles.cell, Styles.columnHeader]}>Aluno</Text>
            </View>

            <ScrollView style={Styles.scrollContainer} persistentScrollbar={true}>
                {rankingData.slice(0, 90).map((item) => (
                    <RankingRow
                        key={item.id}
                        position={item.position}
                        nome={item.nome}
                        isUser={item.id === userId}
                    />
                ))}
            </ScrollView>

            {userPosition && (
                <View style={[Styles.row, Styles.userRow]}>
                    <Text style={Styles.cell}>{userPosition.position}</Text>
                    <Text style={Styles.cell}>{userPosition.nome}</Text>
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

