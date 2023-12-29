import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from "react-native";
import GenreStep from "./GenreStep";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import KeywordStep from "./KeywordStep";
import FilterStep from "./FilterStep";
import { RootState } from "../../redux/store";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const MainFlow = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#15182D" }}>
      <View style={{ height: 60, marginTop: 10, justifyContent: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            padding: 15,
          }}
        >
          Discover Movies
        </Text>
        <FlatList
          data={[<GenreStep />]}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1 }} key={`index-${index}`}>
                {item}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default MainFlow;

/*

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#15182D",
          },
          tabBarItemStyle: {
            flex: 1,
          },
          tabBarIndicatorStyle: {
            borderBottomColor: "white",
            //borderBottomWidth: 3,
            height: "100%",
            backgroundColor: "darkslategray",
            borderRadius: 15,
          },
          tabBarLabel: ({ focused, children }) => (
            <Text
              style={{
                color: focused ? "white" : "slategray",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {children}
            </Text>
          ),
        }}
        sceneContainerStyle={{ backgroundColor: "#15182D" }}
        initialRouteName="Genres"
      >
        <Tab.Screen name="Genres" component={GenreStep} />
        <Tab.Screen name="Keywords" component={KeywordStep} />
        <Tab.Screen name="Filters" component={FilterStep} />
      </Tab.Navigator>

*/
