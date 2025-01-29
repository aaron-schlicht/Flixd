import { View } from "react-native";
import { useEffect, useState } from "react";
import { Movie, RootStackParamList, Service } from "../../types";
import { fetchMovieServices, get } from "../../api";
import { FlashList } from "@shopify/flash-list";
import { Dimensions } from "react-native";
import SkeletonList from "./SkeletonList";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ResultItem from "./ResultItem";
import { router } from "expo-router";
const { width, height } = Dimensions.get("screen");
const BASE_URL = "/search/movie";

const SearchResults = ({ query }: { query: string }) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [services, setServices] = useState<Service[][]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMoviesAndServices = async (query: string) => {
    setLoading(true);
    const { data } = await get<{ results: Movie[] }>(
      BASE_URL + `?query=${query}`
    );
    const movies = data.results.sort((a, b) => b.vote_count - a.vote_count);
    setResults(movies);
    const servicePromises = movies.map(({ id }) => fetchMovieServices(id));
    const serviceResults = await Promise.all(servicePromises);
    setServices(serviceResults);
    setLoading(false);
  };
  useEffect(() => {
    fetchMoviesAndServices(query);
  }, [query]);

  const renderResult = ({ item, index }: { item: Movie; index: number }) => (
    <ResultItem
      item={item}
      service={services?.at(index)?.at(0)}
      handlePosterPress={() => router.push(`/modal/movie?id=${item.id}`)}
    />
  );

  return (
    <View>
      <View
        style={{
          minHeight: 2,
          height: height,
          width: width,
          paddingBottom: 200,
        }}
      >
        {loading ? (
          <SkeletonList />
        ) : (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={{ height: height, width: width }}
          >
            <FlashList
              data={results}
              estimatedItemSize={100}
              showsVerticalScrollIndicator={false}
              renderItem={renderResult}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default SearchResults;
