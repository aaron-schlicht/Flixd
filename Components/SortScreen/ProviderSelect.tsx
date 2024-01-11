import {
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import { Providers, WatchProvider, imageBasePath } from "../../constants";
import * as Haptics from "expo-haptics";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSelectedServices } from "../../redux/movieSlice";
import { memo, useEffect } from "react";
import { RootState } from "../../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

export default function ProviderSelect() {
  return (
    <FlatList
      data={Providers}
      numColumns={3}
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
      keyExtractor={({ provider_id }) => `provider-${provider_id}`}
      renderItem={({ item }) => {
        return <ProviderButton provider={item} />;
      }}
    />
  );
}

const ProviderButton = ({ provider }: { provider: WatchProvider }) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) =>
      !!state.movies.selectedServices.find(
        (p) => p.provider_id === provider.provider_id
      )
  );
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.3,
        height: Dimensions.get("window").width * 0.25,
        alignItems: "center",
      }}
    >
      <TouchableHighlight
        style={{
          padding: 5,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: selected ? 2 : 0,
          borderColor: selected ? "white" : "transparent",
          width: Dimensions.get("window").width * 0.2 + 10,
          height: Dimensions.get("window").width * 0.2 + 10,
        }}
        underlayColor="transparent"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          dispatch(updateSelectedServices(provider));
        }}
      >
        <Image
          source={{ uri: imageBasePath + provider.logo_url }}
          style={{
            width: Dimensions.get("window").width * 0.2,
            height: Dimensions.get("window").width * 0.2,
            borderRadius: 5,
            opacity: selected ? 1 : 0.65,
          }}
        />
      </TouchableHighlight>
    </View>
  );
};
