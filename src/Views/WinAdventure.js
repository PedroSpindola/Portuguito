import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WinAdventure({ route, navigation }) {
    const { characterInfo, nextFase } = route.params;

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate("AdventureFases", {
                characterInfo,
                currentFase: nextFase,
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Você avançou para a fase {nextFase}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'
    },
    text: {
        fontSize: 24, color: '#fff', fontWeight: 'bold'
    }
});
