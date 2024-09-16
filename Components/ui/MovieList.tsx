import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import PosterButton from "./PosterButton";
import { RootStackParamList, Movie } from "../../types";
import { FlashList } from "@shopify/flash-list";

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w342/";

const MovieList = React.memo(
  ({
    name,
    data,
    isRefreshing,
  }: {
    name: string;
    data: Movie[];
    isRefreshing: boolean;
  }) => {
    const navigation = useNavigation<recsScreenProp>();
    const handleMoviePress = (movie: Movie) => {
      navigation.push("Movie", { movie });
    };
    const ref = useRef<FlashList<Movie>>(null);

    useEffect(() => {
      if (isRefreshing && ref.current && Boolean(data.length)) {
        ref.current.scrollToIndex({ index: 0, animated: true });
      }
    }, [isRefreshing]);
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "white",
            paddingLeft: 15,
            padding: 10,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {name}
        </Text>
        <View
          style={{
            minHeight: 170,
            height: 170,
            flexDirection: "row",
          }}
        >
          <FlashList
            data={data}
            ref={ref}
            horizontal
            estimatedItemSize={170}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => {
              return (
                <PosterButton
                  onPress={() => handleMoviePress(item)}
                  posterPath={SMALL_POSTER_BASE_PATH + item.poster_path}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
);

export default MovieList;
