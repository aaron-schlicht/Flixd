import { SafeAreaView, View } from "react-native";
import SearchBar from "../../components/SearchScreen/SearchBar";
import { Colors } from "../../constants";
import { useState } from "react";
import SearchResults from "../../components/SearchScreen/SearchResults";
import useDebounce from "../../hooks/useDebounce";
import GenreLists from "../../components/SearchScreen/GenreLists";

const SearchScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  return (
    <View style={{ backgroundColor: "#11142A", flex: 1 }}>
      <SafeAreaView
        style={{
          marginBottom: 15,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <SearchBar
          query={query}
          setQuery={setQuery}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      </SafeAreaView>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        {isFocused ? <SearchResults query={debouncedQuery} /> : <GenreLists />}
      </View>
    </View>
  );
};

export default SearchScreen;
