import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import PosterButton from "../../Components/PosterButton";
import { RootStackParamList, Movie } from "../../types";

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
    const handleMoviePress = (id: number) => {
      navigation.push("Movie", { id: id });
    };
    const ref = useRef<FlatList>(null);

    useEffect(() => {
      if (isRefreshing && ref.current && Boolean(data.length)) {
        ref.current.scrollToIndex({ index: 0, animated: true });
      }
    }, [isRefreshing]);
    return (
      <View>
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
        <FlatList
          data={data}
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, height: 160 }}
          initialNumToRender={5}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => {
            return (
              <PosterButton
                onPress={() => handleMoviePress(item.id)}
                posterPath={SMALL_POSTER_BASE_PATH + item.poster_path}
              />
            );
          }}
        />
      </View>
    );
  }
);

export default MovieList;
