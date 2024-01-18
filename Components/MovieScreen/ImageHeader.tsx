import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const HEADER_EXPANDED_HEIGHT = Dimensions.get("window").height * 0.5;
const HEADER_COLLAPSED_HEIGHT = 100;

const ImageHeader = ({
  sv,
  posterPath,
  title,
}: {
  sv: SharedValue<number>;
  posterPath: string;
  title: string;
}) => {
  const navigation = useNavigation();

  const imageOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sv.value,
      [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
    };
  });

  const heightStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      sv.value,
      [-120, -30],
      [1.3, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: scale }],
    };
  });

  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      sv.value,
      [210, 215],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
    };
  });

  return (
    <View>
      <Animated.View
        style={[styles.headerContainer, imageOpacityStyle, heightStyle]}
      >
        <AnimatedImage
          source={{
            uri: posterPath,
          }}
          style={styles.headerImage}
          transition={200}
          contentFit="cover"
        />
      </Animated.View>
      <AnimatedLinearGradient
        style={[styles.gradient, heightStyle]}
        colors={["transparent", "rgba(21, 24, 45, 0.6)", "rgba(21, 24, 45, 1)"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    height: HEADER_EXPANDED_HEIGHT,
  },
  gradient: {
    zIndex: 1,
    width: Dimensions.get("window").width,
    position: "absolute",
    height: HEADER_EXPANDED_HEIGHT,
  },
  headerImage: {
    width: "100%",
    position: "absolute",
    height: "100%",
    top: 0,
    alignSelf: "center",
  },
  movieTitleContainer: {
    position: "absolute",
    zIndex: 200,
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_COLLAPSED_HEIGHT,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "#15182D",
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
});

export default ImageHeader;
