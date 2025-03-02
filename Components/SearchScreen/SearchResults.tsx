import { View } from "react-native";
import { useEffect, useState } from "react";
import { Movie, RootStackParamList, Service } from "../../types";
import { fetchMovieServices, get, batchFetch } from "../../api";
import { FlashList } from "@shopify/flash-list";
import { Dimensions } from "react-native";
import SkeletonList from "./SkeletonList";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ResultItem from "./ResultItem";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const { width, height } = Dimensions.get("screen");
const BASE_URL = "/search/movie";

const SearchResults = ({ query }: { query: string }) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [services, setServices] = useState<Service[][]>([]);
  const [loading, setLoading] = useState(false);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );

  const fetchMoviesAndServices = async (query: string) => {
    setLoading(true);
    try {
      const { data } = await get<{ results: Movie[] }>(
        BASE_URL + `?query=${query}`
      );
      const movies = data.results.sort((a, b) => b.vote_count - a.vote_count);
      setResults(movies);

      const movieIds = movies.map((movie) => movie.id);
      const serviceResults = await batchFetch(movieIds, fetchMovieServices);
      setServices(serviceResults);
    } catch (error) {
      console.error("Error fetching movies and services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesAndServices(query);
  }, [query]);

  const renderResult = ({ item, index }: { item: Movie; index: number }) => {
    const availableServices = services[index];
    const personalizedService =
      availableServices?.find((service) =>
        selectedServices.some(
          (selectedService: Service) =>
            selectedService.provider_id === service.provider_id
        )
      ) || undefined;
    return (
      <ResultItem
        item={item}
        service={personalizedService}
        handlePosterPress={() => router.push(`/modal/movie?id=${item.id}`)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          minHeight: 2,
          flex: 1,
          height: height,
          width: width,
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
              contentContainerStyle={{ paddingBottom: 300 }}
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
