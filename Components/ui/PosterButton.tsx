import { Pressable, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { FC } from "react";
import { Movie } from "../../types";
import { Link, router } from "expo-router";

export interface PosterButtonProps {
  dimensions?: { width: number; height: number };
  movie: Movie;
  onPress?: () => void;
  posterPath: string;
}

const PosterButton: FC<PosterButtonProps> = ({
  dimensions = { width: 100, height: 150 },
  onPress,
  movie,
  posterPath,
}) => (
  <TouchableOpacity onPress={() => router.push(`/modal/movie?id=${movie.id}`)}>
    <View
      style={{
        shadowColor: "black",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        backgroundColor: "black",
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <Image
        style={{
          width: dimensions.width,
          height: dimensions.height,
          borderRadius: 10,
        }}
        contentFit="cover"
        transition={500}
        source={{
          uri: posterPath,
        }}
      />
    </View>
  </TouchableOpacity>
);

export default PosterButton;
