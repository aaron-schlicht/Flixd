import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  updateGenre,
  updateKeywords,
  resetFilter,
  updateServiceSelect,
  updateCertifications,
} from "../redux/flowSlice";
import { Colors, Genres } from "../constants";
import { Keyword } from "../types";

const SelectedFilters = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const filters = useSelector((state: RootState) => state.flow.filters);
  const certifications = useSelector(
    (state: RootState) => state.flow.certifications
  );
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

  const handleRemoveCertification = (cert: string) => {
    dispatch(updateCertifications(cert));
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexDirection: "row", padding: 10 }}
      contentContainerStyle={{ paddingRight: 60 }}
    >
      {genres.map((genreId: number) => (
        <TouchableOpacity
          key={`genre-${genreId}`}
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            margin: 5,
            borderRadius: 5,
            position: "relative",
          }}
          onPress={() => handleRemoveGenre(genreId)}
        >
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 16,
              height: 16,
              borderRadius: 360,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: "white", lineHeight: 16 }}
            >
              ×
            </Text>
          </View>
          <Text style={{ color: Colors.background }}>
            {Genres[genreId].name}
          </Text>
        </TouchableOpacity>
      ))}
      {keywords.map((keyword: Keyword) => (
        <TouchableOpacity
          key={`keyword-${keyword.id}`}
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            margin: 5,
            borderRadius: 5,
            position: "relative",
          }}
          onPress={() => handleRemoveKeyword(keyword.id)}
        >
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 16,
              height: 16,
              borderRadius: 360,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: "white", lineHeight: 16 }}
            >
              ×
            </Text>
          </View>
          <Text style={{ color: Colors.background }}>
            {keyword.name.slice(0, 1).toUpperCase() + keyword.name.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
      {filters.rating.min !== 0 || filters.rating.max !== 100 ? (
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => handleResetFilter("rating")}
        >
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 16,
              height: 16,
              borderRadius: 360,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: "white", lineHeight: 16 }}
            >
              ×
            </Text>
          </View>
          <Text style={{ color: Colors.background }}>
            Rating: {(filters.rating.min * 0.1).toFixed(1)} -{" "}
            {(filters.rating.max * 0.1).toFixed(1)}
          </Text>
        </TouchableOpacity>
      ) : null}
      {filters.releaseDate.min !== 1900 ||
      filters.releaseDate.max !== new Date().getFullYear() ? (
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => handleResetFilter("releaseDate")}
        >
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 16,
              height: 16,
              borderRadius: 360,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                lineHeight: 16,
              }}
            >
              ×
            </Text>
          </View>
          <Text style={{ color: Colors.background }}>
            Year: {filters.releaseDate.min} - {filters.releaseDate.max}
          </Text>
        </TouchableOpacity>
      ) : null}
      {certifications.map((cert: string) => (
        <TouchableOpacity
          key={`certification-${cert}`}
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            margin: 5,
            borderRadius: 5,
            position: "relative",
          }}
          onPress={() => handleRemoveCertification(cert)}
        >
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 16,
              height: 16,
              borderRadius: 360,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: "white", lineHeight: 16 }}
            >
              ×
            </Text>
          </View>
          <Text style={{ color: Colors.background }}>{cert}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SelectedFilters;
