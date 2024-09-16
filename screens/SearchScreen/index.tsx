import { SafeAreaView, View } from "react-native";
import SearchBar from "../../components/SearchScreen/SearchBar";
import { Colors } from "../../constants";
import { useState } from "react";
import SearchResults from "../../components/SearchScreen/SearchResults";
import useDebounce from "../../hooks/useDebounce";

const SearchScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  return (
    <View style={{ backgroundColor: Colors.background, flex: 1 }}>
      <SafeAreaView />
      <SearchBar
        query={query}
        setQuery={setQuery}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
      {isFocused && <SearchResults query={debouncedQuery} />}
    </View>
  );
};

export default SearchScreen;
