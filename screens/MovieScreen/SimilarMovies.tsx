import { View, Text, ScrollView } from "react-native";
import { Movie, RootStackParamList } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PosterButton from "../../Components/PosterButton";

type recsScreenProp = StackNavigationProp<RootStackParamList, "Movie">;

const SimilarMovies = ({ similarMovies }: { similarMovies: Movie[] }) => {
  const validMovies = similarMovies.filter(
    (movie) => movie.poster_path && movie.popularity > 20.0
  );
  const navigation = useNavigation<recsScreenProp>();
  const handleMoviePress = (id: number) => {
    navigation.push("Movie", { id: id });
  };
  if (!validMovies.length) return null;
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
        {validMovies.map((movie, index) => {
          return (
            <View
              key={`similarMovie-${index}`}
              style={{
                paddingLeft: index === 0 ? 20 : 0,
                paddingRight: index === similarMovies.length - 1 ? 20 : 0,
              }}
            >
              <PosterButton
                posterPath={
                  "https://image.tmdb.org/t/p/w342/" + movie.poster_path
                }
                onPress={() => handleMoviePress(movie.id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SimilarMovies;
