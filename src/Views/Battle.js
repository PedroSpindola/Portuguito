import React, { useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import Styles from "../Styles.js/StyleBattle.js";
import { Ionicons } from "@expo/vector-icons";

export default function Battle({ route, navigation }) {
    const { faseInfo, acertou, character, currentFase } = route.params;

    const backgrounds = [
        require("../Imagens/adventure/area1background2.png"),
        require("../Imagens/adventure/area2background1.png"),
    ];

    const colors = {
        life: { bg: "#27ae60", border: "#1e8449" },
        damage: { bg: "#e74c3c", border: "#b2312b" },
        extraTime: { bg: "#3498db", border: "#2a75b0" },
    };

    useEffect(() => {
        if (route.params?.hitSuccess !== undefined) {
            if (route.params.hitSuccess) {
                console.log("Resposta correta! Aplicar dano.");
            } else {
                console.log("Resposta incorreta! Sem dano.");
            }
        }
    }, [route.params?.hitSuccess]);

    const attackEnemy = () => {
        const types = ["NumeroDe", "VF", "Multipla", "Completar"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        navigation.navigate(`Questao${randomType}`, { faseInfo, character, currentFase });
    };

    const Enemy = ({ enemy }) => (
        <TouchableOpacity style={Styles.boxImageButton} onPress={attackEnemy}>
            <Image
                style={Styles.boxImageImage}
                source={ enemy.imagem }
            />
            <Text style={Styles.boxImageButtonText}>
                Vida: {enemy.vida} | Dano: {enemy.dano}
            </Text>
        </TouchableOpacity>
    );    

    const getBackground = () => {
        if (currentFase >= 4) {
            return require("../Imagens/adventure/area2background1.png");

        }
        return require("../Imagens/adventure/area1background2.png");
    };
    

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={getBackground()}
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

            <View style={Styles.box}>
                <View style={Styles.AjustItens_center}>
                    <View style={Styles.boxImage}>
                        {faseInfo.map((enemy, index) => (
                            <Enemy
                                key={index}
                                enemy={enemy}
                            />
                        ))}
                    </View>
                </View>
            </View>

            <View style={Styles.box}>
                <View style={Styles.AjustItens_center}>
                    <View style={Styles.boxImage}>
                        <Image
                            style={Styles.boxImagePortuguita}
                            source={require('../Imagens/adventure/portuguitaBack.png')}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );    
}
