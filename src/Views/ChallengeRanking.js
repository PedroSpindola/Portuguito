import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Styles from "../Styles.js/StyleChallengeRanking";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";

const RankingRow = ({ position, nome, fasesConcluidas, isUser = false }) => (
    <View
        style={[
            Styles.row,
            isUser && { backgroundColor: "#E89CA3" },
        ]}
    >
        <Text style={[Styles.cell, Styles.positionCell]}>{position}</Text>
        <Text style={[Styles.cell, Styles.nameCell]}>{nome}</Text>
        <Text style={Styles.cell}>{fasesConcluidas}</Text>
    </View>
);

export default function ChallengeRanking() {
    const db = getFirestore(FIREBASE_APP);
    const [currentRankingData, setCurrentRankingData] = useState([]);
    const [oldRankingData, setOldRankingData] = useState([]);
    const [currentUserPosition, setCurrentUserPosition] = useState(null);
    const [oldUserPosition, setOldUserPosition] = useState(null);
    const [showCurrentChallenge, setShowCurrentChallenge] = useState(true);
    const navigation = useNavigation();

    const userId = FIREBASE_AUTH.currentUser?.uid;

    useEffect(() => {
        const fetchCurrentRanking = async () => {
            try {
                const progressRef = collection(db, "desafioProgresso");
                const progressSnapshot = await getDocs(progressRef);

                const usersProgress = [];

                for (const progressDoc of progressSnapshot.docs) {
                    usersProgress.push(progressDoc.data());
                }


                const sortedUsers = usersProgress.sort((a, b) => b.fasesConcluidas - a.fasesConcluidas);


                const rankedUsers = sortedUsers.map((user, index) => ({
                    ...user,
                    position: index + 1,
                }));

                const currentUser = rankedUsers.find((user) => user.userId === userId);
                if (currentUser) {
                    setCurrentUserPosition(currentUser);
                }

                setCurrentRankingData(rankedUsers);
            } catch (error) {
                console.error("Erro ao buscar o ranking: ", error);
            }
        };

        const fetchOldRanking = async () => {
            try {
                const progressRef = collection(db, "ultimoDesafioProgresso");
                const progressSnapshot = await getDocs(progressRef);

                const usersProgress = [];

                for (const progressDoc of progressSnapshot.docs) {
                    usersProgress.push(progressDoc.data());
                }


                const sortedUsers = usersProgress.sort((a, b) => b.fasesConcluidas - a.fasesConcluidas);


                const rankedUsers = sortedUsers.map((user, index) => ({
                    ...user,
                    position: index + 1,
                }));

                const currentUser = rankedUsers.find((user) => user.userId === userId);
                if (currentUser) {
                    setOldUserPosition(currentUser);
                }
                setOldRankingData(rankedUsers);
            } catch (error) {
                console.error("Erro ao buscar o ranking: ", error);
            }
        };

        fetchCurrentRanking();
        fetchOldRanking();
    }, [db, userId]);

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Ranking semanal</Text>
            </View>


            <TouchableOpacity
                onPress={() =>
                    setShowCurrentChallenge(!showCurrentChallenge)
                }
                style={Styles.challengeShow}
            >
                <Text
                    style={[
                        Styles.buttonText,
                        showCurrentChallenge ? Styles.showActive : Styles.showInactive
                    ]}>
                    Atual
                </Text>
                <Text style={[
                    Styles.buttonText,
                    !showCurrentChallenge ? Styles.showActive : Styles.showInactive
                ]}>Anterior</Text>
            </TouchableOpacity>

            <View style={Styles.tableHeader}>
                <Text style={[Styles.cell, Styles.columnHeader]}>Posição</Text>
                <Text style={[Styles.cell, Styles.nameCell, Styles.columnHeader]}>Aluno</Text>
                <Text style={[Styles.cell, Styles.columnHeader]}>{`Fases\nCompletas`}</Text>
            </View>

            <ScrollView style={Styles.scrollContainer} persistentScrollbar={true}>
                {showCurrentChallenge ?
                    (currentRankingData.slice(0, 100).map((item) => (
                        <RankingRow
                            key={item.userId}
                            position={item.position}
                            nome={item.userName}
                            fasesConcluidas={item.fasesConcluidas}
                            isUser={item.userId === userId}
                        />
                    ))) : (oldRankingData.slice(0, 100).map((item) => (
                        <RankingRow
                            key={item.userId}
                            position={item.position}
                            nome={item.userName}
                            fasesConcluidas={item.fasesConcluidas}
                            isUser={item.userId === userId}
                        />
                    )))
                }
            </ScrollView>

            {showCurrentChallenge ? (
                currentUserPosition && (
                    <View style={[Styles.row, Styles.userRow]}>
                        <Text style={[Styles.cell, Styles.positionCell]}>{currentUserPosition.position}</Text>
                        <Text style={[Styles.cell, Styles.nameCell]}>{currentUserPosition.userName}</Text>
                        <Text style={Styles.cell}>{currentUserPosition.fasesConcluidas}</Text>
                    </View>
                )) : (
                oldUserPosition && (
                    <View style={[Styles.row, Styles.userRow]}>
                        <Text style={[Styles.cell, Styles.positionCell]}>{oldUserPosition.position}</Text>
                        <Text style={[Styles.cell, Styles.nameCell]}>{oldUserPosition.userName}</Text>
                        <Text style={Styles.cell}>{oldUserPosition.fasesConcluidas}</Text>
                    </View>
                )
            )}

            < TouchableOpacity
                style={Styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={Styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View >
    );
}

