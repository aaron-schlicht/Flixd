import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Colors } from "../../constants";

const ANGLE = 7;
const TIME = 100;
const EASING = Easing.elastic(1.5);

const DiceButton = ({ getRandomMovies }: { getRandomMovies: () => void }) => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = `${rotation.value}deg`;
    return {
      transform: [{ rotateZ: rotateZ }],
    };
  });

  const handlePress = () => {
    rotation.value = withSequence(
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        5,
        true
      ),
      withTiming(0, { duration: TIME / 2, easing: EASING })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    getRandomMovies();
  };

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          bottom: Dimensions.get("window").height * 0.16,
          width: Dimensions.get("window").width,
        },
      ]}
    >
      <View
        style={{
          shadowColor: "black",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: 30,
          backgroundColor: "black",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: "center",
            gap: 10,
            borderRadius: 30,
            justifyContent: "center",
            backgroundColor: "white",
          }}
          onPress={handlePress}
        >
          <FontAwesome5 name="dice" color={Colors.background} size={25} />
          <Text
            style={{
              color: Colors.background,
              fontWeight: "400",
              fontSize: 22,
            }}
          >
            Roll the dice
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default DiceButton;
