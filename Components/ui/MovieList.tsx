import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PosterButton from "./PosterButton";
import { Movie } from "../../types";
import { FlashList } from "@shopify/flash-list";
import { H2 } from "./Typography";
import { Flex } from "./Layouts";
import { Image } from "expo-image";
import Animated, {
  withRepeat,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../../constants";

const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w342/";
const { width } = Dimensions.get("screen");
const IMAGE_WIDTH = width * 0.27;

const SkeletonMovieList = ({
  name,
  imagePath,
}: {
  name: string;
  imagePath?: string;
}) => {
  const shimmerAnimation = useSharedValue(0);

  useEffect(() => {
    shimmerAnimation.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: shimmerAnimation.value * 0.5 + 0.3,
  }));

  return (
    <View style={{ flex: 1 }}>
      <Flex
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 15,
        }}
      >
        {imagePath && (
          <Image
            source={{ uri: SMALL_POSTER_BASE_PATH + imagePath }}
            style={{
              width: 30,
              height: 30,
              marginLeft: 15,
              marginRight: 10,
              borderRadius: 5,
            }}
          />
        )}
        <H2
          style={{
            paddingLeft: imagePath ? 0 : 15,
            fontSize: imagePath ? 20 : 24,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {name}
        </H2>
      </Flex>
      <FlashList
        data={Array(5).fill(null)}
        horizontal
        estimatedItemSize={IMAGE_WIDTH}
        contentContainerStyle={{ paddingLeft: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={() => (
          <Animated.View
            style={[
              {
                width: IMAGE_WIDTH,
                height: IMAGE_WIDTH * 1.5,
                backgroundColor: "#2A2E43",
                borderRadius: 10,
                marginHorizontal: 5,
              },
              animatedStyle,
            ]}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const ListFooterSpinner = () => (
  <View style={{ padding: 10, justifyContent: "center" }}>
    <ActivityIndicator color={Colors.primary} size="small" />
  </View>
);

const MovieList = React.memo(
  ({
    name,
    data,
    isRefreshing,
    imagePath,
    loading,
    loadingMore,
    onEndReached,
  }: {
    name: string;
    data: Movie[];
    isRefreshing: boolean;
    imagePath?: string;
    loading?: boolean;
    loadingMore?: boolean;
    onEndReached?: () => void;
  }) => {
    const ref = useRef<FlashList<Movie>>(null);

    useEffect(() => {
      if (isRefreshing && ref.current && Boolean(data.length)) {
        ref.current.scrollToIndex({ index: 0, animated: true });
      }
    }, [isRefreshing]);

    if (loading) {
      return <SkeletonMovieList imagePath={imagePath} name={name} />;
    }

    return (
      <View style={{ flex: 1 }}>
        <Flex
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 15,
          }}
        >
          {imagePath && (
            <Image
              source={{ uri: SMALL_POSTER_BASE_PATH + imagePath }}
              style={{
                width: 30,
                height: 30,
                marginLeft: 15,
                marginRight: 10,
                borderRadius: 5,
              }}
            />
          )}
          <H2
            style={{
              paddingLeft: imagePath ? 0 : 15,
              fontSize: imagePath ? 20 : 24,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {name}
          </H2>
        </Flex>
        <Flex
          style={{
            minHeight: IMAGE_WIDTH * 1.6,
            height: IMAGE_WIDTH * 1.6,
            width: width,
          }}
        >
          <FlashList
            data={data}
            ref={ref}
            horizontal
            contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
            estimatedItemSize={IMAGE_WIDTH * 1.55}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              loadingMore ? <ListFooterSpinner /> : null
            }
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 5 }}>
                <PosterButton
                  movie={item}
                  posterPath={SMALL_POSTER_BASE_PATH + item.poster_path}
                  dimensions={{
                    width: IMAGE_WIDTH,
                    height: IMAGE_WIDTH * 1.5,
                  }}
                />
              </View>
            )}
          />
        </Flex>
      </View>
    );
  }
);

export default MovieList;
