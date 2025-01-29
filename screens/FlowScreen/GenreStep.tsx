import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateGenre } from "../../redux/flowSlice";
import { Colors, Genres } from "../../constants";
import * as Haptics from "expo-haptics";
import { RootState } from "../../redux/store";
import { Genre } from "../../types";
import { FlashList } from "@shopify/flash-list";

const GenreStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const dispatch = useDispatch();

  const handleGenreSelect = (selection: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateGenre(selection));
  };

  return (
    <View style={{ height: 300 }}>
      <FlashList
        data={Object.entries(Genres)}
        numColumns={4}
        estimatedItemSize={55}
        horizontal={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const genre = item[1];
          return (
            <View style={{ width: "100%" }} key={`genre-${genre.id}`}>
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
