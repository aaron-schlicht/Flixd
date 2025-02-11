import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../constants";

const Accordion = ({
  title,
  h = 100,
  children,
  isExpanded,
  onPress,
}: {
  title: string;
  h?: number;
  children: JSX.Element;
  isExpanded: boolean;
  onPress: () => void;
}) => {
  const height = useSharedValue(isExpanded ? h : 0);

  const animatedStyle = useAnimatedStyle(() => {
    height.value = withTiming(isExpanded ? h : 0, { duration: 300 });
    return {
      height: height.value,
    };
  });

  return (
    <View>
      <TouchableOpacity
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: isExpanded ? Colors.primary : Colors.secondary,
          opacity: 0.8,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={onPress}
      >
        <Text
          style={{ color: isExpanded ? Colors.background : Colors.primary }}
        >
          {title}
        </Text>
      </TouchableOpacity>
      <Animated.View style={[{ overflow: "hidden" }, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

export default Accordion;
