import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../QuestionStyles/StyleQuestaoNumeroDe";
import LoadingScreen from "../Componentes/LoadingScreen";

export default function QuestaoNumeroDe({ route, navigation }) {
    const { faseInfo, character, currentFase } = route.params;

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const db = getFirestore(FIREBASE_APP);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const ref = collection(db, "questoesNumeroDe");
                const snapshot = await getDocs(ref);
                const total = snapshot.size;
                if (total === 0) {
                    setQuestion(null);
                    setLoading(false);
                    return;
                }
                const randomIndex = Math.floor(Math.random() * total);
                const doc = snapshot.docs[randomIndex];
                setQuestion(doc.data());
            } catch (err) {
                console.error("Erro ao buscar questão:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, []);

    const handleConfirm = () => {
        if (!inputValue.trim()) {
            Alert.alert("Resposta vazia", "Inira o número correspondente");
            return;
        }

        const parsed = parseInt(inputValue.trim(), 10);

        if (isNaN(parsed)) {
            Alert.alert("Erro", "Digite um número válido.");
            return;
        }

        const acertou = parsed === question.numero;
        navigation.navigate("Battle", { faseInfo: faseInfo, acertou, character: character, currentFase });
    };

    if (loading) {
        return (
            <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
                <LoadingScreen />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
            <View style={styles.container}>
                <View style={styles.enunciado}>
                    {question.urlImagem && question.urlImagem.startsWith("http") && (
                        <View style={styles.backgroundImagem}>
                            <TouchableOpacity onPress={() => setIsExpanded(true)}>
                                <ActivityIndicator size="large" color="#EFEFFE" style={styles.loader} />
                                <Image
                                    style={styles.imagem}
                                    source={{ uri: question.urlImagem }}
                                    contentFit="contain"
                                />
                            </TouchableOpacity>

                            <Modal visible={isExpanded} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <TouchableOpacity onPress={() => setIsExpanded(false)}>
                                        <Image source={{ uri: question.urlImagem }} style={styles.fullImage} />
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                    )}

                    <Text
                        style={styles.pergunta}
                    >
                        {question.pergunta}
                    </Text>

                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={inputValue}
                        onChangeText={setInputValue}
                        placeholder="0"
                        maxLength={4}
                    />
                </View>

                <View style={{ marginTop: 30, alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.confirmar, { paddingHorizontal: 40, paddingVertical: 15 }]}
                        onPress={handleConfirm}
                    >
                        <Text style={styles.label}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}
