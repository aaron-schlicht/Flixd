import { View, Text, ScrollView, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../../constants";
import { Service } from "../../types";
import { useEffect, useState } from "react";
import { fetchMovieServices } from "../../api";
import { Skeleton } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w342/";

const StreamingServices = ({
  streamingServices,
  loading,
  title,
}: {
  streamingServices: Service[];
  loading: boolean;
  title: string;
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
        paddingBottom: 5,
        fontWeight: "bold",
      }}
      numberOfLines={2}
      adjustsFontSizeToFit
    >
      {title}
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
                source={{ uri: SMALL_POSTER_BASE_PATH + service.logo_path }}
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
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );

  const getStreamingServices = async () => {
    setLoading(true);
    const data = await fetchMovieServices(id);
    setStreamingServices(data);
    setLoading(false);
  };

  useEffect(() => {
    getStreamingServices();
  }, []);

  const availableOnUserServices = streamingServices.filter((service) =>
    selectedServices.some(
      (userService) => userService.provider_id === service.provider_id
    )
  );

  if (!streamingServices.length) return null;

  if (availableOnUserServices.length > 0) {
    return (
      <StreamingServices
        loading={loading}
        streamingServices={availableOnUserServices}
        title="Available on your services"
      />
    );
  }

  return (
    <StreamingServices
      loading={loading}
      streamingServices={streamingServices}
      title="Available to rent or stream"
    />
  );
};

export default ConnectedStreamingServices;
