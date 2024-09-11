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
        <View style={{ flex: 1, minHeight: 600, width: width }}>
          <FlashList
            contentContainerStyle={{
              paddingTop: 5,
              paddingBottom: 250,
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
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;
