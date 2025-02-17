import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import MovieList from "../../components/ui/MovieList";
import { Movie, Service } from "../../types";
import { fetchMovieServices, get } from "../../api/index";
import { Flex } from "../../components/ui/Layouts";
import { H1, H3 } from "../../components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useFindStreamingMovies from "../../hooks/useFindStreamingMovies";
import Carousel from "../../components/ui/Carousel";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { AppHeader } from "../../components/ui/AppHeader";
const { width } = Dimensions.get("screen");

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{
      padding: 5,
      borderRadius: 360,
      width: 40,
      height: 40,
      zIndex: 200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.secondary,
    }}
    onPress={onPress}
  >
    <Ionicons name="chevron-back" color="white" size={25} />
  </TouchableOpacity>
);

export default function GenreMovies() {
  const { name, url } = useLocalSearchParams();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingMovieServices, setTrendingMovieServices] = useState<
    Service[][]
  >([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: streamingMovieData, loadMore } = useFindStreamingMovies(
    isRefreshing,
    url as string
  );
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    if (isRefreshing) {
      var timeout = setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isRefreshing]);

  useEffect(() => {
    const fetchMovieLists = async () => {
      try {
        const trendingResponse = await get<{ results: Movie[] }>(
          `${url}&sort_by=popularity.desc&vote_count.gte=1000`
        );
        const trendingMovies = trendingResponse.data.results;
        const servicePromises = trendingMovies.map(({ id }) =>
          fetchMovieServices(id)
        );
        setTrendingMovies(trendingResponse.data.results);
        const services = await Promise.all(servicePromises);
        setTrendingMovieServices(services);

        const topRatedUrl = `${url}&sort_by=vote_average.desc&vote_count.gte=1000`;
        const topRatedResponse = await get<{ results: Movie[] }>(topRatedUrl);
        setTopRatedMovies(topRatedResponse.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovieLists();
  }, [url]);

  const loadMoreMovies = useCallback(
    (serviceName: string) => {
      loadMore(serviceName);
    },
    [loadMore]
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.header }}>
      <AppHeader>
        <Flex style={{ marginTop: -5, paddingBottom: 10 }}>
          <Flex style={{ width: width * 0.25, paddingHorizontal: 15 }}>
            <BackButton onPress={() => router.back()} />
          </Flex>
          <Flex style={{ width: width * 0.5, justifyContent: "center" }}>
            <H1
              style={{ color: "white", fontSize: 24 }}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {name}
            </H1>
          </Flex>
        </Flex>
      </AppHeader>
      <Animated.ScrollView
        refreshControl={
          <RefreshControl
            style={{ position: "relative", top: 0, zIndex: 1 }}
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Carousel
            title="Trending"
            movies={trendingMovies.slice(0, 10)}
            isRefreshing={isRefreshing}
            loading={trendingMovies.length === 0}
            scrollY={scrollY}
            services={trendingMovieServices.slice(0, 10)}
          />
          <MovieList
            name={"Top Rated"}
            data={topRatedMovies}
            loading={topRatedMovies.length === 0}
            isRefreshing={isRefreshing}
          />
        </View>
        <H3 style={{ marginLeft: 15, marginTop: 20, marginBottom: 10 }}>
          Available on your services
        </H3>
        {streamingMovieData
          .filter((service) => service.movies.length !== 0)
          .map((service) => {
            return (
              <View
                key={`service-${service.name}`}
                style={{ marginBottom: 20 }}
              >
                <MovieList
                  name={`${service.name}`}
                  data={service.movies}
                  imagePath={service.imagePath}
                  isRefreshing={isRefreshing}
                  onEndReached={() => loadMoreMovies(service.name)}
                />
              </View>
            );
          })}
      </Animated.ScrollView>
    </View>
  );
}
