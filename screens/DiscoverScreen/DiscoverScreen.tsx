import { View, SafeAreaView, Dimensions } from "react-native";
import useGetDiscoverMovies from "../../hooks/useGetDiscoverMovies";
import SearchBar from "../../components/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MovieList from "../../components/MovieList";
import { Colors } from "../../constants";
import { useEffect, useState } from "react";
import Results from "../FlowScreen/Results";
import ServicesSelect from "../../components/ServicesSelect";
import { FlashList } from "@shopify/flash-list";
import useDiscoverMovies from "../../hooks/useDiscoverMovies";
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
  //const data = useGetDiscoverMovies(isRefreshing);
  const data = useDiscoverMovies(isRefreshing);

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
            estimatedItemSize={220}
            onRefresh={() => setIsRefreshing(true)}
            showsVerticalScrollIndicator={false}
            keyExtractor={({ name }) => name}
            ListEmptyComponent={() => (
              <View>
                <View
                  style={{ width: 100, height: 150, backgroundColor: "purple" }}
                >
                  {" "}
                </View>
              </View>
            )}
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
