import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateGenre, updateStep } from "../../redux/flowSlice";
import { Colors, GenreIcons, Genres } from "../../constants";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { RootState } from "../../redux/store";
import RecsIcon from "./RecsIcon";
import { Ionicons } from "@expo/vector-icons";
import { Genre } from "../../types";

const GenreStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const dispatch = useDispatch();

  const handleGenreSelect = (selection: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateGenre(selection));
  };

  const handleNext = () => {
    dispatch(updateStep(1));
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
      <FlatList
        data={Object.entries(Genres)}
        numColumns={4}
        horizontal={false}
        contentContainerStyle={{
          paddingTop: 5,
          paddingBottom: 50,
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const genre = item[1];
          return (
            <View style={{ width: "25%" }} key={`genre-${genre.id}`}>
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
        backgroundColor: isActive ? Colors.primary : Colors.secondary,
        flex: 1,
        alignItems: "center",
        gap: 5,
        margin: 5,
        justifyContent: "center",
        borderRadius: 10,
        padding: 5,
        height: 55,
      }}
      disabled={disabled}
      onPress={() => handleSelect(genre.id)}
    >
      <Text
        style={{
          color: isActive ? Colors.background : "#FFF",
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
