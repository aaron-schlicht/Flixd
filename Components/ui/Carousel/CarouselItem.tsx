import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Movie, Service } from "../../../types";
import { Image } from "expo-image";
import { Colors } from "../../../constants";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  CarouselItemContainer,
  Gradient,
  MovieTitle,
  ServiceImageView,
} from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { H3 } from "../Typography";
import { useCallback } from "react";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = width * 1.5;
const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w780/";
const CarouselItem = ({
  onPress,
  movie,
  service,
  isRental,
  scrollX,
  sv,
  index,
}: {
  onPress: () => void;
  movie: Movie;
  service: Service | undefined;
  isRental: boolean;
  scrollX: SharedValue<number>;
  sv: SharedValue<number>;
  index: number;
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const imageStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [-width * 0.3, 0, width * 0.3], // Reduced translation range
      "clamp"
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9], // Add subtle scaling
      "clamp"
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5], // Increased minimum opacity
      "clamp"
    );

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    };
  });

  const imageOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sv.value,
      [0, ITEM_HEIGHT - 100],
      [1, 0],
      "clamp"
    );

    return {
      opacity: opacity,
    };
  });

  const heightStyle = useAnimatedStyle(() => {
    const scale = interpolate(sv.value, [-120, -30], [1.3, 1], "clamp");

    return {
      transform: [{ scale: scale }],
    };
  });

  return (
    <CarouselItemContainer
      style={{ width: ITEM_WIDTH, height: "100%", flex: 1 }}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={{ overflow: "hidden" }}>
          <Gradient
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              position: "absolute", // Make gradient absolute
              zIndex: 1,
            }}
            colors={[
              "rgba(21, 24, 45, 0.9)",
              "rgba(21, 24, 45, 0.4)",
              "rgba(21, 24, 45, 0.0)",
              "rgba(21, 24, 45, 0.2)",
              "rgba(21, 24, 45, 0.3)",
              "rgba(21, 24, 45, 1)",
            ]}
          />
          <Animated.View
            style={[
              {
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
              },
              imageStyle,
              imageOpacityStyle,
              heightStyle,
            ]}
          >
            <Image
              source={{ uri: SMALL_POSTER_BASE_PATH + movie.poster_path }}
              style={{
                width: "100%",
                height: ITEM_HEIGHT,
              }}
              contentPosition="top"
              contentFit="cover"
              transition={300} // Add transition duration
            />
          </Animated.View>
          <ServiceIcon
            service={service}
            isRental={isRental}
            recyclingKey={movie.title}
          />
        </View>
      </TouchableOpacity>
    </CarouselItemContainer>
  );
};

const ServiceIcon = ({
  service,
  isRental,
  recyclingKey,
}: {
  service?: Service;
  isRental: boolean;
  recyclingKey: string;
}) => {
  const renderServiceIcon = useCallback(() => {
    if (service) {
      return (
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
          }}
          source={{
            uri: SMALL_POSTER_BASE_PATH + service.logo_path,
          }}
          recyclingKey={recyclingKey}
          transition={200}
        />
      );
    } else if (isRental) {
      return (
        <View
          style={{
            backgroundColor: Colors.secondary,
            width: 35,
            height: 35,
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          <H3 style={{ color: Colors.primary, textAlign: "center" }}>$</H3>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: Colors.secondary,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <MaterialCommunityIcons
            name="theater"
            size={25}
            color={Colors.primary}
          />
        </View>
      );
    }
  }, [service, isRental]);

  return <ServiceImageView>{renderServiceIcon()}</ServiceImageView>;
};

export default CarouselItem;
