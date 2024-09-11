import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Movie, RootStackParamList, Service } from "../../../types";
import { useEffect, useRef } from "react";
import { Skeleton } from "@rneui/themed";
import { CarouselView, Title } from "./styles";
import CarouselItem from "./CarouselItem";
type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const Carousel = ({
  isRefreshing,
  movies,
  services,
  loading,
  title,
}: {
  isRefreshing: boolean;
  movies: Movie[];
  services: Service[][];
  loading: boolean;
  title: string;
}) => {
  const navigation = useNavigation<homeScreenProp>();
  const ref = useRef<FlashList<Movie>>(null);

  useEffect(() => {
    if (isRefreshing && ref.current && Boolean(movies.length)) {
      ref.current.scrollToIndex({ index: 0, animated: true });
    }
  }, [isRefreshing]);

  return (
    <View>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <Title>{title}</Title>
      </View>
      <CarouselView>
        <FlashList
          data={movies}
          keyExtractor={({ title }) => title}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          refreshing={isRefreshing}
          ref={ref}
          horizontal
          renderItem={({ item, index }) => {
            const mainService =
              Boolean(services.length) && Boolean(services[index].length)
                ? services[index].at(0)
                : undefined;
            return (
              <CarouselItem
                onPress={() => navigation.navigate("Movie", { movie: item })}
                movie={item}
                service={mainService}
              />
            );
          }}
        />
      </CarouselView>
    </View>
  );
};

export default Carousel;
