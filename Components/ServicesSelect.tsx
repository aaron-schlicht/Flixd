import {
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Dimensions,
  TouchableOpacity,
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
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const dispatch = useDispatch();

  const handleRemoveService = (provider: Service) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dispatch(updateSelectedServices(provider));
  };

  const SelectedServiceItem = ({ service }: { service: Service }) => {
    if (!service) return null;

    return (
      <View style={{ marginRight: 15, position: "relative" }}>
        <TouchableOpacity onPress={() => handleRemoveService(service)}>
          <Image
            source={{ uri: `${imageBasePath}${service.logo_path}` }}
            style={{ width: 30, height: 30, borderRadius: 5 }}
          />
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "red",
              borderRadius: 360,
              width: 12,
              height: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="close" size={10} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          width,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#11142A",
          gap: 10,
        }}
      >
        <H4
          style={{
            width: width * 0.8,
            marginLeft: 10,
            marginTop: 10,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Select your streaming services
        </H4>
        <FlatList
          horizontal
          data={selectedServices}
          keyExtractor={(service) => `selected-${service.provider_id}`}
          renderItem={({ item }) => <SelectedServiceItem service={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
        />
      </View>
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
        paddingLeft: 15,
        borderBottomColor: Colors.secondary,
        width: width * 0.95,
        alignSelf: "center",
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
        <View style={{ position: "absolute", top: 2, left: 57 }}>
          <Ionicons name="checkmark-circle" color="white" size={17} />
        </View>
      ) : null}
    </View>
  );
});

export default ServicesSelect;
