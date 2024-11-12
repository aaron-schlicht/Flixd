import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import MovieList from "../../components/ui/MovieList";
import { Colors } from "../../constants";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import useDiscoverMovies from "../../hooks/useDiscoverMovies";
const { height, width } = Dimensions.get("window");
import useGetTrendingMovies from "../../hooks/useGetTrendingMovies";
import Carousel from "../../components/ui/Carousel";
import ServicesSelect from "../../components/ServicesSelect";
import useFindStreamingMovies from "../../hooks/useFindStreamingMovies";

const DiscoverScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <SafeAreaView />
      <DiscoverView />
    </View>
  );
};

const DiscoverView = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const data = useDiscoverMovies(isRefreshing);
  const streamingMovieData = useFindStreamingMovies(isRefreshing);
  const { trendingMovies, trendingMovieServices, loading } =
    useGetTrendingMovies();

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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Carousel
          movies={trendingMovies}
          services={trendingMovieServices}
          loading={loading}
          isRefreshing={isRefreshing}
          title="Trending"
        />
        <View style={{ flex: 1, minHeight: 300, width: width }}>
          <FlashList
            contentContainerStyle={{
              paddingTop: 5,
            }}
            data={data}
            estimatedItemSize={220}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            keyExtractor={({ name }) => name}
            renderItem={({ item }) => {
              return (
                <MovieList
                  isRefreshing={isRefreshing}
                  name={item.name}
                  data={item.movies}
                />
              );
            }}
          />
        </View>
        <ServicesSelect />
        <View style={{ flex: 1, minHeight: 300, width: width }}>
          <FlashList
            contentContainerStyle={{
              paddingTop: 5,
            }}
            data={streamingMovieData}
            estimatedItemSize={220}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <MovieList
                  isRefreshing={isRefreshing}
                  name={"Trending on " + item.name}
                  data={item.movies}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;
