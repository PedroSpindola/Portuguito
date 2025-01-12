import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, getFirestore } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import Styles from "../Styles.js/StylesMenuChallenge";

export default function MenuChallenge() {
    const db = getFirestore(FIREBASE_APP);
    const auth = FIREBASE_AUTH;
    
    const navigation = useNavigation();
    const aluno = auth.currentUser.uid;
    const referenceAluno = doc(db, 'users', aluno);

    const FreeFased = ({ txt, info }) => {
        return (
          <TouchableOpacity
            style={Styles.boxImageButton}
            onPress={() =>
              navigation.navigate("QuestoesTrilha", {
                screen: "QuestoesTrilha",
                params: { info: info, userId: userId , subTemaDoc: subTemaDoc},
              })
            }
          >
            <Image
              source={require("../Imagens/BarcoClaro.png")}
              style={Styles.boxImageImage}
            />
            <Text style={Styles.boxImageButtonText}>{txt}</Text>
          </TouchableOpacity>
        );
      };

    const ClosedFased = ({ txt }) => {
        return (
            <TouchableOpacity 
                style={Styles.boxImageButton} 
                activeOpacity={1}
            >
                <Image
                    source={require("../Imagens/BarcoEscuro.png")}
                    style={Styles.boxImageImage}
                />
                <Text style={Styles.boxImageButtonText}>{txt}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={require("../Imagens/menuPier.png")}
        >
            <View style={Styles.divTela}>
                <FreeFased />
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}
