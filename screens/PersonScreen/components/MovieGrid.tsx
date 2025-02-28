import { View, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { imageBasePath, Colors } from "../../../constants";
import { Movie } from "../../../types";

export const ITEM_SPACING = 10;
export const PADDING = 20;
// Calculate item width based on container width
// (Container width - padding on both sides - total spacing between 3 items) / 3
export const ITEM_WIDTH =
  (Dimensions.get("window").width - PADDING * 2 - ITEM_SPACING * 2) / 3;

export const MovieGrid = ({ movies }: { movies: Movie[] }) => {
  const renderItem = ({ item: movie }: { item: Movie }) => (
    <TouchableOpacity
      style={{
        width: ITEM_WIDTH,
        maxWidth: 200,
        marginHorizontal: ITEM_SPACING / 2,
        marginBottom: 15,
      }}
      onPress={() => router.push(`/modal/movie?id=${movie.id}`)}
    >
      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
          aspectRatio: 2 / 3,
          backgroundColor: Colors.secondary,
        }}
      >
        <Image
          source={{ uri: imageBasePath + movie.poster_path }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={movies}
        renderItem={renderItem}
        estimatedItemSize={200}
        numColumns={3}
        contentContainerStyle={{
          padding: PADDING,
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
