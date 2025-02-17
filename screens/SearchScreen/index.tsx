import { SafeAreaView, View } from "react-native";
import SearchBar from "../../components/SearchScreen/SearchBar";
import { Colors } from "../../constants";
import { useState } from "react";
import SearchResults from "../../components/SearchScreen/SearchResults";
import useDebounce from "../../hooks/useDebounce";
import GenreLists from "../../components/SearchScreen/GenreLists";
import { AppHeader } from "../../components/ui/AppHeader";

const SearchScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  return (
    <View style={{ backgroundColor: Colors.header, flex: 1 }}>
      <AppHeader>
        <SearchBar
          query={query}
          setQuery={setQuery}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      </AppHeader>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        {isFocused ? <SearchResults query={debouncedQuery} /> : <GenreLists />}
      </View>
    </View>
  );
};

export default SearchScreen;
