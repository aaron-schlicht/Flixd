import { View, Text, Dimensions } from "react-native";
import { Colors } from "../../../constants";
import { Movie } from "../../../types";

const getColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

const formatReleaseDate = (releaseDate: string | null): string => {
  if (!releaseDate) return "N/A";
  const date = new Date(releaseDate);
  return isNaN(date.getTime()) ? "N/A" : date.getFullYear().toString();
};

const Header = ({
  movie,
  runtime,
  rating,
}: {
  movie: Movie;
  runtime: number;
  rating: string;
}) => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          marginTop: 0,
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
              {formatReleaseDate(movie.release_date)}
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
            {movie.runtime && movie.runtime > 0 ? (
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {formatRuntime(runtime)}
              </Text>
            ) : (
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                Runtime unknown
              </Text>
            )}
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
