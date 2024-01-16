import { StackScreenProps } from "@react-navigation/stack";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../App";
import { FC, useEffect, useState } from "react";
import useGetMovieInfo from "./useGetMovieInfo";
import Header from "./Header";
import Description from "./Description";
import StreamingServices from "./StreamingServices";
import People from "./People";
import SimilarMovies from "./SimilarMovies";
import { Image } from "expo-image";

interface Props extends StackScreenProps<RootStackParamList, "Movie"> {}

//TODO: query watch providers and say 'powered by justwatch'

const MovieScreen: FC<Props> = ({ route }) => {
  const { id } = route.params;

  const {
    isLoading,
    movie,
    rating,
    topCast,
    topCrew,
    streamingServices,
    similarMovies,
  } = useGetMovieInfo(id);

  if (movie) {
    return (
      <View style={{ flex: 1, backgroundColor: "#15182D" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
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
        </ScrollView>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#15182D" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator
              size="large"
              color="white"
              style={{ alignSelf: "center" }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#15182D" }}>
      <Text style={{ color: "white" }}>Issue getting movie details</Text>
    </View>
  );
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
    <Text style={{ color: "#A3BBD3" }}>Powered by </Text>
    <Image
      style={{ width: 120, height: "100%" }}
      contentFit="contain"
      source={require("../../assets/tmdb.png")}
    />
  </View>
);

export default MovieScreen;
