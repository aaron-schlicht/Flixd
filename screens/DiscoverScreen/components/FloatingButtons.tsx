import { TouchableOpacity, Text } from "react-native";
import { Colors } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles";

interface FloatingButtonsProps {
  showScrollTop: boolean;
  onScrollTop: () => void;
  showRandom: boolean;
  onRandom: () => void;
}

export const FloatingButtons = ({
  showScrollTop,
  onScrollTop,
  showRandom,
  onRandom,
}: FloatingButtonsProps) => {
  return (
    <>
      {showScrollTop && (
        <TouchableOpacity
          onPress={onScrollTop}
          style={[
            styles.floatingButton,
            {
              left: 20,
              padding: 10,
              borderRadius: 30,
              backgroundColor: Colors.secondary,
            },
          ]}
        >
          <Ionicons name="arrow-up" color={Colors.primary} size={35} />
        </TouchableOpacity>
      )}

      {showRandom && (
        <TouchableOpacity
          onPress={onRandom}
          style={[
            styles.floatingButton,
            { right: 20, flexDirection: "row", alignItems: "center" },
          ]}
        >
          <LinearGradient
            colors={["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.randomGradient}
          >
            <FontAwesome5 name="dice" size={20} color="white" />
            <Text
              style={styles.randomText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Random
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};
