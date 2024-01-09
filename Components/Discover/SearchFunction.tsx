import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ImageSourcePropType,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Movie } from "../../constants";
import * as Haptics from "expo-haptics";
import {
  removeSelectedMovie,
  updateSelectedMovie,
  updateFocus,
} from "../../redux/movieSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetSearchResultsQuery } from "../../redux/apiSlice";

const SEARCH = "search";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  searchBarContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    width: "70%",
    padding: 8,
  },
  input: {
    paddingLeft: 5,
    width: "87%",
    color: "white",
  },
  closeButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultContainer: {
    height: "auto",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginVertical: 0,
  },
  checkIcon: {
    right: -6,
    top: -12,
    zIndex: 99,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchButtonText: {
    color: "#ccc",
    fontWeight: "300",
    fontSize: 25,
  },
  unfocusedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ImageButton: React.FC<{
  movie: Movie;
  onPress: (movie: Movie) => void;
  isSelected: boolean;
}> = ({ movie, onPress, isSelected }) => {
  const [error, setError] = useState(false);
  const path = "https://image.tmdb.org/t/p/original/" + movie.poster_path;
  return (
    <View
      style={{
        width: 110,
        margin: 5,
        height: 165,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          borderRadius: 5,
          borderWidth: 2,
          borderColor: isSelected ? "#ccc" : "#6e7275",
          justifyContent: "center",
          backgroundColor: "#6e7275",
        }}
        onPress={() => onPress(movie)}
      >
        {error ? (
          <Ionicons name="film" color="white" size={40} />
        ) : (
          <Image
            style={{ width: 100, height: 150, borderRadius: 5 }}
            source={{ uri: path }}
            onError={() => setError(true)}
          />
        )}
      </TouchableOpacity>
      <Text
        numberOfLines={2}
        style={{ paddingTop: 5, color: "white", textAlign: "center" }}
      >
        {movie.title}
      </Text>
    </View>
  );
};

export const StyledTextInput: React.FC<{
  query: string;
  handleSearch: () => void;
  handleChange: (e: string) => void;
}> = ({ handleSearch, handleChange, query }) => {
  return ` <TextInput
      keyboardAppearance="dark"
      autoFocus
      autoCapitalize="sentences"
      autoCorrect={false}
      placeholderTextColor="white"
      style={styles.input}
      onChangeText={(text) => handleChange(text)}
      value={query}
      returnKeyType="search"
      onSubmitEditing={() => handleSearch()}
      placeholder="Search movies..."
    />`;
};

export const Logo = () => {
  const imagePath = require("../../assets/tmdb.png");
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="film-outline" color="white" size={35} />
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          ReelRecs
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "300" }}>Powered by</Text>
        <Image
          source={imagePath as ImageSourcePropType}
          resizeMode="contain"
          style={{ width: 70, height: 20 }}
        />
      </View>
    </View>
  );
};

export const LogoLarge = () => {
  const imagePath = require("../../assets/tmdb.png");
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Ionicons name="film-outline" color="white" size={35} />
        <Text style={{ color: "white", fontSize: 35, fontWeight: "bold" }}>
          ReelRecs
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "300", fontSize: 14 }}>
          Powered by
        </Text>
        <Image
          source={imagePath as ImageSourcePropType}
          resizeMode="contain"
          style={{ width: 105, height: 30 }}
        />
      </View>
    </View>
  );
};

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

const SearchFunction = () => {
  const { selectedMovie, focus } = useSelector((state: any) => state.movies);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(query);
  const { data } = useGetSearchResultsQuery(debouncedValue);

  const onPress = (movie: Movie) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!!selectedMovie && selectedMovie.id === movie.id) {
      dispatch(removeSelectedMovie());
    } else {
      dispatch(updateSelectedMovie(movie));
    }
  };

  const handleCancel = () => {
    setQuery("");
    if (!!selectedMovie) {
      dispatch(removeSelectedMovie(selectedMovie));
    }
    dispatch(updateFocus("home"));
  };

  if (focus !== SEARCH) return null;

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContent}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" color="#ccc" size={15} />
          <StyledTextInput
            query={query}
            handleChange={(e) => setQuery(e)}
            handleSearch={() => Keyboard.dismiss()}
          />
          {query.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                setQuery("");
                if (!!selectedMovie) {
                  dispatch(removeSelectedMovie(selectedMovie));
                }
              }}
            >
              <Ionicons name="close-circle" color="#ccc" size={18} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => handleCancel()}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <SearchResults
        movies={data ? data.results : []}
        onPress={onPress}
        selectedMovie={selectedMovie}
      />
    </View>
  );
};

export default SearchFunction;

const SearchResults = ({
  movies,
  onPress,
  selectedMovie,
}: {
  movies: Movie[];
  onPress: (movie: Movie) => void;
  selectedMovie: Movie;
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.searchResultContainer}
        alwaysBounceVertical={false}
      >
        {movies.length
          ? movies.map((movie, index) => {
              if (!movie.poster_path) return null;
              const isSelected =
                !!selectedMovie && selectedMovie.id === movie.id;
              return (
                <View key={`result-${index}`}>
                  {isSelected ? (
                    <Ionicons
                      position="absolute"
                      style={styles.checkIcon}
                      name="checkmark-circle"
                      color="#ccc"
                      size={25}
                    />
                  ) : null}
                  <ImageButton
                    movie={movie}
                    onPress={onPress}
                    isSelected={isSelected}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};
