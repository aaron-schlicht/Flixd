import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import { Movie, RootStackParamList } from "../../types";
import { Colors, getRatingColor, imageBasePath } from "../../constants";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import PosterButton from "./PosterButton";

const ITEM_SIZE = width * 0.7;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = width * 1.5;
const IMAGE_WIDTH = Dimensions.get("window").width * 0.55;

const Backdrop = ({
  movies,
  scrollX,
}: {
  movies: Movie[];
  scrollX: Animated.Value;
}) => {
  return (
    <View
      style={{
        height: BACKDROP_HEIGHT,
        width,
        position: "absolute",
      }}
    >
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id + "-backdrop"}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          const translateX = scrollX.interpolate({
            inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE],
            outputRange: [0, width + 10],
          });
          return (
            <Animated.View
              style={{
                position: "absolute",
                width: translateX,
                height,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: imageBasePath + item.poster_path }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                }}
                transition={200}
                blurRadius={15}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        style={[
          styles.gradient,
          {
            width: width,
            height: BACKDROP_HEIGHT,
          },
        ]}
        colors={[
          "rgba(21, 24, 45, 0)",
          "rgba(21, 24, 45, 0.8)",
          "rgba(21, 24, 45, 1)",
        ]}
      />
    </View>
  );
};

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const Results = ({ movies }: { movies: Movie[] }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<FlatList>(null);
  const navigation = useNavigation<homeScreenProp>();

  const resetPosition = () => {
    if (ref.current && Boolean(movies.length)) {
      ref.current.scrollToIndex({ index: 0, animated: true });
    }
  };
  React.useEffect(() => {
    resetPosition();
  }, [movies]);

  const handleMoviePress = (id: number) => {
    navigation.navigate("Movie", { id: id });
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
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        ref={ref}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        bounces={false}
        decelerationRate={0}
        contentContainerStyle={{
          paddingTop: "15%",
        }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const first = index === 0;
          const last = index === movies.length - 1;
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [15, 0, 15],
            extrapolate: "clamp",
          });
          return (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ width: first ? EMPTY_ITEM_SIZE : 0 }} />
              <Animated.View
                style={{
                  alignItems: "center",
                  width: ITEM_SIZE,
                  transform: [{ translateY }],
                }}
              >
                <PosterButton
                  id={item.id}
                  title={item.title}
                  posterPath={imageBasePath + item.poster_path}
                  dimensions={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH * 1.5 }}
                  onPress={() => handleMoviePress(item.id)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
