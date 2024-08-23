import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Colors, imageBasePath } from "../../constants";
import { Service } from "../../types";
import { useEffect, useState } from "react";
import { fetchMovieServices } from "../../api";

const StreamingServices = ({
  streamingServices,
}: {
  streamingServices: Service[];
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
      Where to stream
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
  return <StreamingServices streamingServices={streamingServices} />;
};

export default ConnectedStreamingServices;
