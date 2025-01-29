import { FlashList } from "@shopify/flash-list";
import { View, Dimensions } from "react-native";
import { Movie } from "../../types";
import MovieList from "../../components/ui/MovieList";
const { width } = Dimensions.get("screen");

const MovieLists = ({
  data,
  isRefreshing,
  namePrefix,
}: {
  data: { name: string; movies: Movie[]; imagePath?: string }[];
  isRefreshing: boolean;
  namePrefix?: string;
}) => (
  <View style={{ flex: 1, minHeight: 300, width: width }}>
    <FlashList
      contentContainerStyle={{
        paddingTop: 5,
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
            name={namePrefix ? `${namePrefix}${item.name}` : item.name}
            data={item.movies}
            imagePath={item.imagePath}
          />
        );
      }}
    />
  </View>
);

export default MovieLists;
