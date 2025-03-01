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
        height: '25%',
        width: '90%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
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
        padding: 30,
        flexDirection: 'row',
        marginTop: 30,
    },
    modalIcon: {
        verticalAlign: 'middle',
    },
    modalDescription: {
        flex: 1,
        color: '#EFEFFE',
        flexWrap: 'wrap',
        fontFamily: 'Inder_400Regular',
        fontSize: 16,
        marginLeft: 20,
        verticalAlign: 'middle',
    },
    backgroundUserModal: {
        width: 120,
        height: 120,
        borderRadius: 70,
        marginBottom: 10,
        borderColor: '#FFFFFF',
        borderWidth: 4,
        overflow: 'hidden',
        backgroundColor: '#00000000',
    },
    imageModal: {
        width: null,
        height: 'auto',
        flex: 1,
        resizeMode: "cover"
    },
})