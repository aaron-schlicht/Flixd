import { View, StatusBar, ScrollView } from "react-native";
import SearchFunction from "../Search";
import SimilarMoviesFunction from "../SimilarMovies/SimilarMoviesFunction";
import { SafeAreaView } from "react-native";
import { styles } from "./Home.styled";
import InfoFunction from "../InfoFunction";
import { LogoLarge } from "../Search/SearchFunction.styled";
import Lucky from "../Lucky/Lucky";
import SearchButton from "../Search/SearchButton";
import { useSelector } from "react-redux";
import MainFlow from "../MainFlow/MainFlow";
import { RootState } from "../../redux/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/*<LogoLarge />*/}
        <StatusBar barStyle="light-content" />
        <Tab.Navigator
          screenOptions={{
            header: () => null,
            tabBarStyle: {
              backgroundColor: "white",
              borderTopColor: "slategrey",
              height: 55,
            },
            tabBarItemStyle: {
              backgroundColor: "#252942",
              height: 55,
            },
            tabBarLabel: () => null,
          }}
        >
          <Tab.Screen
            name="Discover"
            component={MainFlow}
            options={{
              tabBarIcon: () => <Ionicons name="home" color="#ccc" size={30} />,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchButton}
            options={{
              tabBarIcon: () => (
                <Ionicons name="search" color="#ccc" size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Random"
            component={Lucky}
            options={{
              tabBarIcon: () => (
                <FontAwesome5 name="dice" color="#ccc" size={30} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#252942" }} />
    </View>
  );
}
