import { FlatList, View, Text } from "react-native";
import { Colors } from "../../constants";
import { Genre } from "../../types";

const Description = ({
  tagline,
  overview,
  genres,
}: {
  tagline: string;
  overview: string;
  genres: Genre[];
}) => {
  return (
    <View style={{ paddingVertical: 20, gap: 5 }}>
      <Text
        style={{
          paddingHorizontal: 20,
          color: Colors.primary,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {tagline}
      </Text>
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
          );
        }}
      />
    </View>
  );
};

export default Description;
