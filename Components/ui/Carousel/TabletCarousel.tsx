import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Movie, Service } from "../../../types";
import React, { useCallback, memo } from "react";
import { Skeleton } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Title } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { imageBasePath } from "../../../constants";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const TABLET_WIDTH = 500;
const ITEM_WIDTH = TABLET_WIDTH;
const HORIZONTAL_PADDING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

const TabletCarouselItem = memo(({ movie, onPress }: any) => (
  <View style={{ width: ITEM_WIDTH, marginHorizontal: HORIZONTAL_PADDING }}>
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{ uri: imageBasePath + movie.poster_path }}
        style={{
          width: ITEM_WIDTH,
          height: ITEM_WIDTH * 1.5,
          borderRadius: 10,
        }}
        recyclingKey={movie.id.toString()}
        cachePolicy="memory-disk"
      />
    </TouchableOpacity>
  </View>
));

const TabletCarousel = ({
  movies,
  loading,
  title,
}: {
  movies: Movie[];
  loading: boolean;
  title: string;
}) => {
  const router = useRouter();

  const renderItem: ListRenderItem<any> = ({
    item,
    index,
  }: {
    item: Movie;
    index: number;
  }) => {
    return (
      <TabletCarouselItem
        movie={item}
        onPress={() => router.push(`/modal/movie?id=${item.id}`)}
      />
    );
  };

  const keyExtractor = useCallback(
    (_: any, index: number) => `tablet-carousel-item-${index}`,
    []
  );

  if (loading) {
    return (
      <View style={{ paddingBottom: 15, width: SCREEN_WIDTH }}>
        <View style={{ paddingHorizontal: HORIZONTAL_PADDING }}>
          <Skeleton
            animation="wave"
            width={ITEM_WIDTH}
            height={ITEM_WIDTH * 1.5}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ paddingBottom: 15, width: SCREEN_WIDTH }}>
      <Title style={{ marginLeft: 15, marginBottom: 10 }}>{title}</Title>
      <FlashList
        data={movies}
        renderItem={renderItem}
        estimatedItemSize={ITEM_WIDTH}
        horizontal
        pagingEnabled
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={ITEM_WIDTH + HORIZONTAL_PADDING * 2}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingRight: HORIZONTAL_PADDING,
        }}
      />
    </View>
  );
};

export default TabletCarousel;
