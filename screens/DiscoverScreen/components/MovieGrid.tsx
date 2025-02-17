import {
  View,
  TouchableOpacity,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Movie } from "../../../types";
import { ITEM_WIDTH, ITEM_SPACING, SMALL_POSTER_BASE_PATH } from "../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../../constants";
import Animated, { FadeIn } from "react-native-reanimated";
import { ActivityIndicator } from "react-native";
import { useCallback } from "react";

interface MovieGridProps {
  movies: Movie[];
  listRef: React.RefObject<FlashList<Movie>>;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  loadingMore: boolean;
  fetchMoreMovies: () => void;
}

const ListFooterSpinner = () => (
  <View
    style={{
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <Animated.View
      entering={FadeIn}
      style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
    >
      <ActivityIndicator color={Colors.primary} />
      <Text style={{ color: Colors.primary }}>Loading more...</Text>
    </Animated.View>
  </View>
);

const EmptyListComponent = () => (
  <View
    style={{
      flex: 1,
      height: 400,
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
    }}
  >
    <Ionicons name="film-outline" size={80} color={Colors.primary} />
    <Text
      style={{
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 24,
        textAlign: "center",
      }}
    >
      No movies found{"\n"}Try adjusting your filters
    </Text>
  </View>
);

export const MovieGrid = ({
  movies,
  listRef,
  onScroll,
  loadingMore,
  fetchMoreMovies,
}: MovieGridProps) => {
  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <Link href={`/modal/movie?id=${item.id}`} asChild>
        <TouchableOpacity
          style={{
            width: ITEM_WIDTH,
            marginHorizontal: ITEM_SPACING / 2,
            marginVertical: ITEM_SPACING / 2,
            alignItems: "center",
          }}
        >
          <Image
            recyclingKey={item.id.toString()}
            source={{ uri: SMALL_POSTER_BASE_PATH + item.poster_path }}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_WIDTH * 1.5,
              borderRadius: 10,
            }}
            transition={500}
          />
        </TouchableOpacity>
      </Link>
    ),
    []
  );
  return (
    <FlashList
      ref={listRef}
      data={movies}
      numColumns={3}
      estimatedItemSize={ITEM_WIDTH * 1.5}
      showsVerticalScrollIndicator={false}
      getItemType={(item) => item.id}
      onEndReached={fetchMoreMovies}
      onEndReachedThreshold={0.8}
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListEmptyComponent={EmptyListComponent}
      ListFooterComponent={() => (loadingMore ? <ListFooterSpinner /> : null)}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index}-${item.id.toString()}`}
      contentContainerStyle={{
        paddingHorizontal: ITEM_SPACING / 2,
        paddingBottom: 300,
      }}
    />
  );
};
