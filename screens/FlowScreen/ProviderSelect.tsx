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

export default function ProviderSelect() {
  return (
    <FlatList
      data={Providers}
      numColumns={5}
      contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 30,
        gap: 10,
      }}
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
    <View>
      <View
        style={{
          width: Dimensions.get("window").width * 0.2,
          height: Dimensions.get("window").width * 0.2,
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
            width: Dimensions.get("window").width * 0.14 + 10,
            height: Dimensions.get("window").width * 0.14 + 10,
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
              width: Dimensions.get("window").width * 0.14,
              height: Dimensions.get("window").width * 0.14,
              borderRadius: 10,
              opacity: selected ? 1 : 0.8,
            }}
          />
        </TouchableHighlight>
      </View>
      {selected ? (
        <View style={{ position: "absolute", top: -11, right: 1 }}>
          <Ionicons name="checkmark-circle" color="white" size={20} />
        </View>
      ) : null}
    </View>
  );
};
