import * as React from "react";
import { Text, View, StyleSheet, Dimensions, Animated } from "react-native";
const { width, height } = Dimensions.get("window");
import { Movie, RootStackParamList, Service } from "../../types";
import { Colors, imageBasePath } from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import PosterButton from "./PosterButton";
import { FlashList } from "@shopify/flash-list";

const ITEM_SIZE = width * 0.7;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const IMAGE_WIDTH = Dimensions.get("window").width * 0.65;
type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const Results = ({
  movies,
  providers,
}: {
  movies: Movie[];
  providers: Service[][];
}) => {
  const ref = React.useRef<FlashList<Movie>>(null);
  const navigation = useNavigation<homeScreenProp>();

  const resetPosition = () => {
    if (ref.current && Boolean(movies.length)) {
      ref.current.scrollToIndex({ index: 0, animated: true });
    }
  };
  React.useEffect(() => {
    resetPosition();
  }, [movies]);

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("Movie", { movie });
  };

  if (movies.length === 0) {
    return (
      <View
        style={[styles.container, { alignItems: "center", paddingTop: 40 }]}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "300",
            fontSize: 25,
            paddingHorizontal: 10,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          No movies found with those filters
        </Text>
        <Text style={{ fontSize: 60, paddingTop: 20 }}>😅</Text>
        <Text
          style={{
            color: Colors.primary,
            fontWeight: "700",
            fontSize: 20,
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Adjust the parameters and try again!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          minHeight: height * 0.8,
          height: height * 0.8,
        }}
      >
        <FlashList
          showsHorizontalScrollIndicator={false}
          data={movies}
          ref={ref}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          bounces={false}
          decelerationRate={0}
          snapToInterval={ITEM_SIZE}
          estimatedItemSize={400}
          snapToAlignment="start"
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            const first = index === 0;
            const last = index === movies.length - 1;
            return (
              <View
                style={{
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ width: first ? EMPTY_ITEM_SIZE : 0 }} />
                <Animated.View
                  style={{
                    alignItems: "center",
                    width: ITEM_SIZE,
                    height: IMAGE_WIDTH * 1.5 + 120,
                  }}
                >
                  <PosterButton
                    id={item.id}
                    title={item.title}
                    providers={providers[index]}
                    posterPath={imageBasePath + item.poster_path}
                    dimensions={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_WIDTH * 1.5,
                    }}
                    onPress={() => handleMoviePress(item)}
                    release_date={item.release_date}
                    vote_average={item.vote_average}
                  />
                </Animated.View>
                <View style={{ width: last ? EMPTY_ITEM_SIZE : 0 }} />
              </View>
            );
          }}
        />
      </View>
      <View style={{ height: "11%" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 1.5,
    borderRadius: 20,
    margin: 0,
    marginBottom: 10,
  },
  gradient: {
    zIndex: 2,
    marginTop: 10,
    position: "absolute",
    borderRadius: 0,
  },
  description: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "800",
  },
});

export default Results;
