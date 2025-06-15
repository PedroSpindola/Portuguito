import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB9BD",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
  },

  botaoTopo: {
    backgroundColor: "#F5505A",
    padding: 8,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    elevation: 8,
  },

  textoTopo: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Inder_400Regular",
    textAlign: "center",
  },

  personagemArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  personagem: {
    alignItems: "center",
    marginHorizontal: 20,
  },

  imagemPersonagem: {
    width: 100,
    height: 150,
    resizeMode: "contain",
  },

  nome: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Inder_400Regular",
    color: "#3E1E1E",
  },

  seta: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F5505A",
    paddingHorizontal: 10,
  },

  botaoIniciar: {
    backgroundColor: "#F5505A",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    elevation: 10,
    alignItems: "center",
    marginBottom: 100,
  },

  textoIniciar: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Inder_400Regular",
    textTransform: "uppercase",
  },
});
