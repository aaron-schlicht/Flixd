import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Colors, MEDIUM_POSTER_BASE_URL } from "../../constants";
import useGetRandomMovies from "../../hooks/useGetRandomMovie";
import LargePosterButton from "../../Components/LargePosterButton";
import DiceButton from "./DiceButton";
import { RootStackParamList } from "../../types";

const ITEM_WIDTH = Dimensions.get("window").width - 40;
const ITEM_HEIGHT = Dimensions.get("window").height * 0.65;
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
      <SafeAreaView />
      <View style={{ justifyContent: "center" }}>
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
            }}
          >
            <LargePosterButton
              posterPath={MEDIUM_POSTER_BASE_URL + randomMovie.poster_path}
              onPress={() => handleMoviePress()}
              title={randomMovie.title}
              release_date={randomMovie.release_date}
              vote_average={randomMovie.vote_average}
              dimensions={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
            />
          </View>
        )}
      </View>
      <DiceButton getRandomMovies={getRandomMovies} />
    </View>
  );
};

export default RandomScreen;
