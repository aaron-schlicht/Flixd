import {
  DimensionValue,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, getRatingColor, imageBasePath } from "../../constants";
import { Service } from "../../types";
import { useGetProvidersQuery } from "../../redux/apiSlice";
import { LinearGradient } from "expo-linear-gradient";

export interface PosterButtonProps {
  dimensions?: { width: number; height: number };
  onPress: () => void;
  id: number;
  posterPath: string;
  title: string;
  release_date: string;
  vote_average: number;
  providers: Service[];
}

const PosterButton: FC<PosterButtonProps> = ({
  dimensions = { width: 100, height: 150 },
  onPress,
  id,
  posterPath,
  title,
  release_date,
  vote_average,
  providers,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 10 }}>
      <LinearGradient
        style={[
          {
            zIndex: 2,
            marginHorizontal: 10,
            borderRadius: 20,
            width: dimensions.width,
            height: dimensions.height,
            position: "absolute",
          },
        ]}
        colors={[
          "rgba(21, 24, 45, 0)",
          "rgba(21, 24, 45, 0.2)",
          "rgba(21, 24, 45, 0.7)",
        ]}
      />
      <Image
        source={{ uri: posterPath }}
        contentFit="cover"
        style={[
          styles.posterImage,
          { width: dimensions.width, height: dimensions.height },
        ]}
      />

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          gap: 5,
          left: 15,
          top: dimensions.height * 0.88,
          zIndex: 3,
        }}
      >
        {Boolean(providers) &&
          providers.slice(0, 3).map((service) => {
            return (
              <View key={`service-${service.provider_id}`}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                  }}
                  source={{ uri: imageBasePath + service.logo_path }}
                  transition={200}
                />
              </View>
            );
          })}
      </View>
      <View
        style={{
          //marginTop: -IMAGE_WIDTH * 0.15,
          zIndex: 100,
          width: dimensions.width,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
          }}
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
          <Ionicons name="calendar" color={Colors.primary} size={20} />
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
          <Ionicons name="star" color={Colors.primary} size={20} />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    resizeMode: "cover",
    borderRadius: 20,
    margin: 0,
    marginBottom: 5,
  },
  gradient: {
    zIndex: 2,
    marginTop: 10,
    position: "absolute",
    borderRadius: 0,
  },
  description: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "800",
  },
});

export default PosterButton;
