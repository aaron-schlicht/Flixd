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
import { useState, useEffect } from "react";
import MovieList from "../../components/ui/MovieList";
import { Movie } from "../../types";
import { get } from "../../api/index";
import { Flex } from "../../components/ui/Layouts";
import { H1, H3 } from "../../components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
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

const useFindStreamingMovies = (isRefreshing: boolean, url: string) => {
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const [data, setData] = useState<
    { name: string; movies: Movie[]; imagePath?: string }[]
  >([]);

  const fetchStreamingMovies = async () => {
    if (selectedServices.length > 0) {
      let allData = [];
      for (const service of selectedServices) {
        const { data: serviceData } = await get<{ results: Movie[] }>(url, {
          params: {
            watch_region: "US",
            with_watch_providers: service.provider_id,
            "vote_count.gte": 300,
          },
        });
        if (serviceData && serviceData.results) {
          allData.push({
            name: service.provider_name,
            movies: serviceData.results,
            imagePath: service.logo_path,
          });
        }
      }
      setData(allData);
    }
  };

  useEffect(() => {
    fetchStreamingMovies();
  }, []);

  useEffect(() => {
    fetchStreamingMovies();
  }, [selectedServices, isRefreshing]);

  return data;
};

export default function GenreMovies() {
  const { name, url } = useLocalSearchParams();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const streamingMovies = useFindStreamingMovies(isRefreshing, url as string);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );

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
        setTrendingMovies(trendingResponse.data.results);

        const topRatedUrl = `${url}&sort_by=vote_average.desc&vote_count.gte=1000`;
        const topRatedResponse = await get<{ results: Movie[] }>(topRatedUrl);
        setTopRatedMovies(topRatedResponse.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovieLists();
  }, [url]);

  return (
    <View style={{ flex: 1, backgroundColor: "#11142A" }}>
      <SafeAreaView
        style={{
          backgroundColor: "#11142A",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
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
      </SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            style={{ position: "relative", top: 0, zIndex: 1 }}
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 200 }}
      >
        <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <MovieList
            name={"Trending"}
            data={trendingMovies}
            loading={trendingMovies.length === 0}
            isRefreshing={isRefreshing}
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
        {streamingMovies.map((service) => {
          return (
            <View key={`service-${service.name}`} style={{ marginBottom: 20 }}>
              <MovieList
                name={`${service.name}`}
                data={service.movies}
                imagePath={service.imagePath}
                loading={service.movies.length === 0}
                isRefreshing={isRefreshing}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
