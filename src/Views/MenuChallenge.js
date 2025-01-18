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

  const currentDay = (new Date()).getDay();
  const openedDays = [];

  for (let i = 0; i < 6; i++) {
    if (i === currentDay) {
      openedDays.push(true);
    } else {
      openedDays.push(false);
    }
  }

  const LastDay = ({ info }) => {
    return (
      <TouchableOpacity
        style={Styles.boxLastDay}
        onPress={() =>
          navigation.navigate("QuestoesTrilha", {
            screen: "QuestoesTrilha",
            params: { info: info, subTemaDoc: subTemaDoc },
          })
        }
      >
        <Image
          source={require("../Imagens/BarcoFinal.png")}
          style={Styles.boxImageBoss}
        />
        <Text style={Styles.boxImageButtonText}>{ }</Text>
      </TouchableOpacity>
    );
  };

  const OpenedDay = ({ info }) => {
    return (
      <TouchableOpacity
        style={Styles.boxImageButton}
        activeOpacity={1}
      >
        <Image
          source={require("../Imagens/BarcoClaro.png")}
          style={Styles.boxImageImage}
        />
        <Text style={Styles.boxImageButtonText}>{ }</Text>
      </TouchableOpacity>
    );
  };

  const ClosedDay = () => {
    return (
      <TouchableOpacity
        style={Styles.boxImageButton}
        activeOpacity={1}
      >
        <Image
          source={require("../Imagens/BarcoEscuro.png")}
          style={Styles.boxImageImage}
        />
        <Text style={Styles.boxImageButtonText}>{ }</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/pier.png")}
      resizeMode="cover"
    >
      <View style={Styles.divTela}>
        <LastDay />
        {openedDays.map((isDayOpened, index) => {
          const getPositionFase = () => {
            switch (index) {
              case 0:
                return Styles.bottomPierLeft;
              case 1:
                return Styles.bottomPierRight;
              case 2:
                return Styles.centerPierLeft;
              case 3:
                return Styles.centerPierRight;
              case 4:
                return Styles.topPierLeft;
              default:
                return Styles.topPierRight;
            }
          }

          let style = getPositionFase();

          return (
            <View style={style}>
              {
                isDayOpened ? (
                  <OpenedDay />
                ) : (
                  <ClosedDay />
                )
              }
            </View>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
