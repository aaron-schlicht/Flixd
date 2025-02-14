import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants";
import { Genre } from "../../types";
import { router } from "expo-router";

const navigateToGenre = (genre: Genre) => {
  router.dismiss();
  router.push({
    pathname: `/movies/${genre.name}`,
    params: {
      name: genre.name,
      url: `/discover/movie?with_genres=${genre.id.toString()}`,
    },
  });
};

const Description = ({
  overview,
  genres,
}: {
  overview: string;
  genres: Genre[];
}) => {
  return (
    <View style={{ paddingVertical: 20, gap: 5 }}>
      <Text
        style={{
          paddingHorizontal: 20,
          color: "white",
          lineHeight: 20,
          fontSize: 14,
        }}
      >
        {overview}
      </Text>
      <FlatList
        data={genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15,
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
        renderItem={({ item }) => {
          if (!item || !item.name) return null;
          return (
            <TouchableOpacity onPress={() => navigateToGenre(item)}>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 15,
                  backgroundColor: Colors.secondary,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white" }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Description;
