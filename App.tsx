import React from "react";
import Home from "./Components/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Flow: undefined;
  Recs: { recs: Movie[] };
  Movie: { id: number };
  Person: { person: Person };
};
const Stack = createStackNavigator<RootStackParamList>();
import { Provider } from "react-redux";
import store from "./redux/store";
import RecsScreen from "./Components/MainFlow/RecsScreen";
import { Movie, Person } from "./constants";
import MovieScreen from "./Components/MovieScreen";
import MainFlow from "./Components/MainFlow/MainFlow";
import PersonScreen from "./Components/PersonScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="Flow"
            component={MainFlow}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Recs"
            initialParams={{ recs: [] }}
            component={RecsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Movie"
            initialParams={{ id: 0 }}
            component={MovieScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Person"
            initialParams={{ person: { id: 0, name: "" } }}
            component={PersonScreen}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
