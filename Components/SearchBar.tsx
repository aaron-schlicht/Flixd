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
import { useGetSearchResultsQuery } from "../redux/apiSlice";
import {
  updateSearchResults,
  updateSearchResultServices,
} from "../redux/movieSlice";
import Animated, {
  Extrapolation,
  FadeOutRight,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../constants";
import { Movie, Service } from "../types";
import axios from "axios";

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

const fetchServices = async (id: number) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`
  );
  if (
    res &&
    res.data.results &&
    res.data.results["US"] &&
    res.data.results["US"].flatrate
  ) {
    return res.data.results["US"].flatrate as Service[];
  }
  return [];
};

const getResultServices = async (results: Movie[]) => {
  const servicePromises = results.map((movie) => fetchServices(movie.id));
  const resultServices = await Promise.all(servicePromises);
  return resultServices;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const width = useSharedValue(1);
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(query);
  const { data } = useGetSearchResultsQuery(debouncedValue);

  useEffect(() => {
    const updateResults = async () => {
      if (data) {
        dispatch(updateSearchResults(data.results));
        const resultServices = await getResultServices(data.results);
        dispatch(updateSearchResultServices(resultServices));
      }
    };

    updateResults();
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
            backgroundColor: Colors.secondary,
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
          color={query.length ? "white" : Colors.primary}
          size={25}
        />
        <TextInput
          keyboardAppearance="dark"
          autoCapitalize="words"
          autoCorrect={false}
          placeholderTextColor={Colors.primary}
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
            <Ionicons name="close-circle" color={Colors.primary} size={25} />
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
