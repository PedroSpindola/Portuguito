import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxGeral: {
        backgroundColor: '#FF8D94',
        height: 200,
        width: '80%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalHeader: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        width: '100%',
        height: 30,
    },
    modalTitle: {
        color: '#EFEFFE',
        fontFamily: 'Inder_400Regular',
        fontSize: 20,
        marginTop: 7
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    iconeDelete: {
        color: "#e73434",
        fontSize: 22,
        borderColor: "#6a6868",
        borderWidth: 1.2,
        textAlign: "center",
        backgroundColor: "#FFB9BD",
        padding: 5,
    },
    modalBody: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
    },
    modalIcon: {
        verticalAlign: 'middle',
        height: 110,
        width: 70,
    },
    modalDescription: {
        color: '#EFEFFE',
        fontFamily: 'Inder_400Regular',
        fontSize: 18,
        marginLeft: 20,
        verticalAlign: 'middle',
    },
})