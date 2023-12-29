import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  TextInput,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  updateGenre,
  updateKeywords,
  updateStep,
  resetFlow,
  addKeyword,
} from "../../redux/flowSlice";
import {
  Genre,
  GenreIcons,
  Genres,
  Keyword,
  KeywordMap,
} from "../../constants";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import KeywordSearch from "./KeywordSearch";
import { LinearGradient } from "expo-linear-gradient";
import { RootState } from "../../redux/store";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";

const GenreStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(resetFlow());
    }, 500);
  }, []);

  const handleGenreSelect = (selection: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateGenre(selection));
  };

  const handleNext = () => {
    dispatch(updateStep(1));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={Object.entries(Genres)}
          numColumns={3}
          horizontal={false}
          //refreshing={refreshing}
          //onRefresh={onRefresh}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ paddingBottom: 65 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const genre = item[1];
            return (
              <View style={{ width: "33%" }} key={`genre-${genre.id}`}>
                <GenreButton
                  genre={genre}
                  handleSelect={handleGenreSelect}
                  isActive={!!genres.find((id: number) => id === genre.id)}
                />
              </View>
            );
          }}
        />
        {!!!genres.length ? null : (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
              width: "120%",
            }}
          >
            <LinearGradient
              style={{
                width: "100%",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              colors={["transparent", "rgba(21, 24, 45, 0.5)"]}
            >
              <TouchableHighlight
                style={{
                  backgroundColor: "white",
                  width: 150,
                  borderRadius: 30,
                  padding: 10,
                }}
                underlayColor="rgba(255,255,255,0.8)"
                onPress={handleNext}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: 25,
                  }}
                >
                  Next
                </Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        )}
      </View>
    </View>
  );
};

const GenreButton = ({
  handleSelect,
  genre,
  isActive,
}: {
  handleSelect: (value: any) => void;
  genre: Genre;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? "#A3BBD3" : "#252942",
        flex: 1,
        alignItems: "center",
        gap: 5,
        margin: 5,
        justifyContent: "center",
        borderRadius: 15,
        padding: 10,
        height: 60,
      }}
      onPress={() => handleSelect(genre.id)}
    >
      <Text style={{ fontSize: 20 }}>{GenreIcons[genre.id]}</Text>
      <Text
        style={{
          color: isActive ? "#15182D" : "#FFF",
          textAlign: "center",
          fontSize: 14,
        }}
        numberOfLines={1}
        allowFontScaling={true}
        adjustsFontSizeToFit={true}
      >
        {genre.name}
      </Text>
    </TouchableOpacity>
  );
};

export default GenreStep;
