import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Genres, Movie, imageBasePath } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SummaryStep from "./SummaryStep";
import { resetFlow } from "../../redux/flowSlice";
import { Image } from "expo-image";

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
interface Props extends StackScreenProps<RootStackParamList, "Recs"> {}

const getColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

const RecsScreen: FC<Props> = ({ route }) => {
  const { recs } = route.params;
  /*const similarMovies = useSelector(
    (state: RootState) => state.movies.similarMovies
  );*/
  const navigation = useNavigation<recsScreenProp>();
  const dispatch = useDispatch();

  const handleMoviePress = (id: number) => {
    navigation.navigate("Movie", { id: id });
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(resetFlow());
  }, [dispatch]);
  /*useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        dispatch(resetFlow());
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);*/

  /*if (true) {
    return <SummaryStep />;
  }*/

  return (
    <View style={{ flex: 1, backgroundColor: "#15182D" }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#15182D" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#15182D" }}>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            backgroundColor: "#15182D",
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: 10,
              borderRadius: 360,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" color="white" size={25} />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              flex: 1,
              fontSize: 25,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Your Results
          </Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={{ flex: 1, backgroundColor: "#15182D" }}>
          <FlatList
            data={recs}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                key={`item-${item.id}`}
                style={{
                  borderBottomColor: "#252942",
                  borderBottomWidth: index === recs.length - 1 ? 0 : 2,
                }}
              >
                <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
                  <MovieItem movie={item} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const MovieItem = ({ movie }: { movie: Movie }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          shadowColor: "black",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: 14,
          backgroundColor: "black",
        }}
      >
        <Image
          style={{
            width: 80,
            height: 120,
            borderRadius: 10,
            //borderWidth: 1,
            borderColor: "#A3BBD3",
          }}
          transition={500}
          source={{ uri: imageBasePath + movie.poster_path }}
        />
      </View>
      <View style={{ height: "100%", padding: 15, flex: 1 }}>
        <Text
          style={{ color: "white", fontSize: 20, fontWeight: "600" }}
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {movie.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            gap: 6,
          }}
        >
          <Ionicons name="calendar" color="#A3BBD3" size={20} />
          <Text style={{ color: "#A3BBD3", fontSize: 18, fontWeight: "800" }}>
            {new Date(movie.release_date).getFullYear()}
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
              color: getColor(movie.vote_average),
              fontSize: 18,
              fontWeight: "800",
            }}
          >
            {movie.vote_average}
          </Text>
        </View>
        {/*        <Text style={{ color: "white", paddingTop: 10 }}>
          {!!movie.genre_ids
            ? movie.genre_ids.map((id, index) =>
                index !== movie.genre_ids!.length - 1
                  ? Genres[id].name + ", "
                  : Genres[id].name
              )
            : ""}
          </Text>*/}
      </View>
    </View>
  );
};

export default RecsScreen;
