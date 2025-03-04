import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import store from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "../constants";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { checkAndMigrateServices } from "../utils/serviceMigration";
import NetInfo from "@react-native-community/netinfo";
import { View, Text, StyleSheet } from "react-native";

const OfflineScreen = () => (
  <View style={styles.offlineContainer}>
    <Text style={styles.offlineText} numberOfLines={1} adjustsFontSizeToFit>
      Oops, your internet appears to be offline
    </Text>
    <Text style={styles.offlineSubtext}>
      Please check your connection and try again
    </Text>
  </View>
);

export default function Layout() {
  let persistor = persistStore(store);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    checkAndMigrateServices(store);

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  SystemUI.setBackgroundColorAsync(Colors.header);

  if (!isConnected) {
    return <OfflineScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="movies/[genre]"
            options={{ headerShown: false }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  offlineContainer: {
    flex: 1,
    backgroundColor: Colors.header,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  offlineText: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  offlineSubtext: {
    color: Colors.primary,
    fontSize: 16,
  },
});
