import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
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
import { Colors, imageBasePath } from "../../constants";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import { Image } from "expo-image";
import ImageHeader from "./ImageHeader";
import { RootStackParamList } from "../../types";

const HEADER_EXPANDED_HEIGHT = Dimensions.get("window").height * 0.5;
const HEADER_COLLAPSED_HEIGHT = 100;
interface Props extends StackScreenProps<RootStackParamList, "Movie"> {}

const MovieScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [210, 215],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
    };
  });

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  const {
    isLoading,
    movie,
    rating,
    topCast,
    topCrew,
    streamingServices,
    similarMovies,
  } = useGetMovieInfo(id);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <BackButton onPress={handleBack} />
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <BackButton onPress={handleBack} />
        <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
            Something went wrong
          </Text>
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
        {!movie.backdrop_path ? null : (
          <ImageHeader
            sv={scrollY}
            posterPath={imageBasePath + movie.backdrop_path}
          />
        )}
        <BackButton onPress={handleBack} />
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
              paddingTop: !movie.backdrop_path
                ? Dimensions.get("window").height * 0.2
                : HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT,
            },
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Header movie={movie} rating={rating} />
          <Description
            tagline={movie.tagline || ""}
            overview={movie.overview || ""}
            genres={movie.genres || []}
          />
          <StreamingServices streamingServices={streamingServices} />
          <People topCast={topCast} topCrew={topCrew} />
          <SimilarMovies similarMovies={similarMovies} />
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

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{
      padding: 10,
      borderRadius: 360,
      width: 50,
      height: 50,
      position: "absolute",
      top: 50,
      left: 15,
      zIndex: 200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(21, 24, 45, 0.3)",
    }}
    onPress={onPress}
  >
    <Ionicons name="chevron-back" color="white" size={30} />
  </TouchableOpacity>
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
