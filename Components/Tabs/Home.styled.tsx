import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flexView: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentBox: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
});
