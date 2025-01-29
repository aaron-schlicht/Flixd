import React, { useState } from "react";
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
}: {
  title: string;
  h?: number;
  children: JSX.Element;
}) => {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: 300 }),
    };
  });

  const toggleAccordion = () => {
    setExpanded(!expanded);
    height.value = expanded ? 0 : h;
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: expanded ? Colors.primary : Colors.secondary,
          opacity: 0.8,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={toggleAccordion}
      >
        <Text style={{ color: "white" }}>{title}</Text>
      </TouchableOpacity>
      <Animated.View style={[{ overflow: "hidden" }, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

export default Accordion;
