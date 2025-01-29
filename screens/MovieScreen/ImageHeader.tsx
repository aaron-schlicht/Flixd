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
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const HEADER_EXPANDED_HEIGHT = Dimensions.get("window").height * 0.35;
const HEADER_COLLAPSED_HEIGHT = 100;

const ImageHeader = ({
  sv,
  posterPath,
}: {
  sv: SharedValue<number>;
  posterPath: string;
}) => {
  const imageOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sv.value,
      [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      [1, 0],
      Extrapolation.CLAMP
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
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale: scale }],
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
        colors={[
          "transparent",
          "rgba(21, 24, 45, 0.1)",
          "rgba(21, 24, 45, 0.8)",
          "rgba(21, 24, 45, 1)",
        ]}
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
});

export default ImageHeader;
