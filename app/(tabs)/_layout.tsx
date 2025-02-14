import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router"; // Remove useRouter
import { Colors } from "../../constants";
import {
  View,
  Text,
  Animated,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRef } from "react";

interface TabButtonProps {
  focused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  iconOutlineName: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
}

const TabButton = ({
  focused,
  iconName,
  iconOutlineName,
  label,
  onPress,
}: TabButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = (e: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.9,
        speed: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress?.(e);
  };

  return (
    <Pressable onPress={handlePress} style={{ flex: 1 }}>
      <Animated.View
        style={{
          alignItems: "center",
          gap: 2,
          paddingTop: 2,
          transform: [{ scale }],
        }}
      >
        <Ionicons
          name={focused ? iconName : iconOutlineName}
          color={focused ? "white" : Colors.primary}
          size={iconName === "search-circle" ? 40 : 35}
        />
        <Text
          style={{
            color: focused ? "white" : Colors.primary,
            textAlign: "center",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          paddingBottom: 20,
          borderTopWidth: 0,
          height: "11%",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["rgba(37, 41, 66, 0.98)", "rgba(37, 41, 66, 1)"]}
            style={{
              height: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
        tabBarLabel: () => null,
        tabBarBadge: undefined,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarButton: (props) => (
            <TabButton
              {...props}
              focused={props.accessibilityState?.selected ?? false}
              iconName="home"
              iconOutlineName="home-outline"
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarButton: (props) => (
            <TabButton
              {...props}
              focused={props.accessibilityState?.selected ?? false}
              iconName="search-circle"
              iconOutlineName="search-circle-outline"
              label="Search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          title: "Discover",
          tabBarButton: (props) => (
            <TabButton
              {...props}
              focused={props.accessibilityState?.selected ?? false}
              iconName="compass"
              iconOutlineName="compass-outline"
              label="Discover"
            />
          ),
        }}
      />
    </Tabs>
  );
}
