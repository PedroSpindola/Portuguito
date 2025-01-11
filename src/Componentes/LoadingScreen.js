import React, { useEffect, useRef } from "react";
import { View, Image, Text, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../Styles.js/StylesLoadingScreen";

export default function LoadingScreen() {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotateInterpolation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const opacityInterpolation = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={styles.gradient}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ rotate: rotateInterpolation }],
              opacity: opacityInterpolation,
            },
          ]}
        />
        <View style={styles.overlayCircle} />
        <Image style={styles.image} source={require('../Imagens/icons/portuguitaBase.jpeg')} />
      </View>
    </LinearGradient>
  );
}
