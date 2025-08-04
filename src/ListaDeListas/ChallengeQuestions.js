import React, { useState, useEffect } from "react";
const {height, width} = Dimensions.get("window")
import { View, TouchableOpacity, Text, Modal, ActivityIndicator, ScrollView, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import Styles from "../Styles.js/StylesRespostaCorretaAluno";
import Styless from "../Styles.js/StylesRespostaIncorretaAluno";
import StylesEnd from "../Styles.js/StylesTerminouListaAluno";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Markdown from "react-native-markdown-display";
import { RadioButtonGroup, RadioButtonItem } from "../Componentes/RadioButtonGroup"
import { getFirestore, collection, query, where, doc, updateDoc, getDocs, getDoc, addDoc } from "firebase/firestore";
import LoadingScreen from "../Componentes/LoadingScreen";
import { reload } from "firebase/auth";

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
    const [loadingImage, setLoadingImage] = useState(true);
    const [showUnlockModal, setShowUnlockModal] = useState(false);

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
        setLoadingImage(false);

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
        setLoadingImage(false);
    };

    const unlockImage = async () => {

        const currentFase = fase;
        let numFases = 0
        if (day == 7) {
            numFases = 30
        } else {
            numFases = 15
        }

        if (currentFase == numFases) {
            const userId = route.params.params.userId;
            const userRef = doc(db, "users", userId);
            const collectionRef = collection(userRef, "userProfiles");
            const imageQuery = query(collectionRef, where("profileName", "==", "pirateProfile"));
            const querySnapshot = await getDocs(imageQuery);
            const imageDoc = querySnapshot.docs[0];
            const hasImage = imageDoc.data().has

            if (hasImage == false) {
                await updateDoc(imageDoc.ref, { has: true })
                setShowUnlockModal(true);
            } else {
                navigation.goBack({ reload: true })
            }
        } else {
            navigation.goBack({ reload: true })
        }
    }

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
            unlockImage();
        }
        navigation.goBack({ reload: true })
        setEnd(false)
    };
    const close = () => {
        setShowUnlockModal(false);
        navigation.goBack({ reload: true })
    }

    const ModalUnlock = () => {
        return (
            <Modal animationType="fade" transparent={false} visible={showUnlockModal}>
                <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styless.gradient}>
                    <View style={Styles.container}>
                        <View style={Styles.boxTitle}>
                            <Text style={Styles.Title}>
                                PARABÉNS!
                                <Text style={Styles.SubTitle}>{'\n'}Você desbloqueou uma nova imagem!</Text>
                            </Text>
                        </View>

                        <View style={Styless.boxImage}>
                            <Image
                                style={{ width: 200, height: 200, marginTop: 100, borderRadius: 20 }}
                                source={require("../Imagens/profile/profilePirate.png")}
                            />
                        </View>

                        <View style={Styles.buttomBox}>
                            <TouchableOpacity
                                style={Styles.buttom}
                                onPress={() => close()}
                            >
                                <Text style={[Styles.FontFormatButtom, Styles.shadow]}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        );
    };


    const ModalSad = () => {
        return (
            <Modal animationType="fade" transparent={false} visible={incorrect}>
                <LinearGradient
                    colors={["#D5D4FB", "#9B98FC"]}
                    style={Styless.gradient}
                >
                    <View style={Styless.container}>
                        <View style={Styles.progressBar}>

                        </View>
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
            <ModalUnlock />


            {questoes && questoes[indice] && !showInitialAnimation ? (
                <>
                    <ScrollView>
                        <View style={styles.progressContainerInfo}>
                            <Text style={styles.infoAcertos}>{acertos}</Text>
                            <View style={styles.progressContainer}>
                                <View style={[styles.progressBar, { width: `${(acertos / questoes.length) * 100}%`, backgroundColor: '#4CAF50' }]} />
                                <View style={[styles.progressBar, { width: `${(erros / questoes.length) * 100}%`, backgroundColor: '#F54F59', left: `${100 - (erros / questoes.length) * 100}%` }]} />
                            </View>
                            <Text style={styles.infoErros}>{erros}</Text>
                        </View>


                        {
                            erros > 3 ? (
                                <Text style={styles.progressInfoWarning}>Não é mais possível avançar de fase</Text>
                            ) : (
                                acertos < 7 ? (
                                    <Text style={styles.progressInfoWarning}>Faltam acertar {7 - acertos} para avançar de fase</Text>
                                ) : (
                                    <Text style={styles.progressInfoSuccessful}>Você já acertou o suficiente para passar de fase!</Text>
                                )
                            )
                        }


                        <View contentContainerStyle={styles.container}>
                            <View style={[styles.enunciado,{marginLeft: width>=360? width*0.13: 0}]}>
                                <View style={styles.backgroundImagem}>
                                    {loadingImage ? (
                                        <ActivityIndicator size="large" color="#EFEFFE"></ActivityIndicator>
                                    ) : (
                                        questoes[indice]?.urlImagem && questoes[indice].urlImagem.startsWith('http') ? (
                                            <TouchableOpacity onPress={() => setIsExpanded(true)}>
                                                <ActivityIndicator size="large" color="#EFEFFE" style={styles.loader}></ActivityIndicator>
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
                                <View style={styles.questoes}>
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
                                                setLoadingImage(true);
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
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </>
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
