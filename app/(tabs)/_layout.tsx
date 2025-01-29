import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Colors } from "../../constants";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../redux/movieSlice";

export default function TabLayout() {
  const dispatch = useDispatch();

  const handleTabPress = (tab: "home" | "search" | "discover") => {
    dispatch(setCurrentTab(tab));
  };

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
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                gap: 2,
                paddingTop: 2,
                width: 70,
              }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "white" : Colors.primary}
                size={35}
              />
              <Text
                style={{
                  color: focused ? "white" : Colors.primary,
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("home"),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                gap: 2,
                paddingTop: 2,
                width: 70,
              }}
            >
              <Ionicons
                name={focused ? "search-circle" : "search-circle-outline"}
                color={focused ? "white" : Colors.primary}
                size={40}
              />
              <Text
                style={{
                  color: focused ? "white" : Colors.primary,
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("search"),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          title: "Discover",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", paddingTop: 2, width: 70 }}>
              <Ionicons
                name={focused ? "compass" : "compass-outline"}
                color={focused ? "white" : Colors.primary}
                size={40}
              />
              <Text
                style={{
                  color: focused ? "white" : Colors.primary,
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Discover
              </Text>
            </View>
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("discover"),
        }}
      />
    </Tabs>
  );
}
