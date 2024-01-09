import { View, FlatList } from "react-native";
import useGetDiscoverMovies from "./useGetDiscoverMovies";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SearchResults from "./SearchResults";
import MovieList from "./MovieList";
import { Movie } from "../../constants";

const Discover = () => {
  const data = useGetDiscoverMovies();
  const searchResults = useSelector(
    (state: RootState) => state.movies.searchResults
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#15182D" }}>
      <View style={{ width: "100%", padding: 10 }}>
        <SearchBar />
      </View>
      <DiscoverView discoverLists={data} searchResults={searchResults} />
    </View>
  );
};

interface DiscoverViewProps {
  discoverLists: { name: string; movies: Movie[] }[];
  searchResults: Movie[];
}

const DiscoverView = ({ discoverLists, searchResults }: DiscoverViewProps) => {
  if (searchResults.length) {
    return <SearchResults searchResults={searchResults} />;
  } else {
    return (
      <FlatList
        contentContainerStyle={{
          gap: 15,
          paddingBottom: 200,
        }}
        data={discoverLists}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => {
          return <MovieList name={item.name} data={item.movies} />;
        }}
      />
    );
  }
};

export default Discover;
