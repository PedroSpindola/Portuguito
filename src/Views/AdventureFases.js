import { useCallback, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Alert,
    BackHandler,
} from "react-native";
import Styles from "../Styles.js/StyleAdventureFases.js";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import enemies from '../data/enemies';

export default function AdventureFases() {
    const navigation = useNavigation();
    const route = useRoute();
    const { character, currentFase } = route.params;

    const [page, setPage] = useState(0);
    const fasesPerPage = 3;
    const totalFases = 6;


    const backgrounds = [
        require("../Imagens/adventure/area1background1.png"),
        require("../Imagens/adventure/area2background1.png"),
    ];

    const colors = {
        life: { bg: "#27ae60", border: "#1e8449" },
        damage: { bg: "#e74c3c", border: "#b2312b" },
        extraTime: { bg: "#3498db", border: "#2a75b0" },
    };

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
                Alert.alert(
                    "Sair da Aventura",
                    "Tem certeza de que deseja abandonar a aventura? Você perderá todo o progresso.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        {
                            text: "Abandonar Aventura",
                            style: "destructive",
                            onPress: () => navigation.goBack(),
                        },
                    ]
                );
                return true;
            });

            return () => backHandler.remove();
        }, [])
    );

    const FreeFased = ({ txt, faseInfo, character, currentFase }) => (
        <TouchableOpacity
            style={Styles.boxImageButton}
            onPress={() => navigation.navigate("Battle", { faseInfo, character, currentFase })}
        >
            <Image style={Styles.boxImageImage} source={require("../Imagens/icone_13.png")} />
            <Text style={Styles.boxImageButtonText}>{txt}</Text>
        </TouchableOpacity>
    );

    const ClosedFased = ({ txt }) => (
        <TouchableOpacity style={Styles.boxImageButton} activeOpacity={1}>
            <Image source={require("../Imagens/icone_14.png")} style={Styles.boxImageImage} />
            <Text style={Styles.boxImageButtonText}>{txt}</Text>
        </TouchableOpacity>
    );

    const renderFases = () => {
        const fases = [];
        const start = page * fasesPerPage;
        const end = Math.min(start + fasesPerPage, totalFases);

        for (let i = start; i < end; i++) {
            const faseNumber = i + 1;
            const unlocked = faseNumber === currentFase;

            let ajustStyle = Styles.AjustItens_high;
            if (i % 3 === 1) ajustStyle = Styles.AjustItens_center;
            else if (i % 3 === 2) ajustStyle = Styles.AjustItens_low;

            fases.push(
                <View key={faseNumber} style={Styles.box}>
                    <View style={ajustStyle}>
                        <View style={Styles.boxImage}>
                            {unlocked ? (
                                <FreeFased
                                    txt={faseNumber}
                                    faseInfo={
                                        enemies[faseNumber - 1]
                                    }                                      
                                    character={character}
                                    currentFase={currentFase}
                                />
                            ) : (
                                <ClosedFased txt={faseNumber} />
                            )}
                        </View>
                    </View>
                </View>
            );
        }
        return fases;
    };

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={backgrounds[page] || backgrounds[0]}
        >
            <View style={Styles.topBar}>
                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.life.bg, borderColor: colors.life.border },
                    ]}
                >
                    <Text style={Styles.statText}>{character.life}</Text>
                    <Ionicons name="heart" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>

                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.damage.bg, borderColor: colors.damage.border },
                    ]}
                >
                    <Text style={Styles.statText}>{character.damage}</Text>
                    <Ionicons name="flame" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>

                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.extraTime.bg, borderColor: colors.extraTime.border },
                    ]}
                >
                    <Text style={Styles.statText}>{character.extraTime}s</Text>
                    <Ionicons name="time" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>
            </View>

            {renderFases()}

            <View style={Styles.paginationContainer}>
                {(page + 1) * fasesPerPage < totalFases && (
                    <TouchableOpacity
                        style={Styles.paginationButton}
                        onPress={() => {
                            const lastFaseIndexOnPage = (page + 1) * fasesPerPage;
                            const requiredFaseToAdvance = lastFaseIndexOnPage;

                            if (currentFase >= requiredFaseToAdvance) {
                                setPage(page + 1);
                            } else {
                                Alert.alert(
                                    "Espere aí",
                                    `Você precisa passar pela última batalha dessa área para avançar até a próxima!`
                                );
                            }
                        }}
                    >
                        <Ionicons name="arrow-down" style={Styles.iconStyle} />
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
}
