import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Movie } from "../../types";
import { router } from "expo-router";
import { Image } from "expo-image";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const PosterImage = ({ uri, style }: { uri: string; style: any }) => {
  const opacity = useSharedValue(0);

  return (
    <View style={[style, { backgroundColor: "#2A2E43", overflow: "hidden" }]}>
      <AnimatedImage
        source={{ uri }}
        style={style}
        onLoad={() => {
          opacity.value = withTiming(1, { duration: 150 });
        }}
        cachePolicy="memory-disk"
      />
    </View>
  );
};

const PosterButton = ({
  movie,
  posterPath,
  dimensions,
}: {
  movie: Movie;
  posterPath: string;
  dimensions: { width: number; height: number };
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/modal/movie?id=${movie.id}`)}
      activeOpacity={0.7}
    >
      <PosterImage
        uri={posterPath}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          borderRadius: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default React.memo(PosterButton);
