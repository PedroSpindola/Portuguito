import { StyleSheet } from "react-native";

export default StyleSheet.create({
    scrollContent: {
        flexGrow: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(210, 208, 250, 1)", 
        paddingVertical: 20, 
      },
      container: {
        flex: 1,
        backgroundColor: "rgba(210, 208, 250, 1)", 
        alignItems: "center",
        justifyContent: "center", 
      },
      content: {
        width: 378,
        backgroundColor: "rgba(210, 208, 250, 1)", 
        paddingVertical: 20,
        borderRadius: 10,
      },
      card: {
        width: 329,
        alignSelf: "center",
        marginBottom: 20,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "rgba(210, 208, 250, 1)", 
      },
      header: {
        backgroundColor: "#f54f59",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
      },
      headerText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Inder-Regular",
      },
      errorsHeader: {
        marginLeft: 40, 
      },
      acertosHeader: {
        marginLeft: 40, 
      },
      body: {
        backgroundColor: "#ffb8bc", 
        padding: 10,
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
      },
      bodyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      },
      bodyText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Inder-Regular",
      },
      errorsBody: {
        marginLeft: 40, 
      },
      acertosBody: {
        marginLeft: 40, 
        marginRight: 15,
      },
      button: {
        backgroundColor: "#f54f59",
        borderRadius: 10, 
        padding: 6,
        marginTop: 5,
        alignSelf: "flex-start",
      },
      buttonText: {
        color: "#FFF",
        fontSize: 14,
        fontFamily: "Inder-Regular",
      },  
      voltar:{
        height: 50,
        width: 50,
        zIndex: 1,
        marginBottom: 10,
      },
    
      iconStyle:{
          color: "#FFFFFF",
          fontSize: 24,
      },
      
      paginationButton:{
          width: 42,
          height: 42,
          borderRadius: 25,
          backgroundColor: "#ff8c90",
          justifyContent: "center",
          alignItems: "center",
      },
});
