import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetSearchResultsQuery } from "../../redux/apiSlice";
import { updateSearchResults } from "../../redux/movieSlice";

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(query);
  const { data } = useGetSearchResultsQuery(debouncedValue);

  useEffect(() => {
    if (data) {
      dispatch(updateSearchResults(data.results));
    }
  }, [data]);

  const handleCancel = () => {
    setQuery("");
  };
  return (
    <View
      style={{
        backgroundColor: "#252942",
        borderRadius: 10,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        gap: 5,
      }}
    >
      <Ionicons
        name="search-outline"
        color={query.length ? "white" : "#A3BBD3"}
        size={25}
      />
      <TextInput
        keyboardAppearance="dark"
        autoCapitalize="words"
        autoCorrect={false}
        placeholderTextColor="#A3BBD3"
        style={{
          color: "white",
          width: "84%",
          fontSize: 20,
        }}
        onChangeText={(text) => setQuery(text)}
        value={query}
        returnKeyType="search"
        placeholder="Search movies..."
      />
      {query.length ? (
        <TouchableOpacity onPress={() => handleCancel()}>
          <Ionicons name="close-circle" color="#A3BBD3" size={25} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
