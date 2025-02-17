import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors } from "../../../constants";

export const CollapsibleBiography = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const maxHeight = 100;
  const shouldShowButton = textHeight > maxHeight;

  return (
    <View>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 5,
        }}
      >
        Biography
      </Text>
      <View
        style={{
          maxHeight: isExpanded ? undefined : maxHeight,
          overflow: "hidden",
        }}
      >
        <Text
          style={{ color: "white", lineHeight: 20 }}
          onLayout={({ nativeEvent }) => {
            setTextHeight(nativeEvent.layout.height);
          }}
        >
          {text}
        </Text>
      </View>
      {shouldShowButton && (
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          style={{ paddingVertical: 10, alignItems: "center" }}
        >
          <Text style={{ color: Colors.primary, fontSize: 14 }}>
            {isExpanded ? "See Less" : "See More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
