import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateGenre, updateKeywords, resetFilter } from "../redux/flowSlice";
import { Colors, Genres } from "../constants";

const SelectedFilters = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const filters = useSelector((state: RootState) => state.flow.filters);
  const dispatch = useDispatch();

  const handleRemoveGenre = (genreId: number) => {
    dispatch(updateGenre(genreId));
  };

  const handleRemoveKeyword = (keywordId: number) => {
    dispatch(updateKeywords({ id: keywordId }));
  };

  const handleResetFilter = (filterName: string) => {
    dispatch(resetFilter(filterName));
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 10 }}>
      {genres.map((genreId) => (
        <TouchableOpacity
          key={`genre-${genreId}`}
          style={{
            backgroundColor: "blue",
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => handleRemoveGenre(genreId)}
        >
          <Text style={{ color: "white" }}>{Genres[genreId].name}</Text>
        </TouchableOpacity>
      ))}
      {keywords.map((keyword) => (
        <TouchableOpacity
          key={`keyword-${keyword.id}`}
          style={{
            backgroundColor: "blue",
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => handleRemoveKeyword(keyword.id)}
        >
          <Text style={{ color: "white" }}>{keyword.name}</Text>
        </TouchableOpacity>
      ))}
      {filters.rating.min !== 0 || filters.rating.max !== 100 ? (
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => handleResetFilter("rating")}
        >
          <Text style={{ color: "white" }}>
            Rating: {filters.rating.min} - {filters.rating.max}
          </Text>
        </TouchableOpacity>
      ) : null}
      {filters.releaseDate.min !== 1900 ||
      filters.releaseDate.max !== new Date().getFullYear() ? (
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => handleResetFilter("releaseDate")}
        >
          <Text style={{ color: "white" }}>
            Year: {filters.releaseDate.min} - {filters.releaseDate.max}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SelectedFilters;
