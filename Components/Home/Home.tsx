import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import Discover from "../Discover";
import SimilarMoviesFunction from "../SimilarMovies/SimilarMoviesFunction";
import { SafeAreaView } from "react-native";
import { styles } from "./Home.styled";
import InfoFunction from "../InfoFunction";
import Lucky from "../Lucky/Lucky";
import { useDispatch, useSelector } from "react-redux";
import MainFlow from "../MainFlow/MainFlow";
import { RootState } from "../../redux/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import RecsIcon from "./RecsIcon";
import { updateSearchResults } from "../../redux/movieSlice";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

const CustomTab = ({ children, onPress }: { children: any; onPress?: any }) => (
  <TouchableHighlight
    style={{
      top: -25,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 360,
      backgroundColor: "white",
      width: 75,
      height: 75,
    }}
    onPress={onPress}
    underlayColor="white"
  >
    {children}
  </TouchableHighlight>
);

export default function Home() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      {/*<LogoLarge />*/}
      <SafeAreaView />
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          header: () => null,
          tabBarStyle: {
            position: "absolute",
            paddingBottom: 20,
            borderTopWidth: 0,
            height: "11%",
            //backgroundColor: "rgba(37, 41, 66, 0.85)",
            //borderTopColor: "#252942",
            //height: "11%",
            //paddingBottom: 20,
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
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name={focused ? "compass" : "compass-outline"}
                  color={focused ? "white" : "#A3BBD3"}
                  size={40}
                />
                <Text
                  style={{
                    color: focused ? "white" : "#A3BBD3",
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
          name="Recs"
          component={View}
          options={{
            tabBarIcon: () => (
              <View style={{ alignItems: "center", gap: 1 }}>
                <RecsIcon width={40} height={40} viewBox="0 0 75 75" />
              </View>
            ),
            tabBarButton: (props) => <CustomTab {...props} />,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.navigate("Flow");
            },
          })}
        />
        <Tab.Screen
          name="Random"
          component={Lucky}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", gap: 2 }}>
                <MaterialCommunityIcons
                  name={focused ? "dice-multiple" : "dice-multiple-outline"}
                  color={focused ? "white" : "#A3BBD3"}
                  size={40}
                />
                <Text
                  style={{
                    color: focused ? "white" : "#A3BBD3",
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
