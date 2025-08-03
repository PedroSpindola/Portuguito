import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { ScrollView } from "react-native-gesture-handler";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../ListaDeListas/styles";
import { RadioButtonGroup, RadioButtonItem } from "../Componentes/RadioButtonGroup";
import LoadingScreen from "../Componentes/LoadingScreen";

export default function QuestaoMultipla({ route, navigation }) {
    const { faseInfo } = route.params;

    const [question, setQuestion] = useState(null);
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [btnRadioClicado, setbtnRadioClicado] = useState(true);
    const [noImage, setNoImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(true);

    const db = getFirestore(FIREBASE_APP);

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            try {
                const questoesRef = collection(db, "questoes");
                const snapshot = await getDocs(questoesRef);
                const total = snapshot.size;
                if (total === 0) {
                    setQuestion(null);
                    return;
                }
                const randomIndex = Math.floor(Math.random() * total);
                const randomDoc = snapshot.docs[randomIndex];
                const questaoData = randomDoc.data();
                setQuestion(questaoData);

                if (!questaoData.urlImagem) {
                    const noImageAnimations = [
                        require('../Imagens/noImageAnimations/Alertinha.gif'),
                        require('../Imagens/noImageAnimations/Lupinha.gif'),
                        require('../Imagens/noImageAnimations/Aflito.gif'),
                    ];
                    const randomImage = noImageAnimations[
                        Math.floor(Math.random() * noImageAnimations.length)
                    ];
                    setNoImage(randomImage);
                }

                setLoadingImage(false);
            } catch (error) {
                console.log("Erro ao buscar questão aleatória: ", error);
            }
        };

        fetchRandomQuestion();

        const timer = setTimeout(() => {
            setShowInitialAnimation(false);
        }, 2050);

        return () => clearTimeout(timer);
    }, []);

    const handleConfirm = () => {
        navigation.navigate("Battle", { faseInfo: faseInfo, acertou: selectedAnswer === question.respostaCorreta });
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>

            {question && !showInitialAnimation ? (
                <>
                    <View style={styles.container}>
                        <View style={styles.enunciado}>
                            <View style={styles.backgroundImagem}>
                                {loadingImage ? (
                                    <ActivityIndicator size="large" color="#EFEFFE" />
                                ) : question.urlImagem && question.urlImagem.startsWith('http') ? (
                                    <TouchableOpacity onPress={() => setIsExpanded(true)}>
                                        <ActivityIndicator size="large" color="#EFEFFE" style={styles.loader} />
                                        <Image
                                            style={styles.imagem}
                                            source={{ uri: question.urlImagem }}
                                            contentFit="contain"
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity>
                                        <Image
                                            style={styles.imagem}
                                            source={noImage}
                                            contentFit="contain"
                                        />
                                    </TouchableOpacity>
                                )}

                                {/* Modal imagem expandida */}
                                <Modal visible={isExpanded} transparent={true} animationType="fade">
                                    <View style={styles.modalContainer}>
                                        <TouchableOpacity onPress={() => setIsExpanded(false)}>
                                            <Image source={{ uri: question.urlImagem }} style={styles.fullImage} />
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>

                            <Markdown
                                style={{
                                    body: {
                                        fontSize: 16,
                                        color: "#fff",
                                        top: 0,
                                        width: "90%",
                                        left: 5,
                                        padding: 5,
                                        textAlign: "left",
                                        fontFamily: "Inder_400Regular",
                                    },
                                }}
                            >
                                {question.pergunta}
                            </Markdown>
                        </View>

                        <View style={styles.container}>
                            <ScrollView style={styles.questoes}>
                                <RadioButtonGroup
                                    selected={selectedAnswer}
                                    onSelected={(selectedAnswer) => {
                                        setSelectedAnswer(selectedAnswer);
                                        setbtnRadioClicado(false);
                                    }}
                                    radioBackground="#F54F59"
                                >
                                    {question.respostas.map((resposta, index) => (
                                        <RadioButtonItem
                                            key={index}
                                            label={
                                                <View
                                                    style={{
                                                        flexDirection: "row-reverse",
                                                        backgroundColor: "#ffb9bd",
                                                        borderRadius: 40,
                                                        width: '90%',
                                                        paddingHorizontal: '3%',
                                                        marginTop: 5,
                                                        height: "auto",
                                                        left: -30,
                                                        position: "relative",
                                                        zIndex: -1,
                                                    }}
                                                >
                                                    <Markdown
                                                        style={{
                                                            body: {
                                                                fontSize: 16,
                                                                color: "#fff",
                                                                top: 0,
                                                                width: "90%",
                                                                left: -0.5,
                                                                padding: 5,
                                                                textAlign: "center",
                                                                fontFamily: "Inder_400Regular",
                                                            },
                                                        }}
                                                    >
                                                        {resposta}
                                                    </Markdown>
                                                </View>
                                            }
                                            value={resposta}
                                            style={{
                                                borderWidth: 1,
                                                borderRadius: 12.5,
                                                borderColor: "#fff",
                                                left: 7,
                                                top: 3,
                                                backgroundColor: '#fff',
                                                width: 25,
                                                height: 25,
                                            }}
                                        />
                                    ))}
                                </RadioButtonGroup>

                                <View style={styles.containerContinuar}>
                                    <TouchableOpacity
                                        style={[styles.confirmar, btnRadioClicado ? styles.btnDesativado : styles.btnAtivado]}
                                        disabled={btnRadioClicado}
                                        onPress={() => {
                                            handleConfirm()
                                            setbtnRadioClicado(true);
                                        }}
                                    >
                                        <Text style={styles.label}>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LoadingScreen />
                </View>
            )}
        </LinearGradient>
    );      
}
