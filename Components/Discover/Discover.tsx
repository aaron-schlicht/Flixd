import { View, FlatList } from "react-native";
import useGetDiscoverMovies from "./useGetDiscoverMovies";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SearchResults from "./SearchResults";
import MovieList from "./MovieList";
import { Movie } from "../../constants";
import { useEffect, useState } from "react";

const Discover = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#15182D", gap: 10 }}>
      <SearchBar />
      <DiscoverView />
    </View>
  );
};

const DiscoverView = () => {
  const data = useGetDiscoverMovies();

  const searchResults = useSelector(
    (state: RootState) => state.movies.searchResults
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  }, [isRefreshing]);

  if (searchResults.length) {
    return <SearchResults searchResults={searchResults} />;
  } else {
    return (
      <FlatList
        contentContainerStyle={{
          gap: 15,
          paddingBottom: 200,
        }}
        data={data}
        refreshing={isRefreshing}
        onRefresh={() => setIsRefreshing(true)}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => {
          return (
            <MovieList
              isRefreshing={isRefreshing}
              name={item.name}
              data={item.movies}
            />
          );
        }}
      />
    );
  }
};

export default Discover;
