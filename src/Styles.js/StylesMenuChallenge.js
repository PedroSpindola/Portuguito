import { StyleSheet, TouchableOpacity } from "react-native"

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankingIcon: {
        position: "absolute",
        width: 125,
        height: 125,
        bottom: 680,
        left: 264,
    },
    rankingIconImage: {
        width: 125,
        height: 125,
    },
    boxImageBoss: {
        height: 200,
        width: 150,
        flex: 1,
    },
    boxLastDay: {
        top: 8,
        height: 200,
        width: 150,
        alignItems: 'center',
    },
    lastDayClosed: {
        opacity: 0.3,
    },
    boxImageImage: {
        height: 100,
        width: 115,
        flex: 1,
    },
    boxImageButton: {
        height: 135,
        width: 135,
        alignItems: 'center',
        justifyContent: 'center',
    },
    faseIcon: {
        position: 'relative',
        bottom: 62
    },
    faseIconImage: {
        height: 50,
        width: 50,
        position: 'absolute',
    },
    centerFaseIcon: {
        marginTop: 15,
        marginRight: 50,
    },
    rightFaseIcon: {
        left: 6,
    },
    leftFaseIcon: {
        right: 55,
    },
    activeIcon: {
        marginTop: 10,
    },
    faseIconText: {
        height: 45,
        width: 50,
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: "middle",
        color: '#7d471c',
        fontSize: 12,
        fontFamily: 'Inder_400Regular',
    },
    divTela: {
        height: 'auto',
        width: 'auto',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,

    },
    rotatedFase: {
        transform: [{ rotateY: '180deg' }],
    },
    bottomPierLeft: {
        right: 145,
        top: 350,
    },
    bottomPierRight: {
        left: 145,
        top: 220,
    },
    centerPierLeft: {
        right: 140,
        bottom: 120,
    },
    centerPierRight: {
        left: 140,
        bottom: 258,
    },
    topPierLeft: {
        right: 140,
        bottom: 530,
    },
    topPierRight: {
        left: 140,
        bottom: 665,
    },
});