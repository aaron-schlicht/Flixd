import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetSearchResultsQuery } from "../../redux/apiSlice";
import { updateSearchResults } from "../../redux/movieSlice";
import Animated, {
  Extrapolation,
  FadeOutRight,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  const [isFocused, setIsFocused] = useState(false);
  const width = useSharedValue(1);
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(query);
  const { data } = useGetSearchResultsQuery(debouncedValue);

  useEffect(() => {
    if (data) {
      dispatch(updateSearchResults(data.results));
    }
  }, [data]);

  useEffect(() => {
    if (isFocused) {
      width.value = 0;
    } else {
      width.value = 1;
    }
  }, [isFocused]);

  const handleClear = () => {
    setQuery("");
  };

  const handleCancel = () => {
    setQuery("");
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const searchBoxAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedWidth = interpolate(width.value, [0, 1], [85, 100], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      width: withTiming(`${interpolatedWidth}%`, {
        duration: 200,
      }),
    };
  });

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Animated.View
        style={[
          searchBoxAnimatedStyle,
          {
            backgroundColor: "#252942",
            borderRadius: 10,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingHorizontal: 10,
          },
        ]}
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
            fontSize: 20,
            flex: 1,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setQuery(text)}
          value={query}
          returnKeyType="search"
          placeholder="Search movies..."
        />
        {query.length ? (
          <TouchableOpacity style={{ width: 30 }} onPress={() => handleClear()}>
            <Ionicons name="close-circle" color="#A3BBD3" size={25} />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
      {isFocused ? (
        <Animated.View exiting={FadeOutRight}>
          <TouchableOpacity
            style={{ height: 50, justifyContent: "center" }}
            onPress={() => handleCancel()}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default SearchBar;
