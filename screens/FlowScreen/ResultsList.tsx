import { MEDIUM_POSTER_BASE_URL, imageBasePath } from "../../constants";
import { View, Dimensions, Animated, FlatList } from "react-native";
import { RefObject, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import LargePosterButton from "../../components/LargePosterButton";
import { RootStackParamList, Movie } from "../../types";
import { Image } from "expo-image";

const ITEM_SIZE = Dimensions.get("window").width * 0.7;
const IMAGE_WIDTH = Dimensions.get("window").width * 0.55;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const ITEM_HEIGHT = Dimensions.get("window").height * 0.55;
const SCREEN_WIDTH = Dimensions.get("window").width;
const EMPTY_ITEM_SIZE = (Dimensions.get("window").width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = Dimensions.get("window").height * 0.65;
const SCREEN_HEIGHT = Dimensions.get("window").height;
type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const ResultsList = ({ recs }: { recs: Movie[] }) => {
  const navigation = useNavigation<homeScreenProp>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef<FlatList>(null);

  const handleMoviePress = (id: number) => {
    navigation.navigate("Movie", { id: id });
  };

  const filteredResults = recs.filter(
    (movie) => !!movie.poster_path && movie.popularity > 10.0
  );

  const resetPosition = () => {
    if (ref.current && Boolean(recs.length)) {
      ref.current.scrollToIndex({ index: 0, animated: true });
    }
  };
  useEffect(() => {
    resetPosition();
  }, [recs]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: BACKDROP_HEIGHT,
          width: SCREEN_WIDTH,
          position: "absolute",
        }}
      >
        <FlatList
          data={filteredResults.reverse()}
          keyExtractor={(item) => item.id + "-backdrop"}
          removeClippedSubviews={false}
          contentContainerStyle={{
            width: SCREEN_WIDTH,
            height: BACKDROP_HEIGHT,
          }}
          renderItem={({ item, index }) => {
            const translateX = scrollX.interpolate({
              inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
              outputRange: [0, SCREEN_WIDTH],
              // extrapolate:'clamp'
            });
            return (
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: "absolute",
                  width: translateX,
                  height: BACKDROP_HEIGHT,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: imageBasePath + item.poster_path }}
                  style={{
                    width: SCREEN_WIDTH,
                    height: BACKDROP_HEIGHT,
                    position: "absolute",
                  }}
                />
              </Animated.View>
            );
          }}
        />
      </View>
      <Animated.FlatList
        ref={ref}
        showsHorizontalScrollIndicator={false}
        data={filteredResults}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        bounces={false}
        decelerationRate={0}
        contentContainerStyle={{
          alignItems: "flex-start",
          height: "100%",
        }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const isFirst = index === 0;
          const isLast = index === filteredResults.length - 1;
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={{ width: isFirst ? EMPTY_ITEM_SIZE : 0 }} />
              <Animated.View
                style={{
                  paddingHorizontal: 15,
                  alignItems: "center",
                  borderRadius: 15,
                  width: ITEM_SIZE,
                }}
              >
                <LargePosterButton
                  posterPath={MEDIUM_POSTER_BASE_URL + item.poster_path}
                  onPress={() => handleMoviePress(item.id)}
                  title={item.title}
                  release_date={item.release_date}
                  vote_average={item.vote_average}
                  dimensions={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
                />
              </Animated.View>
              <View style={{ width: isLast ? EMPTY_ITEM_SIZE : 0 }} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ResultsList;
