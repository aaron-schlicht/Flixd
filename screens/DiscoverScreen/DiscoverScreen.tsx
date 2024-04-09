import { View, FlatList, SafeAreaView } from "react-native";
import useGetDiscoverMovies from "../../hooks/useGetDiscoverMovies";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SearchResults from "./SearchResults";
import MovieList from "./MovieList";
import { Colors } from "../../constants";
import { useEffect, useState } from "react";
import Results from "../FlowScreen/Results";
import ServicesSelect from "./ServicesSelect";

const DiscoverScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        gap: 10,
        paddingVertical: 10,
      }}
    >
      <SafeAreaView />
      <SearchBar />
      <ServicesSelect />
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
    return (
      <Results movies={searchResults.filter((value) => value.poster_path)} />
    );
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

export default DiscoverScreen;
