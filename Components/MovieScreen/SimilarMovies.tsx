import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Movie } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";

const SimilarMovies = ({ similarMovies }: { similarMovies: Movie[] }) => {
  if (!similarMovies.length) return null;
  return (
    <View style={{ paddingTop: 30 }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "white",
          paddingLeft: 20,
        }}
      >
        You might also like
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
      >
        {similarMovies
          .filter((movie) => movie.poster_path && movie.popularity > 40.0)
          .map((movie, index) => {
            return (
              <View
                key={`similarMovie-${index}`}
                style={{
                  paddingLeft: index === 0 ? 20 : 0,
                  paddingRight: index === similarMovies.length - 1 ? 20 : 0,
                }}
              >
                <MovieButton movie={movie} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default SimilarMovies;

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
const MovieButton = ({ movie }: { movie: Movie }) => {
  const navigation = useNavigation<recsScreenProp>();
  const handleMoviePress = (id: number) => {
    navigation.push("Movie", { id: id });
  };
  return (
    <TouchableOpacity
      onPress={() => handleMoviePress(movie.id)}
      style={{ paddingHorizontal: 10 }}
    >
      <View
        style={{
          shadowColor: "black",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: 10,
          backgroundColor: "black",
          width: 100,
          height: 150,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 150,
            borderRadius: 10,
          }}
          contentFit="cover"
          transition={500}
          source={{
            uri: "https://image.tmdb.org/t/p/w342/" + movie.poster_path,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
