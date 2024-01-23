import { View, Text, Dimensions } from "react-native";
import { Colors, FullMovie } from "../../constants";

const getColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

const Header = ({ movie, rating }: { movie: FullMovie; rating: string }) => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          marginTop: -Dimensions.get("window").height * 0.06,
          zIndex: 90,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 40,
            zIndex: 90,
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
            <Text
              style={{ color: Colors.primary, fontSize: 20, fontWeight: "600" }}
            >
              {new Date(movie.release_date).getFullYear()}
            </Text>
            <Text
              style={{ color: Colors.primary, fontSize: 20, fontWeight: "900" }}
            >
              ·
            </Text>
            {!!rating.length ? (
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  backgroundColor: Colors.secondary,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: Colors.primary,
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
                  color: Colors.primary,
                  fontSize: 20,
                  fontWeight: "900",
                }}
              >
                ·
              </Text>
            ) : null}
            <Text style={{ color: Colors.primary, fontSize: 18 }}>
              {movie.runtime} mins
            </Text>
            <Text
              style={{ color: Colors.primary, fontSize: 20, fontWeight: "900" }}
            >
              ·
            </Text>
            {movie.vote_average === 0.0 ? (
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
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
