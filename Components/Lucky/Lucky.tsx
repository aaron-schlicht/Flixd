import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Lucky = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#15182D",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome5 name="dice" color="#ccc" size={40} />
    </View>
  );
};

export default Lucky;
