import {
  View,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants";
import { useCallback, useEffect, useState } from "react";
import useDiscoverMovies from "../../hooks/useDiscoverMovies";
import useGetTrendingMovies from "../../hooks/useGetTrendingMovies";
import Carousel from "../../components/ui/Carousel";
import useFindStreamingMovies from "../../hooks/useFindStreamingMovies";
import { Background, Flex } from "../../components/ui/Layouts";
import { H1, H3 } from "../../components/ui/Typography";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { MainProviders, imageBasePath } from "../../constants";
import MovieList from "../../components/ui/MovieList";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { AppHeader } from "../../components/ui/AppHeader";

const TopServiceLogos = () => {
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const firstThreeProviders =
    selectedServices.length > 0
      ? selectedServices.slice(0, 3)
      : MainProviders.slice(0, 3);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.secondary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
      }}
    >
      {firstThreeProviders.map((provider, index) => (
        <Image
          key={provider.provider_id}
          source={{ uri: imageBasePath + provider.logo_path }}
          style={{
            width: 25,
            height: 25,
            zIndex: -index,
            marginLeft: index === 0 ? 0 : -12,
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
};

const HomeScreen = () => {
  return (
    <Background>
      <HomeView />
    </Background>
  );
};

const STREAMING_BASE_URL = "/discover/movie";
const HomeView = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const data = useDiscoverMovies(isRefreshing);
  const { data: streamingMovieData, loadMore } = useFindStreamingMovies(
    isRefreshing,
    STREAMING_BASE_URL
  );
  const { trendingMovies, trendingMovieServices, loading } =
    useGetTrendingMovies();
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

  const loadMoreMovies = useCallback(
    (serviceName: string) => {
      loadMore(serviceName);
    },
    [loadMore]
  );

  return (
    <View>
      <AppHeader>
        <Flex
          style={{ justifyContent: "center", marginTop: -5, paddingBottom: 10 }}
        >
          <Image
            source={require("../../assets/AppLogo.png")}
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              marginRight: 8,
            }}
          />
          <H1 style={{ color: Colors.primary }}>Flixd</H1>
          <Link
            href="modal/services"
            asChild
            style={{ position: "absolute", top: 0, right: 15 }}
          >
            <TouchableOpacity>
              <TopServiceLogos />
            </TouchableOpacity>
          </Link>
        </Flex>
      </AppHeader>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 200, paddingTop: 0 }}
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl
            style={{ position: "relative", top: 0, zIndex: 1 }}
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Carousel
          movies={trendingMovies.slice(0, 10)}
          services={trendingMovieServices.slice(0, 10)}
          loading={loading}
          isRefreshing={isRefreshing}
          scrollY={scrollY}
          title="Trending"
        />
        {data.map((list) => {
          return (
            <MovieList
              key={`list-${list.name}`}
              name={list.name}
              data={list.movies}
              loading={list.movies.length === 0}
              isRefreshing={isRefreshing}
            />
          );
        })}
        <H3 style={{ marginLeft: 15, marginTop: 15, marginBottom: 10 }}>
          Trending on your services
        </H3>
        {streamingMovieData.map((service) => {
          return (
            <MovieList
              key={`service-${service.name}`}
              name={`${service.name}`}
              data={service.movies}
              imagePath={service.imagePath}
              loading={service.movies.length === 0}
              isRefreshing={isRefreshing}
              onEndReached={() => loadMoreMovies(service.name)}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;
