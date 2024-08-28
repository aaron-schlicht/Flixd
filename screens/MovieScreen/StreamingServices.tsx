import { View, Text, ScrollView, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Colors, imageBasePath } from "../../constants";
import { Service } from "../../types";
import { useEffect, useState } from "react";
import { fetchMovieServices } from "../../api";
import { Skeleton } from "@rneui/themed";

const StreamingServices = ({
  streamingServices,
  loading,
}: {
  streamingServices: Service[];
  loading: boolean;
}) => (
  <View
    style={{
      marginVertical: 5,
      paddingVertical: 10,
    }}
  >
    <Text
      style={{
        color: "white",
        fontSize: 20,
        paddingHorizontal: 20,
        fontWeight: "bold",
      }}
    >
      Where to watch
    </Text>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ color: Colors.primary }}>Powered by</Text>
      <Image
        style={{ width: 120, height: "100%" }}
        contentFit="contain"
        source={require("../../assets/justwatch.webp")}
      />
    </View>
    {loading ? (
      <ServicesSkeleton />
    ) : (
      <ScrollView
        horizontal
        contentContainerStyle={{
          gap: 10,
          paddingTop: 15,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {streamingServices.map((service) => {
          return (
            <View key={`service-${service.provider_id}`}>
              <Image
                style={{ width: 60, height: 60, borderRadius: 10 }}
                source={{ uri: imageBasePath + service.logo_path }}
                transition={200}
              />
            </View>
          );
        })}
      </ScrollView>
    )}
  </View>
);

const ServicesSkeleton = () => (
  <View
    style={{
      width: Dimensions.get("window").width,
      alignItems: "center",
      paddingTop: 15,
    }}
  >
    <Skeleton
      style={{ backgroundColor: "#373D63", borderRadius: 10 }}
      skeletonStyle={{
        backgroundColor: "#252942",
      }}
      width={Dimensions.get("window").width * 0.91}
      height={60}
    />
  </View>
);

const ConnectedStreamingServices = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);
  const [streamingServices, setStreamingServices] = useState<Service[]>([]);
  const getStreamingServices = async () => {
    setLoading(true);
    const data = await fetchMovieServices(id);
    setStreamingServices(data);
    setLoading(false);
  };

  useEffect(() => {
    getStreamingServices();
  }, []);
  if (!streamingServices.length) return null;
  return (
    <StreamingServices
      loading={loading}
      streamingServices={streamingServices}
    />
  );
};

export default ConnectedStreamingServices;
