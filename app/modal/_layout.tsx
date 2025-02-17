import { router, Stack } from "expo-router";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";

const HeaderButton = ({
  onPress,
  icon,
  position,
}: {
  onPress: () => void;
  icon: "close" | "chevron-back";
  position: "left" | "right";
}) => (
  <TouchableOpacity
    style={{
      padding: 10,
      borderRadius: 360,
      width: 50,
      height: 50,
      position: "absolute",
      top: 5,
      [position]: 15,
      zIndex: 200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(21, 24, 45, 0.3)",
    }}
    onPress={onPress}
  >
    <Ionicons name={icon} color="white" size={30} />
  </TouchableOpacity>
);

const Header = ({
  canGoBack,
  onClose,
}: {
  canGoBack?: boolean;
  onClose: () => void;
}) => (
  <>
    {canGoBack && (
      <HeaderButton
        onPress={() => router.back()}
        icon="chevron-back"
        position="left"
      />
    )}
    <HeaderButton onPress={onClose} icon="close" position="right" />
  </>
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
    <>
      <Stack
        initialRouteName="movie"
        screenOptions={({ navigation }) => ({
          header: () => (
            <Header canGoBack={navigation.canGoBack()} onClose={handlePress} />
          ),
        })}
      >
        <Stack.Screen name="movie" initialParams={{ id: "" }} />
        <Stack.Screen name="person" initialParams={{ id: "" }} />
        <Stack.Screen name="filter" />
        <Stack.Screen name="services" />
        <Stack.Screen name="sort" />
      </Stack>
    </>
  );
}
