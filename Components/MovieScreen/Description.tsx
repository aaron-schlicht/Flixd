import { FlatList, View, Text } from "react-native";
import { Genre } from "../../constants";

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
    <View style={{ padding: 20, gap: 5 }}>
      <Text style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "bold" }}>
        {tagline}
      </Text>
      <Text style={{ color: "white", lineHeight: 20, fontSize: 14 }}>
        {overview}
      </Text>
      <FlatList
        data={genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 15, paddingTop: 10 }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                padding: 10,
                paddingHorizontal: 15,
                backgroundColor: "#252942",
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
