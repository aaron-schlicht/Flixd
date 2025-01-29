import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import store from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
