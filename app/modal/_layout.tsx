import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import { memo, useCallback } from "react";

const HeaderButton = memo(
  ({
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
  )
);

HeaderButton.displayName = "HeaderButton";

const Header = memo(
  ({ canGoBack, onClose }: { canGoBack?: boolean; onClose: () => void }) => {
    const handleBack = useCallback(() => {
      router.back();
    }, []);

    return (
      <>
        {canGoBack && (
          <HeaderButton
            onPress={handleBack}
            icon="chevron-back"
            position="left"
          />
        )}
        <HeaderButton onPress={onClose} icon="close" position="right" />
      </>
    );
  }
);

Header.displayName = "Header";

export default function Layout() {
  const navigationState = useNavigationState((state) => state);

  const handlePress = useCallback(() => {
    if (
      navigationState?.routes[1].state?.routes.length &&
      navigationState.routes[1].state.routes.length > 1
    ) {
      router.dismissAll();
      router.back();
    } else {
      router.dismissAll();
    }
  }, [navigationState]);

  const renderHeader = useCallback(
    (props: any) => {
      const canGoBack =
        (props.back && props.route.name === "movie") ||
        props.route.name === "person";
      return <Header canGoBack={canGoBack} onClose={handlePress} />;
    },
    [handlePress]
  );

  return (
    <>
      <Stack
        initialRouteName="movie"
        screenOptions={{
          header: renderHeader,
        }}
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
