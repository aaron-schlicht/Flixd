import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "@reduxjs/toolkit";
import { clearSelectedServices } from "../redux/movieSlice";

const SERVICES_VERSION_KEY = "servicesVersion";
const CURRENT_VERSION = "2";

export const checkAndMigrateServices = async (store: Store) => {
  try {
    const version = await AsyncStorage.getItem(SERVICES_VERSION_KEY);

    if (version !== CURRENT_VERSION) {
      store.dispatch(clearSelectedServices());
      await AsyncStorage.setItem(SERVICES_VERSION_KEY, CURRENT_VERSION);
    }
  } catch (error) {
    console.error("Error during services migration:", error);
  }
};
