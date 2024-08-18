import { View, SafeAreaView, Dimensions } from "react-native";
import useGetDiscoverMovies from "../../hooks/useGetDiscoverMovies";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MovieList from "./MovieList";
import { Colors } from "../../constants";
import { useEffect, useState } from "react";
import Results from "../FlowScreen/Results";
import ServicesSelect from "./ServicesSelect";
import { FlashList } from "@shopify/flash-list";
const { height, width } = Dimensions.get("window");

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
      <DiscoverView />
    </View>
  );
};

const DiscoverView = () => {
  const searchResults = useSelector(
    (state: RootState) => state.movies.searchResults
  );
  const searchResultServices = useSelector(
    (state: RootState) => state.movies.searchResultServices
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const data = useGetDiscoverMovies(isRefreshing);

  useEffect(() => {
    if (isRefreshing) {
      var timeout = setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isRefreshing]);

  if (searchResults.length) {
    return (
      <Results
        providers={searchResultServices || [[]]}
        movies={searchResults.filter((value) => value.poster_path)}
      />
    );
  } else {
    return (
      <View>
        <ServicesSelect />
        <View style={{ flex: 1, minHeight: height, width: width }}>
          <FlashList
            contentContainerStyle={{
              paddingTop: 75,
              paddingBottom: 250,
            }}
            data={data}
            refreshing={isRefreshing}
            estimatedItemSize={200}
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
        </View>
      </View>
    );
  }
};

export default DiscoverScreen;
