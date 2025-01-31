import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import Styles from "../Styles.js/StylesRespostaCorretaAluno";
import Styless from "../Styles.js/StylesRespostaIncorretaAluno";
import StylesEnd from "../Styles.js/StylesTerminouListaAluno";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Markdown from "react-native-markdown-display";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { getFirestore, collection, query, where, doc, updateDoc, getDocs, getDoc, addDoc } from "firebase/firestore";
import LoadingScreen from "../Componentes/LoadingScreen";



export default function ChallengeQuestions() {
    const [questoes, setQuestoes] = useState([]);
    const [faseAtual, setFaseAtual] = useState(0);
    const [indice, setIndice] = useState(0);
    const [value, setValue] = useState("");
    const [acertos, setAcertos] = useState(0);
    const [erros, setErros] = useState(0);
    const [correct, setCorrect] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [end, setEnd] = useState(false);
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);
    const [noImage, setNoImage] = useState(null);

    const route = useRoute();
    const navigation = useNavigation();

    const db = getFirestore(FIREBASE_APP);

    const day = route.params.params.day + 1;
    const fase = route.params.params.fase;

    useEffect(() => {
        const setChallengeQuestions = async () => {
            const challengeQuestions = [];

            const collectionRef = collection(db, "questoesDesafio");
            const q = query(collectionRef, where("dia", "==", day), where("fase", "==", fase));

            const querySnapshot = await getDocs(q);

            for (const doc of querySnapshot.docs) {
                const questionRef = doc.data().questao;
                const questionData = (await getDoc(questionRef)).data();
                challengeQuestions.push(questionData);
            }

            setQuestoes(challengeQuestions);
        };

        setChallengeQuestions();
        setFaseAtual(fase);

        setTimeout(() => {
            setShowInitialAnimation(false);
        }, 2050);
    }, [route.params.params.questoes]);

    useEffect(() => {
        const noImageAnimations = [
            require('../Imagens/noImageAnimations/Alertinha.gif'),
            require('../Imagens/noImageAnimations/Lupinha.gif'),
            require('../Imagens/noImageAnimations/Aflito.gif'),
        ];

        if (
            !questoes[indice]?.urlImagem
        ) {
            const randomImage = noImageAnimations[
                Math.floor(Math.random() * noImageAnimations.length)
            ];
            setNoImage(randomImage);
        }
    }, [indice]);

    const conferirQuestao = (respostaCorreta, respostaAluno) => {
        if (respostaCorreta === respostaAluno) {
            setAcertos(acertos + 1);
            setCorrect(true);
        } else {
            setErros(erros + 1);
            setIncorrect(true);
        }
    };

    const proximaQuestao = () => {
        setCorrect(false);
        setIncorrect(false);
        if (indice < questoes.length - 1) {
            setIndice(indice + 1);
        } else {
            setEnd(true);
        }
    };

    const finishActivity = async () => {
        setCorrect(false);
        setIncorrect(false);
        if (acertos > 6) {
            try {
                const userId = route.params.params.userId;
                const dayName = route.params.params.dayName;

                const userRef = doc(db, "users", userId);

                const collectionRef = collection(userRef, "desafioInfo");
                const dayQuery = query(collectionRef, where("dia", "==", dayName));

                const querySnapshot = await getDocs(dayQuery);
                const subTemaDoc = querySnapshot.docs[0];

                const subTemaRef = doc(db, "users", userId, "desafioInfo", subTemaDoc.id);

                const lastCompletedFase = subTemaDoc.data().ultimaFaseConcluida;
                const currentFase = fase;

                if (currentFase > lastCompletedFase) {
                    await updateDoc(subTemaRef, { ultimaFaseConcluida: lastCompletedFase + 1 });

                    const challengeInfoRef = collection(db, "desafioProgresso");
                    const firstChallengeInfoQuery = query(challengeInfoRef, where("userId", "==", userId));
                    const firstChallengeInfoSnapshot = await getDocs(firstChallengeInfoQuery);

                    const userRef = collection(db, "users");
                    const userQuery = query(userRef, where("userId", "==", userId));
                    const userSnapshot = await getDocs(userQuery);
                    const userName = userSnapshot.docs[0].data().nome;

                    if (firstChallengeInfoSnapshot.size === 0) {
                        await addDoc(challengeInfoRef, {
                            userId: userId,
                            userName: userName,
                            fasesConcluidas: 0,
                        });
                    }

                    const challengeInfoQuery = query(challengeInfoRef, where("userId", "==", userId));
                    const challengeInfoSnapshot = await getDocs(challengeInfoQuery);
                    const userProgressRef = challengeInfoSnapshot.docs[0].ref;
                    const fasesConcluidas = challengeInfoSnapshot.docs[0].data().fasesConcluidas;

                    await updateDoc(userProgressRef, {
                        fasesConcluidas: fasesConcluidas + 1,
                    });
                }

            } catch (error) {
                console.error("Erro ao atualizar a última fase concluída: ", error.message);
            }
        }

        navigation.goBack({ reload: true });
    };

    const ModalSad = () => {
        return (
            <Modal animationType="fade" transparent={false} visible={incorrect}>
                <LinearGradient
                    colors={["#D5D4FB", "#9B98FC"]}
                    style={Styless.gradient}
                >
                    <View style={Styless.container}>
                        <View style={Styles.boxTitle}>
                            <Text style={Styles.Title}>
                                QUE PENA
                                <Text style={Styles.SubTitle}>{'\n'}Resposta Incorreta</Text>
                            </Text>
                        </View>

                        <View style={Styless.box}>
                            <View style={Styless.boxImage}>
                                <Image
                                    style={Styless.ImageFormat}
                                    source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                                />
                            </View>

                            <View style={Styless.subDivTag}>
                                <View style={Styless.subSubDivTag}>
                                    <View style={Styless.tagText}>
                                        <Text style={Styless.FontFormat}>Acertos:</Text>
                                    </View>
                                    <View style={Styless.tagText}>
                                        <Text style={Styless.FontFormat}>Erros:</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={Styless.buttomBox}>
                                <TouchableOpacity
                                    style={Styless.buttom}
                                    onPress={() => proximaQuestao()}
                                >
                                    <Text style={[Styless.FontFormatButtom, Styless.shadow]}>
                                        Próxima questão
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        );
    };

    const ModalHappy = () => {
        return (
            <Modal animationType="fade" transparent={false} visible={correct}>
                <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
                    <View style={Styles.container}>
                        <View style={Styles.boxTitle}>
                            <Text style={Styles.Title}>
                                MUITO BEM!
                                <Text style={Styles.SubTitle}>{'\n'}Certa Resposta</Text>
                            </Text>
                        </View>

                        <View style={Styles.box}>
                            <View style={Styles.boxImage}>
                                <Image
                                    style={Styles.ImageFormat}
                                    source={require("../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif")}
                                />
                            </View>

                            <View style={Styles.subDivTag}>
                                <View style={Styles.subSubDivTag}>
                                    <View style={Styles.tagText}>
                                        <Text style={Styles.FontFormat}>Acertos:</Text>
                                    </View>
                                    <View style={Styles.tagText}>
                                        <Text style={Styles.FontFormat}>Erros:</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={Styles.buttomBox}>
                                <TouchableOpacity
                                    style={Styles.buttom}
                                    onPress={() => proximaQuestao()}
                                >
                                    <Text style={[Styles.FontFormatButtom, Styles.shadow]}>
                                        Próxima questão
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        );
    };

    const ModalEnd = () => {
        const acertouTodas = acertos === questoes.length
        return (
            <Modal animationType="fade" transparent={false} visible={end}>
                <LinearGradient
                    colors={["#D5D4FB", "#9B98FC"]}
                    style={StylesEnd.gradient}
                >
                    <View style={StylesEnd.container}>
                        <View style={StylesEnd.boxTitle}>
                            {acertouTodas ? (
                                <Text style={StylesEnd.Title}>
                                    PERFEITO!
                                    <Text style={StylesEnd.SubTitle}>
                                        {'\n'}Você acertou todas e avançou no desafio!
                                    </Text>
                                </Text>
                            ) : acertos > 6 ? (
                                <Text style={StylesEnd.Title}>
                                    PARABÉNS!
                                    <Text style={StylesEnd.SubTitle}>
                                        {'\n'}Você avançou no desafio!
                                    </Text>
                                </Text>
                            ) : (
                                <View>
                                    <Text style={StylesEnd.Title}>
                                        FOI POR POUCO
                                    </Text>
                                    <Text style={StylesEnd.SubTitle}>
                                        {'\n'}Tente novamente...
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={StylesEnd.box}>
                            <View style={StylesEnd.boxImage}>
                                {acertouTodas ? (
                                    <Image
                                        style={StylesEnd.ImageFormat}
                                        source={require("../Imagens/animations/AnimacoesMascoteAcertatudo.gif")}
                                    />
                                ) : acertos > 6 ? (
                                    <Image
                                        style={StylesEnd.ImageFormat}
                                        source={require("../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif")}
                                    />
                                ) : (
                                    <Image
                                        style={StylesEnd.ImageFormat}
                                        source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                                    />
                                )}

                            </View>

                            <View style={StylesEnd.subDivTag}>
                                <View style={StylesEnd.subSubDivTag}>
                                    <View style={StylesEnd.tagText}>
                                        <Text style={StylesEnd.FontFormat}>Acertos: {acertos}</Text>
                                    </View>
                                    <View style={StylesEnd.tagText}>
                                        <Text style={StylesEnd.FontFormat}>Erros: {erros}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={StylesEnd.buttomBox}>
                                <TouchableOpacity
                                    style={StylesEnd.buttom}
                                    onPress={() => finishActivity()}
                                >
                                    <Text style={[StylesEnd.FontFormatButtom, StylesEnd.shadow]}>
                                        Confirmar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        );
    };

    const [isExpanded, setIsExpanded] = useState(false);

    const [btnRadioClicado, setbtnRadioClicado] = useState(true);


    return (

        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
            <ModalHappy />
            <ModalSad />
            <ModalEnd />
            {questoes && questoes[indice] && !showInitialAnimation ? (
                <View style={styles.container}>
                    <View style={styles.enunciado}>
                        <View style={styles.backgroundImagem}>
                            {questoes[indice]?.urlImagem && questoes[indice].urlImagem.startsWith('http') ? (
                                <TouchableOpacity onPress={() => setIsExpanded(true)}>
                                    <Image
                                        style={styles.imagem}
                                        source={{ uri: questoes[indice].urlImagem }}
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
                                        <Image source={{ uri: questoes[indice].urlImagem }} style={styles.fullImage} />
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
                            {questoes[indice].pergunta}
                        </Markdown>
                    </View>

                    <View style={styles.container}>
                        <ScrollView style={styles.questoes}>
                            <RadioButtonGroup
                                selected={value}
                                onSelected={(value) => {
                                    setValue(value)
                                    setbtnRadioClicado(false)
                                }}
                                radioBackground="#F54F59"
                            >

                                {questoes[indice].respostas.map((resposta, index) => (
                                    <RadioButtonItem
                                        key={index}
                                        label={
                                            <View
                                                style={{
                                                    flexDirection: "row-reverse",
                                                    backgroundColor: "#ffb9bd",
                                                    borderRadius: 50,
                                                    width: 300,
                                                    marginTop: 5,
                                                    height: "auto",
                                                    left: -24,
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
                                        style={{ borderWidth: 1, borderColor: "#fff", left: 4, top: 3, backgroundColor: '#fff', width: 25, height: 25 }}
                                    />
                                ))}
                            </RadioButtonGroup>
                            <View style={styles.containerContinuar}>
                                <TouchableOpacity
                                    style={[styles.confirmar, btnRadioClicado ? styles.btnDesativado : styles.btnAtivado]}
                                    disabled={btnRadioClicado}
                                    onPress={() => {
                                        conferirQuestao(
                                            questoes[indice].respostaCorreta,
                                            value
                                        )
                                        setbtnRadioClicado(true)
                                    }}
                                >
                                    <Text style={styles.label}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <LoadingScreen />
                </View>
            )}
        </LinearGradient>
    );
}
