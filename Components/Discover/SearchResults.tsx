import { Movie } from "../../constants";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

const ITEM_SIZE = Dimensions.get("window").width * 0.8;
const EMPTY_ITEM_SIZE = (Dimensions.get("window").width - ITEM_SIZE) / 2;
type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;

const SearchResults = ({ searchResults }: { searchResults: Movie[] }) => {
  const navigation = useNavigation<recsScreenProp>();
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleMoviePress = (id: number) => {
    navigation.navigate("Movie", { id: id });
  };

  const filteredResults = searchResults
    .filter((movie) => !!movie.poster_path)
    .slice(0, 10);

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
          const isFirstOrLast =
            index === 0 || index === filteredResults.length - 1;
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
                <TouchableOpacity
                  style={{ width: "100%" }}
                  onPress={() => handleMoviePress(item.id)}
                >
                  <View
                    style={{
                      shadowColor: "black",
                      shadowOffset: { width: 2, height: 4 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      borderRadius: 15,
                      backgroundColor: "black",
                      width: "100%",
                      height: ITEM_SIZE * 1.5,
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          "https://image.tmdb.org/t/p/w500/" + item.poster_path,
                      }}
                      contentFit="cover"
                      transition={500}
                      style={{
                        width: "100%",
                        height: ITEM_SIZE * 1.5,
                        borderRadius: 15,
                        margin: 0,
                      }}
                    />
                  </View>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 18,
                    color: "#A3BBD3",
                    fontWeight: "600",
                    paddingTop: 10,
                    textAlign: "center",
                  }}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  {item.title}
                </Text>
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
