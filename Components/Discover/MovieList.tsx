import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../../constants";

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
const MovieList = ({ name, data }: { name: string; data: Movie[] }) => {
  const navigation = useNavigation<recsScreenProp>();
  const handleMoviePress = (id: number) => {
    navigation.navigate("Movie", { id: id });
  };
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          color: "white",
          paddingLeft: 15,
          padding: 10,
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {name}
      </Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        initialNumToRender={5}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => handleMoviePress(item.id)}
              style={{ paddingHorizontal: 10 }}
            >
              <View
                style={{
                  shadowColor: "black",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  borderRadius: 10,
                  backgroundColor: "black",
                  width: 100,
                  height: 150,
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 150,
                    borderRadius: 10,
                  }}
                  contentFit="cover"
                  transition={500}
                  source={{
                    uri: "https://image.tmdb.org/t/p/w342/" + item.poster_path,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MovieList;
