import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import Styles from "../Styles.js/StyleBattle.js";

export default function Battle({ route, navigation }) {

    const attackEnemy = () => {
        
    }

    const { faseInfo } = route.params;

    const Enemy = ({ txt, faseInfo }) => {
        return (
            <TouchableOpacity
                style={Styles.boxImageButton}
                onPress={() => attackEnemy}
            >
                <Image
                    style={Styles.boxImageImage}
                />
                <Text style={Styles.boxImageButtonText}>{txt}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={require("../Imagens/Trilha_Atividades1.png")}
        >
            {faseInfo.boss && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_high}>
                        <View style={Styles.boxImage}>
                            <Enemy txt={'Boss'} />
                        </View>
                    </View>
                </View>
            )}

            {faseInfo.enemy1 && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_high}>
                        <View style={Styles.boxImage}>
                            <Enemy
                                txt={'Inimigo 1'}
                            />
                        </View>
                    </View>
                </View>
            )}

            {faseInfo.enemy2 && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_center}>
                        <View style={Styles.boxImage}>
                            <Enemy
                                txt={'Inimigo 2'}
                            />
                        </View>
                    </View>
                </View>
            )}

            {faseInfo.enemy3 && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_center}>
                        <View style={Styles.boxImage}>
                            <Enemy
                                txt={'Inimigo 3'}
                            />
                        </View>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}
