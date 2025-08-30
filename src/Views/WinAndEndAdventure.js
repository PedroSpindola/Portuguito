import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { Image } from 'expo-image';
import styles from "../Styles.js/StyleEndAdventure.js";
import { useFocusEffect } from '@react-navigation/native';

export default function WinAndEndAdventure({ route, navigation }) {
    const fase = 21;

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
                <Text style={styles.title}>Você completou o desafio!</Text>
                <View style={styles.boxImage}>
                    <Image
                        style={styles.ImageFormat}
                        source={require("../Imagens/animations/AnimacoesMascoteAcertatudo.gif")}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttom}
                    onPress={() => {
                        navigation.navigate("MenuAdventure");
                    }}
                >
                    <Text style={[styles.FontFormatButtom, styles.shadow]}>
                        Voltar ao menu
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

