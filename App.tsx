import React, { useEffect } from "react";
import Tabs from "./components/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import RecsScreen from "./screens/RecsScreen";
import MovieScreen from "./screens/MovieScreen";
import MainFlow from "./screens/FlowScreen/FlowScreen";
import PersonScreen from "./screens/PersonScreen";
import { RootStackParamList } from "./types";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const Stack = createStackNavigator<RootStackParamList>();
let persistor = persistStore(store);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Tabs}
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
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
