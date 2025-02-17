import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const BackButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{
      padding: 10,
      borderRadius: 360,
      width: 50,
      height: 50,
      position: "absolute",
      top: 5,
      left: 15,
      zIndex: 101,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(21, 24, 45, 0.3)",
    }}
    onPress={onPress}
  >
    <Ionicons name="chevron-back" color="white" size={30} />
  </TouchableOpacity>
);
