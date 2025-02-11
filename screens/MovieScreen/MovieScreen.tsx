import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useGetMovieInfo from "../../hooks/useGetMovieInfo";
import Description from "./Description";
import StreamingServices from "./StreamingServices";
import People from "./People";
import SimilarMovies from "./SimilarMovies";
import { Colors, Genres, imageBasePath } from "../../constants";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Header from "./Header";
import { Image } from "expo-image";
import ImageHeader from "./ImageHeader";
import { H2 } from "../../components/ui/Typography";
const HEADER_EXPANDED_HEIGHT = Dimensions.get("window").height * 0.3;
const HEADER_COLLAPSED_HEIGHT = 60;

const MovieScreen = ({ id }: { id: string }) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [230, 245], [0, 1]);

    return {
      opacity: opacity,
    };
  });

  const { movie, backdrop, rating, runtime, tagline, loading } =
    useGetMovieInfo(parseInt(id));

  const genres =
    movie && movie.genre_ids
      ? movie.genre_ids.map((genre: number) => Genres[genre])
      : [];

  if (loading) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
          <H2>Something went wrong</H2>
          <Text style={{ fontSize: 60 }}>😔</Text>
          <Text style={{ color: Colors.primary, fontSize: 20 }}>
            Please try again
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {!backdrop ? null : (
          <ImageHeader sv={scrollY} posterPath={imageBasePath + backdrop} />
        )}
        <Animated.View style={[styles.movieTitleContainer, headerOpacity]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 40,
            }}
          >
            <Text
              style={styles.movieTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {movie.title}
            </Text>
          </View>
        </Animated.View>
        <Animated.ScrollView
          style={[
            styles.scrollView,
            {
              paddingTop: !backdrop
                ? Dimensions.get("window").height * 0.2
                : HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT,
            },
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Header movie={movie} runtime={runtime} rating={rating} />
          <Description
            tagline={tagline || ""}
            overview={movie.overview || ""}
            genres={genres}
          />
          <StreamingServices id={parseInt(id)} />
          <People id={parseInt(id)} />
          {/*<SimilarMovies similarMovies={similarMovies} />*/}
          <PoweredLogo />
          <View style={{ paddingBottom: HEADER_EXPANDED_HEIGHT }} />
        </Animated.ScrollView>
      </View>
    );
  }
};

const PoweredLogo = () => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 30,
      justifyContent: "center",
    }}
  >
    <Text style={{ color: Colors.primary }}>Powered by </Text>
    <Image
      style={{ width: 120, height: "100%" }}
      contentFit="contain"
      source={require("../../assets/tmdb.png")}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    paddingBottom: 0,
    marginTop: 0,
    zIndex: 10,
  },
  movieTitleContainer: {
    position: "absolute",
    zIndex: 120,
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: HEADER_COLLAPSED_HEIGHT,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: Colors.background,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
});

export default MovieScreen;
