import {
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import { Colors, MainProviders, imageBasePath } from "../constants";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedServices } from "../redux/movieSlice";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Service } from "../types";
import { memo } from "react";
import { H4, Paragraph } from "./ui/Typography";
import { Flex } from "./ui/Layouts";
const { width } = Dimensions.get("screen");

const ServicesSelect = () => {
  return (
    <View
      style={{
        zIndex: 100,
        backgroundColor: "rgba(21, 24, 45, 0.9)",
      }}
    >
      <H4
        style={{
          paddingLeft: 15,
          paddingVertical: 20,
          width: width * 0.8,
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        Select your streaming services
      </H4>
      <FlatList
        data={MainProviders}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingBottom: 150,
          width: width,
        }}
        showsVerticalScrollIndicator={false}
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
    <View
      style={{
        padding: 10,
        backgroundColor: selected ? Colors.secondary : "transparent",
        borderBottomColor: selected ? Colors.primary : Colors.secondary,
        borderBottomWidth: 1,
      }}
    >
      <TouchableHighlight
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        underlayColor="transparent"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          dispatch(updateSelectedServices(provider));
        }}
      >
        <Flex style={{ width: "100%", gap: 15 }}>
          <View
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
          </View>
          <H4
            style={{
              color: selected ? "white" : Colors.primary,
              fontWeight: selected ? "bold" : "normal",
            }}
          >
            {provider.provider_name}
          </H4>
        </Flex>
      </TouchableHighlight>
      {selected ? (
        <View style={{ position: "absolute", top: 2, left: 51 }}>
          <Ionicons name="checkmark-circle" color="white" size={17} />
        </View>
      ) : null}
    </View>
  );
});

export default ServicesSelect;
