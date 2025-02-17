import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import store from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "../constants";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { checkAndMigrateServices } from "../utils/serviceMigration";

export default function Layout() {
  let persistor = persistStore(store);

  useEffect(() => {
    checkAndMigrateServices(store);
  }, []);

  SystemUI.setBackgroundColorAsync(Colors.header);
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
