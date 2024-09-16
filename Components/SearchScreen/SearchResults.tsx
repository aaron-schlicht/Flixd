import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Movie, RootStackParamList, Service } from "../../types";
import { fetchMovieServices, get } from "../../api";
import { Colors, imageBasePath, MEDIUM_POSTER_BASE_URL } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
const BASE_URL = "/search/movie";

type searchScreenProp = StackNavigationProp<RootStackParamList, "Search">;

const SearchResults = ({ query }: { query: string }) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [services, setServices] = useState<Service[][]>([]);
  const navigation = useNavigation<searchScreenProp>();

  const fetchMoviesAndServices = async (query: string) => {
    const { data } = await get<{ results: Movie[] }>(
      BASE_URL + `?query=${query}`
    );
    const movies = data.results.sort((a, b) => b.vote_count - a.vote_count);
    setResults(movies);
    const servicePromises = movies.map(({ id }) => fetchMovieServices(id));
    const serviceResults = await Promise.all(servicePromises);
    setServices(serviceResults);
  };
  useEffect(() => {
    fetchMoviesAndServices(query);
  }, [query]);

  const handlePosterPress = (movie: Movie) => {
    navigation.navigate("Movie", { movie: movie });
  };

  return (
    <View>
      <View
        style={{
          minHeight: 2,
          paddingBottom: 200,
        }}
      >
        <FlatList
          data={results}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (!item.poster_path) return null;
            return (
              <View
                style={{
                  width: "97%",
                  alignSelf: "center",
                  padding: 5,
                  borderBottomColor: Colors.secondary,
                  borderBottomWidth: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => handlePosterPress(item)}
                >
                  <Image
                    source={{ uri: MEDIUM_POSTER_BASE_URL + item.poster_path }}
                    style={{ width: 50, height: 75, borderRadius: 10 }}
                  />
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: 18,
                      width: "70%",
                    }}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                  >
                    {item.title}{" "}
                    {item.release_date
                      ? `(${new Date(item.release_date).getFullYear()})`
                      : ""}
                  </Text>
                  {services.length > 0 && services[index].length > 0 && (
                    <View
                      style={{
                        padding: 10,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                        }}
                        source={{
                          uri: imageBasePath + services[index][0].logo_path,
                        }}
                        transition={200}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchResults;
