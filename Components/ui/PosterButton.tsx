import { TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Movie } from "../../types";
import { router } from "expo-router";
import { Image } from "expo-image";

const PosterButton = memo(
  ({
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
      >
        <Image
          source={{ uri: posterPath }}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            borderRadius: 10,
          }}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          recyclingKey={`${movie.id}`}
        />
      </TouchableOpacity>
    );
  }
);

PosterButton.displayName = "PosterButton";

export default PosterButton;
