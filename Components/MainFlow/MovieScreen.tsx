import { StackScreenProps } from "@react-navigation/stack";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../../App";
import { FC, useEffect, useState } from "react";
import {
  useGetMovieInfoQuery,
  useGetMovieRatingQuery,
  useGetProvidersQuery,
} from "../../redux/apiSlice";
import { Service, WatchProvider, imageBasePath } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

interface Props extends StackScreenProps<RootStackParamList, "Movie"> {}

const getColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

//TODO: query watch providers and say 'powered by justwatch'
//TODO: query recommended movies as well
//TODO: query keywords?
//TODO: query credits

const MovieScreen: FC<Props> = ({ route }) => {
  const { id } = route.params;
  const { data, isLoading } = useGetMovieInfoQuery(id);
  const { data: movieRatingData } = useGetMovieRatingQuery(id);
  const { data: providersData, isLoading: isProvidersLoading } =
    useGetProvidersQuery(id);

  const getMovieRating = () => {
    let rating = "";
    if (movieRatingData && movieRatingData.results) {
      let usRelease = movieRatingData.results.find(
        (value: any) => value.iso_3166_1 === "US"
      );
      if (usRelease && !!usRelease.release_dates.length) {
        if (usRelease.release_dates.length > 1) {
          rating =
            usRelease.release_dates[usRelease.release_dates.length - 1]
              .certification;
        } else {
          rating = usRelease.release_dates[0].certification;
        }
      }
    }
    return rating;
  };

  const getStreamingServices = () => {
    try {
      if (providersData && providersData.results["US"].flatrate) {
        return providersData.results["US"].flatrate as Service[];
      }
    } catch (error) {
      console.log(error);
    }
  };
  const BACKDROP_URL = imageBasePath + data?.backdrop_path;

  const rating = getMovieRating();
  const streamingServices = getStreamingServices();
  const navigation = useNavigation();
  if (data) {
    return (
      <View style={{ flex: 1, backgroundColor: "#15182D" }}>
        <Image
          style={{
            zIndex: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.45,
          }}
          transition={500}
          source={{ uri: BACKDROP_URL }}
          contentFit="cover"
        />
        <LinearGradient
          style={{
            zIndex: 1,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.45,
            position: "absolute",
          }}
          colors={["transparent", "rgba(21, 24, 45, 1)"]}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 360,
            width: 50,
            height: 50,
            position: "absolute",
            top: 50,
            left: 15,
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(21, 24, 45, 0.3)",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" color="white" size={30} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginTop: -70, zIndex: 100 }}>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              zIndex: 100,
              fontWeight: "bold",

              paddingHorizontal: 15,
            }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {data.title}
          </Text>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingTop: 5,
                height: 40,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "600" }}
              >
                {new Date(data.release_date).getFullYear()}
              </Text>
              <Text
                style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "900" }}
              >
                ·
              </Text>
              {!!rating.length ? (
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    backgroundColor: "#252942",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#A3BBD3",
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {rating}
                  </Text>
                </View>
              ) : null}
              {!!rating.length ? (
                <Text
                  style={{
                    color: "#A3BBD3",
                    fontSize: 20,
                    fontWeight: "900",
                  }}
                >
                  ·
                </Text>
              ) : null}
              <Text style={{ color: "#A3BBD3", fontSize: 18 }}>
                {data.runtime} mins
              </Text>
              <Text
                style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "900" }}
              >
                ·
              </Text>
              <Text
                style={{
                  color: getColor(data.vote_average),
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {data.vote_average.toFixed(2)}
              </Text>
            </View>
            <View style={{ padding: 20, gap: 5 }}>
              <Text
                style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "bold" }}
              >
                {data.tagline}
              </Text>
              <Text style={{ color: "white", lineHeight: 20, fontSize: 14 }}>
                {data.overview}
              </Text>
              <FlatList
                data={data.genres}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 15, paddingTop: 10 }}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        backgroundColor: "#252942",
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>{item.name}</Text>
                    </View>
                  );
                }}
              />
            </View>
            {!!streamingServices ? (
              <View
                style={{
                  paddingHorizontal: 20,
                  marginVertical: 5,
                  paddingVertical: 10,
                  gap: 15,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Where to stream
                </Text>
                <FlatList
                  data={streamingServices}
                  horizontal
                  contentContainerStyle={{ gap: 10 }}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <Image
                          style={{ width: 60, height: 60, borderRadius: 10 }}
                          source={{ uri: imageBasePath + item.logo_path }}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
          </View>
        </View>
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

export default MovieScreen;
