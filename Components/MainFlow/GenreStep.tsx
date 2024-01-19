import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  updateGenre,
  updateKeywords,
  updateStep,
  resetFlow,
  addKeyword,
  updatePrevStep,
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
import Animated, {
  Easing,
  FadeIn,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  Transition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import RecsIcon from "./RecsIcon";
import { Ionicons } from "@expo/vector-icons";

const GenreStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const step = useSelector((state: RootState) => state.flow.step);
  const prevStep = useSelector((state: RootState) => state.flow.prevStep);
  const ref = useRef<Text>(null);
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
    dispatch(updatePrevStep(0));
  };

  const genreText = () => {
    switch (genres.length) {
      case 1:
        return Genres[genres[0]].name;
      case 2:
        return Genres[genres[0]].name + " & " + Genres[genres[1]].name;
      case 3:
        return (
          Genres[genres[0]].name +
          ", " +
          Genres[genres[1]].name +
          ", & " +
          Genres[genres[2]].name
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            width: Dimensions.get("window").width * 0.9,
          }}
        >
          <RecsIcon width={30} height={30} viewBox="0 0 75 75" />
          <Text
            style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Let's find a movie to watch
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            paddingTop: 20,
            width: Dimensions.get("window").width * 0.9,
          }}
        >
          <Ionicons name="happy" color="#A3BBD3" size={30} />
          <Text
            style={{
              color: "#A3BBD3",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Select up to 3 genres
          </Text>
        </View>
        <Text
          style={{
            height: 30,
            marginTop: 5,
            color: "white",
            fontSize: 24,
            fontWeight: "300",
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {genreText()}
        </Text>
      </View>
      <FlatList
        data={Object.entries(Genres)}
        numColumns={3}
        horizontal={false}
        contentContainerStyle={{
          paddingTop: 5,
          paddingBottom: 65,
          paddingHorizontal: 5,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const genre = item[1];
          return (
            <View style={{ width: "33%" }} key={`genre-${genre.id}`}>
              <GenreButton
                genre={genre}
                handleSelect={handleGenreSelect}
                disabled={
                  genres.length === 3 &&
                  !!!genres.find((id: number) => id === genre.id)
                }
                isActive={!!genres.find((id: number) => id === genre.id)}
              />
            </View>
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          width: Dimensions.get("window").width,
        }}
      >
        <LinearGradient
          style={{
            width: "100%",
            height: 120,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            paddingBottom: 30,
          }}
          colors={["transparent", "rgba(21, 24, 45, 0.9)"]}
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
              {!!!genres.length ? "Skip" : "Next"}
            </Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </View>
  );
};

const GenreButton = ({
  handleSelect,
  genre,
  isActive,
  disabled,
}: {
  handleSelect: (value: any) => void;
  genre: Genre;
  isActive: boolean;
  disabled: boolean;
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
        padding: 5,
        height: 75,
      }}
      disabled={disabled}
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
