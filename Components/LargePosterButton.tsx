import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { PosterButtonProps } from "./PosterButton";
import { getRatingColor } from "../constants";

const BASE_WIDTH = Dimensions.get("window").width * 0.8;
const LargePosterButton: FC<
  PosterButtonProps & {
    title: string;
    release_date: string;
    vote_average: number;
  }
> = ({
  dimensions = { width: BASE_WIDTH, height: BASE_WIDTH * 1.5 },
  onPress,
  posterPath,
  title,
  release_date,
  vote_average,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      style={[
        styles.image,
        { width: dimensions.width, height: dimensions.height },
      ]}
      contentFit="cover"
      transition={240}
      source={{
        uri: posterPath,
      }}
    />
    <LinearGradient
      style={[
        styles.gradient,
        {
          width: dimensions.width,
          height: dimensions.height,
        },
      ]}
      colors={["transparent", "rgba(21, 24, 45, 1)"]}
    />
    <View
      style={{
        marginTop: -dimensions.width * 0.15,
        zIndex: 100,
        width: dimensions.width,
        paddingHorizontal: 15,
      }}
    >
      <Text
        style={{ color: "white", fontSize: 20, fontWeight: "600" }}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 10,
          gap: 6,
        }}
      >
        <Ionicons name="calendar" color="#A3BBD3" size={20} />
        <Text style={styles.description}>
          {new Date(release_date).getFullYear()}
        </Text>
        <Text
          style={[
            styles.description,
            {
              paddingHorizontal: 5,
            },
          ]}
        >
          |
        </Text>
        <Ionicons name="star" color="#A3BBD3" size={20} />
        <Text
          style={[
            styles.description,
            {
              color: getRatingColor(vote_average),
            },
          ]}
        >
          {vote_average.toPrecision(3)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default LargePosterButton;

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: "#A3BBD3",
    zIndex: 1,
  },
  gradient: {
    zIndex: 2,
    marginTop: 10,
    position: "absolute",
    borderRadius: 0,
  },
  description: {
    color: "#A3BBD3",
    fontSize: 18,
    fontWeight: "800",
  },
});
