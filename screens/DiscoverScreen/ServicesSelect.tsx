import {
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import { Providers, imageBasePath } from "../../constants";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedServices } from "../../redux/movieSlice";
import { RootState } from "../../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { WatchProvider } from "../../types";

const ServicesSelect = () => {
  return (
    <View
      style={{
        zIndex: 100,
        position: "absolute",
        backgroundColor: "rgba(21, 24, 45, 0.9)",
      }}
    >
      <FlatList
        data={Providers}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 10,
          gap: 5,
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

const ProviderButton = ({ provider }: { provider: WatchProvider }) => {
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
          width: 60,
          height: 60,
          alignItems: "center",
        }}
      >
        <TouchableHighlight
          style={{
            padding: 5,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: selected ? "white" : "transparent",
            width: 55,
            height: 55,
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
              width: 45,
              height: 45,
              borderRadius: 10,
              opacity: selected ? 1 : 0.8,
            }}
          />
        </TouchableHighlight>
      </View>
      {selected ? (
        <View style={{ position: "absolute", top: -8, right: -4 }}>
          <Ionicons name="checkmark-circle" color="white" size={17} />
        </View>
      ) : null}
    </View>
  );
};

export default ServicesSelect;
