import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Image } from 'expo-image';
import styles from "../Styles.js/StyleEndAdventure.js";
import { useFocusEffect } from '@react-navigation/native';
import { doc, getDocs, collection, updateDoc, setDoc, query, where, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";

export default function LoseAdventure({ route, navigation }) {
    const { fase } = route.params;
    const [coinsGained, setCoinsGained] = useState(0);

    const db = getFirestore(FIREBASE_APP);
    const auth = FIREBASE_AUTH;
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const updateProgress = async () => {
            try {
                const userRef = doc(db, "users", userId);
                const adventureInfoCollectionRef = collection(userRef, "adventureInfo");
                const snapshot = await getDocs(adventureInfoCollectionRef);

                let newTotalCoins = 0;
                if (!snapshot.empty) {
                    const adventureDoc = snapshot.docs[0];
                    const data = adventureDoc.data();
                    const coinsToAdd = (5 * (fase - 3)) + 15 * Math.floor((fase - 1) / 3);
                    newTotalCoins = (data.coins || 0) + coinsToAdd;

                    await updateDoc(adventureDoc.ref, {
                        coins: newTotalCoins,
                        lastFaseCompleted: fase - 1
                    });

                    setCoinsGained(coinsToAdd);
                }

                const rankingDocRef = doc(db, "AdventureRanking", userId);
                const rankingDocSnap = await getDoc(rankingDocRef);

                if (rankingDocSnap.exists()) {
                    const currentRankingData = rankingDocSnap.data();
                    if ((fase - 1) > (currentRankingData.lastFaseCompleted || 0)) {
                        await updateDoc(rankingDocRef, { lastFaseCompleted: fase - 1 });
                    }
                } else {
                    await setDoc(rankingDocRef, { userId, lastFaseCompleted: fase - 1 });
                }

            } catch (error) {
                console.error("Erro ao atualizar progresso e ranking:", error);
            }
        };

        updateProgress();
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    navigation.navigate("MenuAdventure");
                    return true;
                }
            );
            return () => backHandler.remove();
        }, [navigation])
    );

    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={styles.gradient}>
            <View style={styles.container}>
                <Text style={styles.title}>Você foi derrotado na fase {fase}!</Text>
                <View style={styles.boxImage}>
                    <Image
                        style={styles.ImageFormat}
                        source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                    />
                </View>
                {coinsGained > 0 &&
                    <Text style={styles.coinsText}>
                        Você obteve {coinsGained} moedas nesta aventura!
                    </Text>
                }
                <TouchableOpacity
                    style={styles.buttom}
                    onPress={() => navigation.navigate("MenuAdventure")}
                >
                    <Text style={[styles.FontFormatButtom, styles.shadow]}>
                        Retornar ao menu
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
