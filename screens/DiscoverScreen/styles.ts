import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants";

const { height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  headerContainer: {
    marginTop: -5,
    paddingBottom: 10,
    height: 45,
    justifyContent: "space-between",
  },
  floatingButton: {
    position: "absolute",
    bottom: height * 0.14,
    zIndex: 20,
    shadowOpacity: 1,
    shadowRadius: 3.84,
    shadowColor: Colors.background,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  randomGradient: {
    padding: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  randomText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
