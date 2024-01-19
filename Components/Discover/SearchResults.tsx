import { MEDIUM_POSTER_BASE_URL, Movie } from "../../constants";
import { View, Dimensions, Animated } from "react-native";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import LargePosterButton from "../LargePosterButton";

const ITEM_SIZE = Dimensions.get("window").width * 0.8;
const IMAGE_WIDTH = Dimensions.get("window").width * 0.75;
const ITEM_HEIGHT = Dimensions.get("window").height * 0.55;
const EMPTY_ITEM_SIZE = (Dimensions.get("window").width - ITEM_SIZE) / 2;
type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const SearchResults = ({ searchResults }: { searchResults: Movie[] }) => {
  const navigation = useNavigation<homeScreenProp>();
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleMoviePress = (id: number) => {
    navigation.navigate("Movie", { id: id });
  };

  const filteredResults = searchResults.filter(
    (movie) => !!movie.poster_path && movie.popularity > 10.0
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={filteredResults}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        bounces={false}
        decelerationRate={0}
        contentContainerStyle={{
          alignItems: "flex-start",
          height: "100%",
        }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const isFirst = index === 0;
          const isLast = index === filteredResults.length - 1;
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [55, 30, 55],
            extrapolate: "clamp",
          });

          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={{ width: isFirst ? EMPTY_ITEM_SIZE : 0 }} />
              <Animated.View
                style={{
                  paddingHorizontal: 15,
                  alignItems: "center",
                  transform: [{ translateY }],
                  borderRadius: 15,
                  width: ITEM_SIZE,
                }}
              >
                <LargePosterButton
                  posterPath={MEDIUM_POSTER_BASE_URL + item.poster_path}
                  onPress={() => handleMoviePress(item.id)}
                  title={item.title}
                  release_date={item.release_date}
                  vote_average={item.vote_average}
                  dimensions={{ width: IMAGE_WIDTH, height: ITEM_HEIGHT }}
                />
              </Animated.View>
              <View style={{ width: isLast ? EMPTY_ITEM_SIZE : 0 }} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default SearchResults;
