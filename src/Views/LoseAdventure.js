import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { Image } from 'expo-image';
import styles from "../Styles.js/StyleEndAdventure.js";
import { useFocusEffect } from '@react-navigation/native';

export default function LoseAdventure({ route, navigation }) {
    const { fase } = route.params;
    
    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    navigation.navigate("MenuAdventure");
                    return true;
                }
            );

            return () => backHandler.remove();
        }, [navigation])
    );

    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={styles.gradient}>
            <View style={styles.container}>
                <Text style={styles.title}>Você foi derrotado na fase {fase}!</Text>
                <View style={styles.boxImage}>
                    <Image
                        style={styles.ImageFormat}
                        source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttom}
                    onPress={() => {
                        navigation.navigate("MenuAdventure");
                    }}
                >
                    <Text style={[styles.FontFormatButtom, styles.shadow]}>
                        Retornar ao menu
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
