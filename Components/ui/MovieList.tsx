import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import PosterButton from "./PosterButton";
import { Movie } from "../../types";
import { FlashList } from "@shopify/flash-list";
import { H2 } from "./Typography";
import { Flex } from "./Layouts";
import { Image } from "expo-image";
const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w342/";

const MovieList = React.memo(
  ({
    name,
    data,
    isRefreshing,
    imagePath,
  }: {
    name: string;
    data: Movie[];
    isRefreshing: boolean;
    imagePath?: string;
  }) => {
    const ref = useRef<FlashList<Movie>>(null);

    useEffect(() => {
      if (isRefreshing && ref.current && Boolean(data.length)) {
        ref.current.scrollToIndex({ index: 0, animated: true });
      }
    }, [isRefreshing]);
    return (
      <View style={{ flex: 1 }}>
        <Flex
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 15,
          }}
        >
          {imagePath && (
            <Image
              source={{ uri: SMALL_POSTER_BASE_PATH + imagePath }}
              style={{
                width: 30,
                height: 30,
                marginLeft: 15,
                marginRight: 10,
                borderRadius: 5,
              }}
            />
          )}
          <H2
            style={{
              paddingLeft: imagePath ? 0 : 15,
              fontSize: imagePath ? 20 : 24,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {name}
          </H2>
        </Flex>
        <Flex
          style={{
            minHeight: 170,
            height: 170,
          }}
        >
          <FlashList
            data={data}
            ref={ref}
            horizontal
            contentContainerStyle={{ paddingLeft: 5 }}
            estimatedItemSize={170}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => {
              return (
                <PosterButton
                  movie={item}
                  posterPath={SMALL_POSTER_BASE_PATH + item.poster_path}
                />
              );
            }}
          />
        </Flex>
      </View>
    );
  }
);

export default MovieList;
