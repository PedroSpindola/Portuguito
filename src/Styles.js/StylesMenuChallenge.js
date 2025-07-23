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
        bottom:  height >= 700 ? height * 0.87 : height * 0.77,
        left: width * 0.62,
    },
    rankingIconImage: {
        marginTop: "20",
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    boxImageBoss: {
        height: height * 0.30,
        width: width * 0.35,
        top: height * 0.02,
        flex: 1,
        top: height>= 700 ? 0 : width *0.06,
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
        marginLeft: width * 0.22,
        bottom: height>= 700 ?height*0.11: height*0.07,
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
        height: height * 0.056,
        width: width * 0.125,
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: "middle",
        fontWeight: "bold",
        color: '#604437',
        fontWeight:'bold',
        fontSize: width * 0.04,
        fontFamily: 'Inder_400Regular',
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
        right: width>= 360? width * 0.41: width *0.35,
        top: height >= 700 ? height * 0.58 : height * 0.53,
    },
    bottomPierRight: {
        position: 'absolute',
        left: width>= 360? width * 0.41: width *0.35,
        top: height >= 700 ? height * 0.58 : height * 0.53,
    },
    centerPierLeft: {
        position: 'absolute',
        right: width>= 360 ?width * 0.34: width * 0.3,
        bottom: height >= 700 ? height * 0.42 : height * 0.37,
    },
    centerPierRight: {
        position: 'absolute',
        left: width>= 360 ?width * 0.35: width * 0.3,
        bottom: height >= 700 ? height * 0.42 : height * 0.37,
    },
    topPierLeft: {
        position: 'absolute',
        right: width>= 360 ? width * 0.27: width * 0.25,
        bottom: height >= 700 ? height * 0.52 : height * 0.47,
    },
    topPierRight: {
        position: 'absolute',
        left: width>= 360 ? width * 0.27: width * 0.25,
        bottom: height >= 700 ? height * 0.52 : height * 0.47,

    },
});
