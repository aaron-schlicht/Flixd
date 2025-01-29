import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
const CloseButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{
      padding: 10,
      borderRadius: 360,
      width: 50,
      height: 50,
      position: "absolute",
      top: 5,
      right: 15,
      zIndex: 200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(21, 24, 45, 0.3)",
    }}
    onPress={onPress}
  >
    <Ionicons name="close" color="white" size={30} />
  </TouchableOpacity>
);

export default function Layout() {
  const navigationState = useNavigationState((state) => state);

  const handlePress = () => {
    if (
      navigationState?.routes[1].state?.routes.length &&
      navigationState.routes[1].state.routes.length > 1
    ) {
      router.dismissAll();
      router.back();
    } else {
      router.dismissAll();
    }
  };
  return (
    <Stack
      initialRouteName="movie"
      screenOptions={{
        header: () => <CloseButton onPress={handlePress} />,
      }}
    >
      <Stack.Screen
        name="movie"
        initialParams={{ id: "" }}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="person"
        initialParams={{ id: "" }}
        //options={{ headerShown: false }}
      />
      <Stack.Screen name="filter" options={{ headerShown: false }} />
      <Stack.Screen name="services" />
    </Stack>
  );
}
