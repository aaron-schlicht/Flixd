import { FlatList, View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Colors, imageBasePath } from "../../constants";
import { Service } from "../../types";

const StreamingServices = ({
  streamingServices,
}: {
  streamingServices: Service[];
}) => {
  if (!streamingServices.length) return null;
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        Where to stream
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
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
        contentContainerStyle={{ gap: 10, paddingTop: 15 }}
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
};

export default StreamingServices;
