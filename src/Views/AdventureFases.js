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
    const { characterInfo, currentFase } = route.params;

    const [page, setPage] = useState(0);
    const fasesPerPage = 3;
    const totalFases = enemies.length;


    const backgrounds = [
        require("../Imagens/adventure/area1background1.png"),  
        require("../Imagens/adventure/area2background1.png"),
        require("../Imagens/adventure/area2background1.png"),
        require("../Imagens/adventure/area2background1.png"),
    ];    

    const colors = {  
        life: { bg: "#e74c3c", border: "#b2312b" },
        damage: { bg: "rgba(255, 128, 49, 1)", border: "#d67119ff" },
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

    const FreeFased = ({ txt, faseInfo, characterInfo, currentFase }) => (
        <TouchableOpacity
            style={Styles.boxImageButton}
            onPress={() => navigation.navigate("Battle", { faseInfo, characterInfo, currentFase })}
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
                    <Text style={Styles.statText}>{characterInfo.life}</Text>
                    <Ionicons name="heart" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>

                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.damage.bg, borderColor: colors.damage.border },
                    ]}
                >
                    <Text style={Styles.statText}>{characterInfo.damage}</Text>
                    <Ionicons name="flame" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>

                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.extraTime.bg, borderColor: colors.extraTime.border },
                    ]}
                >
                    <Text style={Styles.statText}>{characterInfo.extraTime}s</Text>
                    <Ionicons name="time" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>
            </View>

            {enemies.slice(page * fasesPerPage, (page + 1) * fasesPerPage).map((faseInfo, i) => {
                const faseNumber = page * fasesPerPage + i + 1;
                const unlocked = faseNumber === currentFase;

                let ajustStyle = Styles.AjustItens_high;
                if (i % 3 === 1) ajustStyle = Styles.AjustItens_center;
                else if (i % 3 === 2) ajustStyle = Styles.AjustItens_low;

                return (
                    <View key={faseNumber} style={Styles.box}>
                        <View style={ajustStyle}>
                            <View style={Styles.boxImage}>
                                {unlocked ? (
                                    <FreeFased
                                        txt={faseNumber}
                                        faseInfo={faseInfo}
                                        characterInfo={characterInfo}
                                        currentFase={currentFase}
                                    />
                                ) : (
                                    <ClosedFased txt={faseNumber} />
                                )}
                            </View>
                        </View>
                    </View>
                );
            })}

            <View style={Styles.paginationContainer}>
                {(page + 1) * fasesPerPage < totalFases && (
                    <TouchableOpacity
                        style={Styles.paginationButton}
                        onPress={() => {
                            const lastFaseIndexOnPage = (page + 1) * fasesPerPage;
                            const requiredFaseToAdvance = lastFaseIndexOnPage;

                            if (true) {
                            // if (currentFase >= requiredFaseToAdvance) {
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
