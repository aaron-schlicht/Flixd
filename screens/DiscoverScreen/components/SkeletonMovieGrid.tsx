import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  withRepeat,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ITEM_WIDTH, ITEM_SPACING } from "../constants";

export const SkeletonMovieGrid = () => {
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

  const renderSkeletonItem = () => (
    <Animated.View
      style={[
        {
          width: ITEM_WIDTH,
          height: ITEM_WIDTH * 1.5,
          backgroundColor: "#2A2E43",
          borderRadius: 10,
          marginHorizontal: ITEM_SPACING / 2,
          marginVertical: ITEM_SPACING / 2,
        },
        animatedStyle,
      ]}
    />
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlashList
        data={Array(12).fill(null)}
        numColumns={3}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={{ flex: 1, alignItems: "center" }}>
            {renderSkeletonItem()}
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};
