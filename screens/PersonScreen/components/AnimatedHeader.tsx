import { Text } from "react-native";
import Animated from "react-native-reanimated";
import { Colors } from "../../../constants";
import { AnimatedHeaderProps } from "../types";

export const HEADER_COLLAPSED_HEIGHT = 50;

export const AnimatedHeader = ({
  person,
  headerOpacity,
}: AnimatedHeaderProps) => (
  <Animated.View
    style={[
      {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_COLLAPSED_HEIGHT,
        backgroundColor: Colors.background,
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
      },
      headerOpacity,
    ]}
  >
    <Text
      style={{
        color: "white",
        fontSize: 18,
        fontWeight: "600",
      }}
      numberOfLines={1}
    >
      {person?.name}
    </Text>
  </Animated.View>
);
