import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#d6c4f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  voltar: {
    height: 50,
    width: 50,
    zIndex: 1,
    marginBottom: 10,
  },
  paginationButton: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: "#ff8c90",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  pickerItem: {
    fontSize: 13,
  },
});
