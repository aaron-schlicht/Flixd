import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FullMovie, imageBasePath } from "../../constants";

const getColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

//TODO: Conditionally render header image if url doesn't exist
const Header = ({ movie, rating }: { movie: FullMovie; rating: string }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Image
        style={{
          zIndex: 0,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height * 0.45,
        }}
        transition={500}
        source={{ uri: imageBasePath + movie.backdrop_path }}
        contentFit="cover"
      />
      <LinearGradient
        style={{
          zIndex: 1,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height * 0.45,
          position: "absolute",
        }}
        colors={["transparent", "rgba(21, 24, 45, 1)"]}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 360,
          width: 50,
          height: 50,
          position: "absolute",
          top: 50,
          left: 15,
          zIndex: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(21, 24, 45, 0.3)",
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" color="white" size={30} />
      </TouchableOpacity>
      <View style={{ flex: 1, marginTop: -70, zIndex: 100 }}>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            zIndex: 100,
            fontWeight: "bold",

            paddingHorizontal: 15,
          }}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {movie.title}
        </Text>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingTop: 5,
              height: 40,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "600" }}>
              {new Date(movie.release_date).getFullYear()}
            </Text>
            <Text style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "900" }}>
              ·
            </Text>
            {!!rating.length ? (
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  backgroundColor: "#252942",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#A3BBD3",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {rating}
                </Text>
              </View>
            ) : null}
            {!!rating.length ? (
              <Text
                style={{
                  color: "#A3BBD3",
                  fontSize: 20,
                  fontWeight: "900",
                }}
              >
                ·
              </Text>
            ) : null}
            <Text style={{ color: "#A3BBD3", fontSize: 18 }}>
              {movie.runtime} mins
            </Text>
            <Text style={{ color: "#A3BBD3", fontSize: 20, fontWeight: "900" }}>
              ·
            </Text>
            {movie.vote_average === 0.0 ? (
              <Text
                style={{ color: "#A3BBD3", fontSize: 14, fontWeight: "600" }}
              >
                No rating yet
              </Text>
            ) : (
              <Text
                style={{
                  color: getColor(movie.vote_average),
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {movie.vote_average.toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
