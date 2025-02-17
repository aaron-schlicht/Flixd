import { View, Text, ScrollView } from "react-native";
import { Movie } from "../../../types";
import PosterButton from "../../../components/ui/PosterButton";

const SimilarMovies = ({ similarMovies }: { similarMovies: Movie[] }) => {
  const validMovies = similarMovies.filter(
    (movie) => movie.poster_path && movie.popularity > 20.0
  );
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
                movie={movie}
                dimensions={{ width: 150, height: 225 }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SimilarMovies;
