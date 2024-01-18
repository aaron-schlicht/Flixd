import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { MEDIUM_POSTER_BASE_URL } from "../../constants";
import useGetRandomMovies from "./useGetRandomMovie";
import LargePosterButton from "../LargePosterButton";
import DiceButton from "./DiceButton";

const ITEM_WIDTH = Dimensions.get("window").width * 0.9;
type recsScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const Lucky = () => {
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
        backgroundColor: "#15182D",
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
          <View style={{ paddingVertical: 10, alignItems: "center" }}>
            <LargePosterButton
              posterPath={MEDIUM_POSTER_BASE_URL + randomMovie.poster_path}
              onPress={() => handleMoviePress()}
              title={randomMovie.title}
              release_date={randomMovie.release_date}
              vote_average={randomMovie.vote_average}
              dimensions={{ width: ITEM_WIDTH, height: ITEM_WIDTH * 1.5 }}
            />
          </View>
        )}
      </View>
      <DiceButton getRandomMovies={getRandomMovies} />
    </View>
  );
};

export default Lucky;
