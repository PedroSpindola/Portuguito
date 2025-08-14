import { useCallback, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Alert,
    BackHandler,
    Modal,
    Pressable,
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

    const [modalVisible, setModalVisible] = useState({
        life: false,
        damage: false,
        extraTime: false
    });

    const backgrounds = [
        require("../Imagens/adventure/area1background1.png"),  
        require("../Imagens/adventure/area2background1.png"),
        require("../Imagens/adventure/area3background1.png"),
        require("../Imagens/adventure/area4background1.png"),
        require("../Imagens/adventure/area5background1.png"),
        require("../Imagens/adventure/area6background1.png"),
    ];   
    
    const faseIcon = [
        require("../Imagens/adventure/faseIcon1.png"),
        require("../Imagens/adventure/faseIcon2.png"),
        require("../Imagens/adventure/faseIcon3.png"),
        require("../Imagens/adventure/faseIcon4.png"),
        require("../Imagens/adventure/faseIcon5.png"),
        require("../Imagens/adventure/faseIcon6.png"),
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
            onPress={() => navigation.navigate("Battle", { faseInfo, characterInfo, currentFase, page })}
        >
            <Image style={Styles.boxImageImage} source={faseIcon[page] || faseIcon[0]} />
            <Text style={Styles.boxImageButtonText}>{txt}</Text>
        </TouchableOpacity>
    );

    const ClosedFased = ({ txt }) => (
        <TouchableOpacity style={Styles.boxImageButton} activeOpacity={1}>
            <Image source={faseIcon[page] || faseIcon[0]} style={Styles.boxImageImage} />
            <Text style={Styles.boxImageButtonText}>{txt}</Text>
        </TouchableOpacity>
    ); 


    const renderModal = (type, description) => (
        <Modal
            transparent
            visible={modalVisible[type]}
            animationType="fade"
            onRequestClose={() => setModalVisible(prev => ({ ...prev, [type]: false }))}
        >
            <View style={Styles.modalOverlay}>
                <View style={Styles.modalContainer}>
                    <Text style={Styles.modalTitle}>
                        {type === 'life' ? 'Vida' : type === 'damage' ? 'Dano' : 'Tempo Extra'}
                    </Text>
                    <Text style={Styles.modalDescription}>{description}</Text>
                    <Pressable
                        style={Styles.modalButton}
                        onPress={() => setModalVisible(prev => ({ ...prev, [type]: false }))}
                    >
                        <Text style={Styles.modalButtonText}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={backgrounds[page] || backgrounds[0]}
        >
            <View style={Styles.topBar}>
                <TouchableOpacity
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.life.bg, borderColor: colors.life.border },
                    ]}
                    onPress={() => setModalVisible(prev => ({ ...prev, life: true }))}
                >
                    <Text style={Styles.statText}>{characterInfo.life}</Text>
                    <Ionicons name="heart" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.damage.bg, borderColor: colors.damage.border },
                    ]}
                    onPress={() => setModalVisible(prev => ({ ...prev, damage: true }))}
                >
                    <Text style={Styles.statText}>{characterInfo.damage}</Text>
                    <Ionicons name="flame" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.extraTime.bg, borderColor: colors.extraTime.border },
                    ]}
                    onPress={() => setModalVisible(prev => ({ ...prev, extraTime: true }))}
                >
                    <Text style={Styles.statText}>{characterInfo.extraTime}s</Text>
                    <Ionicons name="time" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>

            {page > 0 && (
                <TouchableOpacity
                    style={Styles.paginationButton}
                    onPress={() => setPage(page - 1)}
                >
                    <Ionicons name="arrow-up" style={Styles.iconStyle} />
                </TouchableOpacity>
            )}

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
                                {/* {unlocked ? ( */}
                                { true ? (
                                    <FreeFased
                                        txt={faseNumber}
                                        faseInfo={faseInfo}
                                        characterInfo={characterInfo}
                                        currentFase={currentFase}
                                        page={page}
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

            {renderModal('life', 'Vida representa quantos pontos de vida seu personagem possui. Se chegar a zero, ele é derrotado.')}
            {renderModal('damage', 'Dano é o quanto de dano seu personagem causa aos inimigos em cada ataque.')}
            {renderModal('extraTime', 'Tempo Extra é o tempo adicional que você tem para responder durante as batalhas.')}
        </ImageBackground>
    );
}
