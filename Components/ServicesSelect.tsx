import { View, Image, TouchableHighlight, FlatList, Text } from "react-native";
import { MainProviders, imageBasePath } from "../constants";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedServices } from "../redux/movieSlice";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Service } from "../types";
import { memo } from "react";

const ServicesSelect = () => {
  return (
    <View
      style={{
        zIndex: 100,
        backgroundColor: "rgba(21, 24, 45, 0.9)",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: "white",
          paddingLeft: 15,
          padding: 10,
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        Select your streaming services
      </Text>
      <FlatList
        data={MainProviders}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          gap: 2,
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ provider_id }) => `provider-${provider_id}`}
        renderItem={({ item }) => {
          return <ProviderButton provider={item} />;
        }}
      />
    </View>
  );
};

const ProviderButton = memo(({ provider }: { provider: Service }) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) =>
      !!state.movies.selectedServices.find(
        (p) => p.provider_id === provider.provider_id
      )
  );
  return (
    <View>
      <View
        style={{
          width: 56,
          height: 56,
          alignItems: "center",
        }}
      >
        <TouchableHighlight
          style={{
            padding: 5,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: selected ? "white" : "transparent",
            width: 50,
            height: 50,
          }}
          underlayColor="transparent"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            dispatch(updateSelectedServices(provider));
          }}
        >
          <Image
            source={{ uri: imageBasePath + provider.logo_path }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 8,
              opacity: selected ? 1 : 0.8,
            }}
          />
        </TouchableHighlight>
      </View>
      {selected ? (
        <View style={{ position: "absolute", top: -9, right: -4 }}>
          <Ionicons name="checkmark-circle" color="white" size={17} />
        </View>
      ) : null}
    </View>
  );
});

export default ServicesSelect;
