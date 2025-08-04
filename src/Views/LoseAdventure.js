import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoseAdventure({ route, navigation }) {
    const { fase } = route.params;

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate("MenuAdventure");
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Que pena, você chegou até a fase {fase}!</Text>
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
