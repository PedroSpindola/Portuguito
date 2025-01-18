import { StyleSheet, TouchableOpacity } from "react-native"

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxImageBoss: {
        top: 15,
        height: 200,
        width: 150,
        flex: 1,
    },
    boxLastDay: {
        height: 200,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxImageImage: {
        height: 100,
        width: 115,
        flex: 1,
    },
    boxImageButton: {
        height: 130,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxImageButtonText: {
        color: '#fff',
        fontSize: 16,
        position: 'absolute',
        top: 94,
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
    bottomPierLeft: {
        right: 145,
        top: 350,
        transform: [{rotateY: '180deg'}],
    },
    bottomPierRight: {
        left: 145,
        top: 220,
    },
    centerPierLeft: {
        right: 130,
        bottom: 100,
        transform: [{rotateY: '180deg'}],
    },
    centerPierRight: {
        left: 130,
        bottom: 230,
    },
    topPierLeft: {
        right: 120,
        bottom: 500,
        transform: [{rotateY: '180deg'}],
    },
    topPierRight: {
        left: 120,
        bottom: 630,
    },
});