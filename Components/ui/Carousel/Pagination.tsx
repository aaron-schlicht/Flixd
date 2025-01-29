import React from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useDerivedValue,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");

export interface ScalingDotProps {
  data: Array<Object>;
  scrollX: SharedValue<number>;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotScale?: number;
  activeDotColor?: string;
}

const Pagination = ({
  scrollX,
  data,
  dotStyle,
  containerStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotScale,
  activeDotColor,
}: ScalingDotProps) => {
  const defaultProps = {
    inActiveDotColor: inActiveDotColor || "#347af0",
    activeDotColor: activeDotColor || "#347af0",
    animationType: "scale",
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    activeDotScale: activeDotScale || 2,
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const opacity = useDerivedValue(() => {
          return interpolate(
            scrollX.value,
            inputRange,
            [
              defaultProps.inActiveDotOpacity,
              1,
              defaultProps.inActiveDotOpacity,
            ],
            "clamp"
          );
        });

        const scale = useDerivedValue(() => {
          return interpolate(
            scrollX.value,
            inputRange,
            [1, defaultProps.activeDotScale, 1],
            "clamp"
          );
        });

        return (
          <Animated.View
            key={`dot-${index}`}
            style={[
              styles.dotStyle,
              { opacity },
              { transform: [{ scale }] },
              dotStyle,
              { backgroundColor: "white" },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotStyle: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: 360,
    marginHorizontal: 5,
  },
});

export default Pagination;
