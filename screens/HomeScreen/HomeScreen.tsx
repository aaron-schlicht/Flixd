import {
  View,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants";
import { useEffect, useState } from "react";
import useDiscoverMovies from "../../hooks/useDiscoverMovies";
import useGetTrendingMovies from "../../hooks/useGetTrendingMovies";
import Carousel from "../../components/ui/Carousel";
import useFindStreamingMovies from "../../hooks/useFindStreamingMovies";
import { Background, Flex } from "../../components/ui/Layouts";
import MovieLists from "./MovieLists";
import { H1, H3 } from "../../components/ui/Typography";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { MainProviders, imageBasePath } from "../../constants";

const TopServiceLogos = () => {
  const firstThreeProviders = MainProviders.slice(0, 3);

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

const HomeView = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const data = useDiscoverMovies(isRefreshing);
  const streamingMovieData = useFindStreamingMovies(isRefreshing);
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
  return (
    <View>
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
            style={{ position: "absolute", top: 0, right: 20 }}
          >
            <TouchableOpacity>
              <TopServiceLogos />
            </TouchableOpacity>
          </Link>
        </Flex>
      </SafeAreaView>
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
        <MovieLists data={data} isRefreshing={isRefreshing} />
        <H3 style={{ marginLeft: 15, marginTop: 15, marginBottom: 10 }}>
          Trending on your services
        </H3>
        <MovieLists
          data={streamingMovieData}
          isRefreshing={isRefreshing}
          namePrefix=""
        />
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;
