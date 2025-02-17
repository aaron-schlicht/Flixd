import { View } from "react-native";
import { Image } from "expo-image";
import { Colors, imageBasePath, MainProviders } from "../../../constants";
import { Service } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface TopServiceLogosProps {
  selectedServices: Service[];
}

export const TopServiceLogos = ({ selectedServices }: TopServiceLogosProps) => {
  const isSelected = useSelector(
    (state: RootState) => state.flow.useStreamingServices
  );
  const firstThreeProviders =
    selectedServices.length > 0
      ? selectedServices.slice(0, 3)
      : MainProviders.slice(0, 3);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isSelected ? Colors.primary : Colors.secondary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 35,
        borderWidth: 1,
        borderColor: isSelected ? Colors.primary : "#696969",
      }}
    >
      {firstThreeProviders.map((provider, index) => (
        <Image
          key={provider.provider_id}
          source={{ uri: imageBasePath + provider.logo_path }}
          style={{
            width: 25,
            height: 25,
            zIndex: -index,
            marginLeft: index === 0 ? 0 : -12,
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
};
