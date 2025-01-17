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
    width: 320,
    height: 320,
    borderRadius: 125,
    borderWidth: 8,
    borderColor: "#ffffff",
    borderTopColor: "transparent",
  },
  overlayCircle: {
      position: "absolute",
      width: 320, 
      height: 320,
      borderRadius: 125,
      backgroundColor: "#ffffff44",
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 20,
  },
});
