import { StyleSheet, Dimensions } from "react-native";

// Pega largura e altura da tela do dispositivo
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankingIcon: {
        position: "absolute",
        width: width * 0.5,
        height: width * 0.44,
        bottom: height * 0.85,
        left: width * 0.62,
    },
    rankingIconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    boxImageBoss: {
        height: height * 0.30,
        width: width * 0.35,
        top: height * 0.02,
        flex: 1,
    },
    boxLastDay: {
        position: 'absolute',
        bottom: height * 0.615,
        right: 0.005,
        height: height * 0.3,
        width: width * 0.35,
        alignItems: 'center',
    },
    lastDayClosed: {
        opacity: 0.3,
    },
    boxImageImage: {
        height: height * 0.09,
        width: width * 0.25,
        resizeMode: 'contain',
    },
    boxImageImageOpened: {
        marginTop: height * 0.04,
        height: height * 0.12,
        width: width * 0.25,
        resizeMode: 'contain',
    },
    boxImageButton: {
        height: width * 0.35,
        width: width * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    faseIcon: {
        position: 'relative',
        left: width * 0.015,
        bottom: height * 0.09,
    },
    faseIconImage: {
        height: height * 0.065,
        width: height * 0.065,
        position: 'absolute',
    },
    centerFaseIcon: {
        marginTop: height * 0.01,
        marginRight: width * 0.2,
    },
    rightFaseIcon: {
        left: width * -0.04,
        top: height * -0.03,
    },
    leftFaseIcon: {
        left: width * -0.09,
        top: height * -0.033,
    },
    activeIcon: {
        left: width * -0.06,
        top: height * -0.056,
    },
    faseIconText: {
        height: height * 0.06,
        width: width * 0.12,
        left: width * 0.005,
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: "middle",
        color: '#604437',
        fontWeight:'bold',
        fontSize: width * 0.04,
        fontFamily: 'Inder_400Regular',
        left: width*0.005,
    },
    divTela: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: width * 0.15,
    },
    rotatedFase: {
        transform: [{ rotateY: '180deg' }],
    },

    // Barcos/Píers posicionados proporcionalmente
    bottomPierLeft: {
        position: 'absolute',
        right: width * 0.38,
        bottom: height * 0.33,
    },
    bottomPierRight: {
        position: 'absolute',
        left: width * 0.40,
        bottom: height * 0.32,
    },
    centerPierLeft: {
        position: 'absolute',
        right: width * 0.32,
        top: height * 0.45,
    },
    centerPierRight: {
        position: 'absolute',
        left: width * 0.32,
        top: height * 0.45,
    },
    topPierLeft: {
        position: 'absolute',
        right: width * 0.25,
        bottom: height * 0.55,
    },
    topPierRight: {
        position: 'absolute',
        left: width * 0.25,
        bottom: height * 0.55,
    },
});
