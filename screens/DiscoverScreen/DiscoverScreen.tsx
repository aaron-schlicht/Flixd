import { View, SafeAreaView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import useFilteredMovies from "../../hooks/useFilteredMovies";
import { FlashList } from "@shopify/flash-list";
import { Background } from "../../components/ui/Layouts";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../../types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ServicesFilter from "../../components/ui/ServicesFilter";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as Haptics from "expo-haptics";
import { SkeletonMovieGrid } from "./components/SkeletonMovieGrid";
import { MovieGrid } from "./components/MovieGrid";
import { HeaderActions } from "./components/HeaderActions";
import { FloatingButtons } from "./components/FloatingButtons";
import { styles } from "./styles";
import { AppHeader } from "../../components/ui/AppHeader";

const { width, height } = Dimensions.get("screen");

const DiscoverScreen = () => {
  const {
    movies,
    loading,
    loadingMore,
    fetchMoreMovies,
    getRandomMovie,
    showScrollTop,
    setShowScrollTop,
  } = useFilteredMovies();
  const listRef = useRef<FlashList<Movie>>(null);
  const router = useRouter();
  const [filterVisible, setFilterVisible] = useState(false);
  const filterHeight = useSharedValue(0);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );

  useEffect(() => {
    filterHeight.value = withTiming(filterVisible ? 135 : 0, { duration: 300 });
  }, [filterVisible]);

  const animatedFilterStyle = useAnimatedStyle(() => ({
    height: filterHeight.value,
    overflow: "hidden",
  }));

  const handleServicePress = () => {
    if (selectedServices.length > 0) {
      setFilterVisible((prev) => !prev);
    } else {
      router.push("/modal/services");
    }
  };

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: any } };
  }) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowScrollTop(scrollPosition > height * 0.3);
  };

  const handleRandomMovie = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const randomMovie = await getRandomMovie();
    if (randomMovie) {
      router.push(`/modal/movie?id=${randomMovie.id}`);
    }
  };

  return (
    <Background>
      <AppHeader>
        <HeaderActions
          selectedServices={selectedServices}
          onServicePress={handleServicePress}
        />
      </AppHeader>
      <Animated.View style={[{ zIndex: 10 }, animatedFilterStyle]}>
        <ServicesFilter />
      </Animated.View>

      <View style={{ height: "100%", width }}>
        {loading ? (
          <SkeletonMovieGrid />
        ) : (
          <MovieGrid
            movies={movies}
            listRef={listRef}
            onScroll={handleScroll}
            loadingMore={loadingMore}
            fetchMoreMovies={fetchMoreMovies}
          />
        )}
      </View>

      <FloatingButtons
        showScrollTop={showScrollTop}
        onScrollTop={() =>
          listRef.current?.scrollToOffset({ offset: 0, animated: true })
        }
        showRandom={movies.length > 0}
        onRandom={handleRandomMovie}
      />
    </Background>
  );
};

export default DiscoverScreen;
