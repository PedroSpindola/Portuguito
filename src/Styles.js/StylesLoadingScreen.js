import { StyleSheet } from "react-native";
import DropShadow from "react-native-drop-shadow";

export default StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: "#ffffff",
    borderTopColor: "transparent",
  },
  overlayCircle: {
      position: "absolute",
      width: 240, 
      height: 240,
      borderRadius: 80,
      backgroundColor: "#ffffff44",
  },
  image: {
    width: 250,
    height: 250,
    marginRight: 20,
  },
});
