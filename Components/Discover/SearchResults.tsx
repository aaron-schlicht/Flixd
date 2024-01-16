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
import { Ionicons } from "@expo/vector-icons";

const ITEM_SIZE = Dimensions.get("window").width * 0.8;
const EMPTY_ITEM_SIZE = (Dimensions.get("window").width - ITEM_SIZE) / 2;
type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;

const getColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

const SearchResults = ({ searchResults }: { searchResults: Movie[] }) => {
  const navigation = useNavigation<recsScreenProp>();
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
                <TouchableOpacity
                  style={{ width: "100%" }}
                  onPress={() => handleMoviePress(item.id)}
                >
                  <View
                    style={{
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      borderRadius: 15,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
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
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        margin: 0,
                      }}
                    />
                    <LinearGradient
                      style={{
                        zIndex: 2,
                        width: "100%",
                        marginTop: 10,
                        height: ITEM_SIZE * 1.5,
                        position: "absolute",
                        borderRadius: 0,
                      }}
                      colors={["transparent", "rgba(21, 24, 45, 1)"]}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: -ITEM_SIZE * 0.15,
                      zIndex: 100,
                      width: ITEM_SIZE,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 22,
                        fontWeight: "600",
                      }}
                      numberOfLines={2}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        gap: 6,
                      }}
                    >
                      <Ionicons name="calendar" color="#A3BBD3" size={20} />
                      <Text
                        style={{
                          color: "#A3BBD3",
                          fontSize: 18,
                          fontWeight: "800",
                        }}
                      >
                        {new Date(item.release_date).getFullYear()}
                      </Text>
                      <Text
                        style={{
                          color: "#A3BBD3",
                          fontSize: 18,
                          fontWeight: "800",
                          paddingHorizontal: 5,
                        }}
                      >
                        |
                      </Text>
                      <Ionicons name="star" color="#A3BBD3" size={20} />
                      <Text
                        style={{
                          color: getColor(item.vote_average),
                          fontSize: 18,
                          fontWeight: "800",
                        }}
                      >
                        {item.vote_average.toPrecision(3)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
