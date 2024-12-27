import { StyleSheet } from "react-native";

export default StyleSheet.create({
    resultadoAlunos: {
        flex: 1,
        backgroundColor: "#d6c4f7",
        padding: 20,
      },
      scrollContainer: {
        alignItems: "center",
        paddingBottom: 20,
      },
      card: {
        backgroundColor: "#f54f59",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: "100%",
        maxWidth: 400,
      },
      cardContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      text: {
        color: "#ffffff",
        fontFamily: "Inder-Regular",
        fontSize: 14,
        flex: 1,
      },
      button: {
        backgroundColor: "#ffb8bc",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "#ffffff",
        fontFamily: "Inter-Regular",
        fontSize: 14,
        fontWeight: "400",
      },
      infoContainer: {
        backgroundColor: "#ffb8bc",
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        width: "100%", 
      },
      infoText: {
        color: "#ffffff", 
        fontFamily: "Inder-Regular",
        fontSize: 14, 
        marginBottom: 10,
      },
      verQuestaoButton: {
        backgroundColor: "#f54f59",
        borderRadius: 5,
        marginTop: 15, 
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: "stretch",
      },
      verQuestaoText: {
        color: "#ffffff", 
        fontFamily: "Inder-Regular",
        fontSize: 14, 
        textAlign: "center",
      },
});
