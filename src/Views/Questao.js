import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../ListaDeListas/styles";
import Styles from "../Styles.js/StylesDescritores";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { getFirestore, where, collection, query, getDoc, getDocs } from "firebase/firestore";

export default function Questao() {
    const navigation = useNavigation();
    const route = useRoute();
    const listId = route.params.listId;
    const questionIndex = route.params.index - 1;
    const db = getFirestore(FIREBASE_APP);

    const [question, setQuestion] = useState(null);
    const [noImage, setNoImage] = useState(null);
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);

    const getQuestion = async () => {
        try {
            const listCollectionRef = collection(db, "listas");
            const listQuery = query(listCollectionRef, where("codigo", "==", listId));
            const listSnapshot = await getDocs(listQuery);
            const listData = listSnapshot.docs[0].data();
            const questionRef = await getDoc(listData.questoes[questionIndex]);
            const question = questionRef.data();
            setQuestion(question);
        } catch (error) {
            console.log('Erro ao obter questão: ' + error);
        }
    }

    useEffect(() => {
        setShowInitialAnimation(true);

        getQuestion();

        setTimeout(() => {
            setShowInitialAnimation(false);
        }, 2050);
    }, [listId, questionIndex]);

    useEffect(() => {
        const noImageAnimations = [
            require('../Imagens/noImageAnimations/Alertinha.gif'),
            require('../Imagens/noImageAnimations/Lupinha.gif'),
            require('../Imagens/noImageAnimations/Aflito.gif'),
        ];

        if (
            !question?.urlImagem
        ) {
            const randomImage = noImageAnimations[
                Math.floor(Math.random() * noImageAnimations.length)
            ];
            setNoImage(randomImage);
        }
    }, [listId, questionIndex]);

    useEffect(() => {
        const onBackPress = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress
        );

        return () => backHandler.remove();
    }, []);

    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
            <View style={Styles.voltar}>
                <TouchableOpacity
                    style={[styles.paginationButton, styles.paginationLista]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons name="arrow-back" style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
            {question && !showInitialAnimation ? (
                <View style={styles.container}>
                    <View style={styles.containerSalvar}></View>
                    <View style={styles.enunciado}>
                        <View style={styles.backgroundImagem}>
                            {question?.urlImagem && question.urlImagem.startsWith('http') ? (
                                <TouchableOpacity onPress={() => { setIsExpanded(true) }}>
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
                            )
                            }

                            {/* Modal para exibir a imagem expandida */}
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
                        <ScrollView contentContainerStyle={styles.ScrollViewContent}>
                            {/* Mapear o array de respostas */}
                            {question.respostas.map((resposta, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        resposta === question.respostaCorreta
                                            ? [styles.alternativas, styles.selectLabel]
                                            : styles.alternativas,
                                    ]}
                                >
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
                                        {resposta}
                                    </Markdown>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Image
                        style={{
                            flex: 1,
                            width: "100%",
                            aspectRatio: 1,
                        }}
                        source={require("../Imagens/TranFinal.gif")}
                        contentFit="contain"
                    />
                </View>
            )}
        </LinearGradient>
    );
}
