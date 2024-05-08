import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Colors, MEDIUM_POSTER_BASE_URL, imageBasePath } from "../../constants";
import useGetRandomMovies from "../../hooks/useGetRandomMovie";
import LargePosterButton from "../../components/LargePosterButton";
import DiceButton from "./DiceButton";
import { RootStackParamList } from "../../types";
import PosterButton from "../FlowScreen/PosterButton";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ITEM_HEIGHT = height * 0.5;
const ITEM_WIDTH = ITEM_HEIGHT * 0.7;
type recsScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const RandomScreen = () => {
  const { getRandomMovies, randomMovie } = useGetRandomMovies();
  const navigation = useNavigation<recsScreenProp>();

  const handleMoviePress = () => {
    if (randomMovie) {
      navigation.navigate("Movie", { id: randomMovie?.id });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
      }}
    >
      <View style={{ justifyContent: "center", flex: 1 }}>
        {!randomMovie ? (
          <View style={{ alignSelf: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={{
              paddingVertical: 20,
              alignItems: "center",
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                width,
                height,
                flex: 1,
              }}
            >
              <Image
                source={{ uri: imageBasePath + randomMovie.poster_path }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
                transition={200}
                contentFit="cover"
                blurRadius={15}
              />
              <LinearGradient
                style={[
                  {
                    zIndex: 2,
                    width,
                    height,
                  },
                ]}
                colors={[
                  "rgba(21, 24, 45, 0)",
                  "rgba(21, 24, 45, 0.8)",
                  "rgba(21, 24, 45, 1)",
                ]}
              />
            </View>
            <View style={{ height: ITEM_HEIGHT + 80 }}>
              <PosterButton
                id={randomMovie.id}
                posterPath={MEDIUM_POSTER_BASE_URL + randomMovie.poster_path}
                onPress={() => handleMoviePress()}
                title={randomMovie.title}
                release_date={randomMovie.release_date}
                vote_average={randomMovie.vote_average}
                dimensions={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
              />
            </View>
          </View>
        )}
      </View>
      <DiceButton getRandomMovies={getRandomMovies} />
      <View style={{ height: "14%" }} />
    </View>
  );
};

export default RandomScreen;
