import { StyleSheet, TouchableOpacity } from "react-native"

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxImageBoss: {
        height: 250,
        width: 200,
        flex: 1,
    },
    boxLastDay: {
        height: 250,
        width: 200,
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
        right: 170,
        top: 330,
        transform: [{rotateY: '180deg'}],
    },
    bottomPierRight: {
        left: 170,
        top: 200,
    },
    centerPierLeft: {
        right: 145,
        bottom: 125,
        transform: [{rotateY: '180deg'}],
    },
    centerPierRight: {
        left: 145,
        bottom: 250,
    },
    topPierLeft: {
        right: 130,
        bottom: 525,
        transform: [{rotateY: '180deg'}],
    },
    topPierRight: {
        left: 130,
        bottom: 655,
    },
});