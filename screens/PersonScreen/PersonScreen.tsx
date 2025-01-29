import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { imageBasePath, Colors } from "../../constants";
import useGetPersonInfo from "../../hooks/useGetPersonInfo";
import MovieList from "../../components/ui/MovieList";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

const PersonScreen = ({ id }: { id: string }) => {
  const { credits, person, loading } = useGetPersonInfo(id);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SafeAreaView style={{ backgroundColor: Colors.secondary }} />
      <BackButton onPress={() => router.back()} />
      <View
        style={{
          paddingVertical: 15,
          alignItems: "center",
          width: Dimensions.get("window").width,
          gap: 10,
          backgroundColor: Colors.secondary,
        }}
      >
        {person && person.profile_path ? (
          <Image
            source={{ uri: imageBasePath + person.profile_path }}
            style={{ width: 125, height: 125, borderRadius: 20 }}
            transition={200}
            contentFit="cover"
          />
        ) : (
          <Ionicons name="person" color={Colors.primary} size={120} />
        )}
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: "600",
            textAlign: "center",
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {person && person.name}
        </Text>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlashList
          contentContainerStyle={{
            paddingBottom: 200,
          }}
          data={credits}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ name }) => name}
          renderItem={({ item }) => {
            return (
              <MovieList
                isRefreshing={false}
                name={item.name}
                data={item.movies}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{
      padding: 10,
      borderRadius: 360,
      width: 50,
      height: 50,
      position: "absolute",
      top: 50,
      left: 15,
      zIndex: 200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(21, 24, 45, 0.3)",
    }}
    onPress={onPress}
  >
    <Ionicons name="chevron-back" color="white" size={30} />
  </TouchableOpacity>
);

export default PersonScreen;
