import { View, StatusBar, Text } from "react-native";
import Discover from "../../screens/DiscoverScreen";
import Lucky from "../../screens/RandomScreen/RandomScreen";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { updateSearchResults } from "../../redux/movieSlice";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants";
import { styles } from "./Home.styled";
import SearchScreen from "../../screens/SearchScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          header: () => null,
          tabBarStyle: {
            position: "absolute",
            paddingBottom: 20,
            borderTopWidth: 0,
            height: "11%",
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={["rgba(37, 41, 66, 0.95)", "rgba(37, 41, 66, 1)"]}
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
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
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
          listeners={() => ({
            tabPress: () => {
              dispatch(updateSearchResults([]));
            },
          })}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
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
        />
        <Tab.Screen
          name="Random"
          component={Lucky}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  gap: 2,
                  paddingTop: 2,
                  width: 70,
                }}
              >
                <MaterialCommunityIcons
                  name={focused ? "dice-multiple" : "dice-multiple-outline"}
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
                  Random
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
