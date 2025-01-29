import { Dimensions, FlatList, View } from "react-native";
import { Movie, Service } from "../../../types";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Skeleton } from "@rneui/themed";
import CarouselItem from "./CarouselItem";
import { useRouter } from "expo-router";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import Animated, { useSharedValue, SharedValue } from "react-native-reanimated";
import Pagination from "./Pagination";
import { Title } from "./styles";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width;
const SPACING = 0;
const CENTER_HEIGHT = 200;

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const Carousel = ({
  isRefreshing,
  movies,
  scrollY,
  services,
  loading,
  title,
}: {
  isRefreshing: boolean;
  movies: Movie[];
  scrollY: SharedValue<number>;
  services: Service[][];
  loading: boolean;
  title: string;
}) => {
  const scrollX = useSharedValue(0);
  const ref = useRef<FlashList<any>>(null);
  const router = useRouter();

  useEffect(() => {
    if (isRefreshing && ref.current && Boolean(movies.length)) {
      ref.current.scrollToIndex({ index: 0, animated: true });
    }
  }, [isRefreshing]);

  const renderItem: ListRenderItem<any> = ({
    item,
    index,
  }: {
    item: Movie;
    index: number;
  }) => {
    return (
      <CarouselItem
        movie={item}
        service={services[index]?.[0]}
        onPress={() => router.push(`/modal/movie?id=${item.id}`)}
        scrollX={scrollX}
        sv={scrollY}
        index={index}
      />
    );
  };

  if (loading) {
    return (
      <View style={{ paddingBottom: 15, flex: 1, height: "100%" }}>
        <Skeleton
          animation="wave"
          width={ITEM_WIDTH}
          height={ITEM_WIDTH * 1.5}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        paddingBottom: 15,
        flex: 1,
        height: "100%",
        position: "relative",
      }}
    >
      <Title
        style={{ marginLeft: 15, position: "absolute", top: 10, zIndex: 100 }}
      >
        {title}
      </Title>
      <AnimatedFlashList
        data={movies}
        ref={ref}
        renderItem={renderItem}
        estimatedItemSize={ITEM_WIDTH}
        horizontal
        pagingEnabled
        keyExtractor={(_: any, index: any) => index}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate={0}
        snapToAlignment="start"
        onScroll={(event) => {
          scrollX.value = event.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={16}
      />
      <Pagination scrollX={scrollX} data={movies} />
    </View>
  );
};

export default Carousel;
