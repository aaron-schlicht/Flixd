import {
  DimensionValue,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, getRatingColor, imageBasePath } from "../../constants";
import { Service } from "../../types";
import { useGetProvidersQuery } from "../../redux/apiSlice";

export interface PosterButtonProps {
  dimensions?: { width: number; height: number };
  onPress: () => void;
  id: number;
  posterPath: string;
  title: string;
  release_date: string;
  vote_average: number;
}

const PosterButton: FC<PosterButtonProps> = ({
  dimensions = { width: 100, height: 150 },
  onPress,
  id,
  posterPath,
  title,
  release_date,
  vote_average,
}) => {
  const [services, setServices] = useState<Service[]>([]);

  const { data: providersData, isLoading: isProvidersLoading } =
    useGetProvidersQuery(id);

  const getStreamingServices = () => {
    try {
      if (
        providersData &&
        providersData.results["US"] &&
        providersData.results["US"].flatrate
      ) {
        return providersData.results["US"].flatrate as Service[];
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  useEffect(() => {
    setServices(getStreamingServices());
  }, [providersData]);

  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 10 }}>
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
          //marginTop: -IMAGE_WIDTH * 0.15,
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
        <View style={{ flexDirection: "row", gap: 5, paddingTop: 10 }}>
          {services.slice(0, 3).map((service) => {
            return (
              <View key={`service-${service.provider_id}`}>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 10 }}
                  source={{ uri: imageBasePath + service.logo_path }}
                  transition={200}
                />
              </View>
            );
          })}
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
    marginBottom: 10,
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
