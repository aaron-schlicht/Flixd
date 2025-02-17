import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "@reduxjs/toolkit";
import { clearSelectedServices } from "../redux/movieSlice";

const SERVICES_VERSION_KEY = "servicesVersion";
const CURRENT_VERSION = "2"; // Increment this when services structure changes

export const checkAndMigrateServices = async (store: Store) => {
  try {
    const version = await AsyncStorage.getItem(SERVICES_VERSION_KEY);

    if (version !== CURRENT_VERSION) {
      // Clear the selected services
      store.dispatch(clearSelectedServices());

      // Update the version in storage
      await AsyncStorage.setItem(SERVICES_VERSION_KEY, CURRENT_VERSION);
    }
  } catch (error) {
    console.error("Error during services migration:", error);
  }
};
