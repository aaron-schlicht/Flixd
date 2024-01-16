import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import useRandomMovie from "./useRandomMovie";
import { useEffect } from "react";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { imageBasePath } from "../../constants";
import useGetRandomMovies from "./useGetRandomMovie";
import { random } from "lodash";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const getColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
const Lucky = () => {
  const { getRandomMovies, randomMovie } = useGetRandomMovies();

  const ITEM_WIDTH = Dimensions.get("window").width * 0.9;

  const navigation = useNavigation<recsScreenProp>();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    getRandomMovies();
  };

  const handleMoviePress = () => {
    if (randomMovie) {
      navigation.navigate("Movie", { id: randomMovie?.id });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#15182D",
        alignItems: "center",
      }}
    >
      <SafeAreaView />
      <View>
        {!randomMovie ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{ paddingVertical: 10, alignItems: "center" }}>
            <TouchableOpacity onPress={handleMoviePress}>
              <Image
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_WIDTH * 1.5,
                  borderRadius: 15,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor: "#A3BBD3",
                  zIndex: 1,
                }}
                contentFit="cover"
                transition={500}
                source={{
                  uri: imageBasePath + randomMovie.poster_path,
                }}
              />
              <LinearGradient
                style={{
                  zIndex: 2,
                  width: ITEM_WIDTH,
                  marginTop: 10,
                  height: ITEM_WIDTH * 1.5,
                  position: "absolute",
                  borderRadius: 0,
                }}
                colors={["transparent", "rgba(21, 24, 45, 1)"]}
              />
              <View
                style={{
                  marginTop: -ITEM_WIDTH * 0.15,
                  zIndex: 100,
                  width: ITEM_WIDTH,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 25, fontWeight: "600" }}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {randomMovie.title}
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
                    {new Date(randomMovie.release_date).getFullYear()}
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
                      color: getColor(randomMovie.vote_average),
                      fontSize: 18,
                      fontWeight: "800",
                    }}
                  >
                    {randomMovie.vote_average.toPrecision(3)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: Dimensions.get("window").height * 0.16,
          width: Dimensions.get("window").width,
        }}
      >
        <View
          style={{
            shadowColor: "black",
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            borderRadius: 30,
            backgroundColor: "black",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              alignItems: "center",
              gap: 10,
              borderRadius: 30,
              justifyContent: "center",
              backgroundColor: "white",
            }}
            onPress={handlePress}
          >
            <FontAwesome5 name="dice" color="#15182D" size={25} />
            <Text style={{ color: "#15182D", fontWeight: "400", fontSize: 22 }}>
              Roll the dice
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Lucky;
