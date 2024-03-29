import ProviderSelect from "./ProviderSelect";
import { View, Text, TouchableHighlight, Dimensions } from "react-native";
import { Colors } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { updateStep } from "../../redux/flowSlice";
import { RootState } from "../../redux/store";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const StreamingStep = () => {
  const servicesLength = useSelector(
    (state: RootState) => state.movies.selectedServices.length
  );
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(updateStep(3));
  };

  const handlePrev = () => {
    dispatch(updateStep(1));
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 15,
          paddingHorizontal: 15,
          gap: 5,
          alignItems: "center",
          width: Dimensions.get("window").width * 0.9,
        }}
      >
        <Ionicons name="tv" color={Colors.primary} size={30} />
        <Text
          style={{
            color: Colors.primary,
            fontSize: 25,
            fontWeight: "600",
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Select your streaming services
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <ProviderSelect />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          width: Dimensions.get("window").width,
        }}
      >
        <LinearGradient
          style={{
            width: "100%",
            height: 120,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            flexDirection: "row",
            gap: 20,
            paddingBottom: 30,
          }}
          colors={["transparent", "rgba(21, 24, 45, 0.9)"]}
        >
          <TouchableHighlight
            style={{
              backgroundColor: "white",
              width: 150,
              borderRadius: 30,
              padding: 10,
            }}
            underlayColor="rgba(255,255,255,0.8)"
            onPress={handlePrev}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 25,
              }}
            >
              Previous
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              backgroundColor: "white",
              width: 150,
              borderRadius: 30,
              padding: 10,
            }}
            underlayColor="rgba(255,255,255,0.8)"
            onPress={handleNext}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 25,
              }}
            >
              {servicesLength ? "Next" : "Skip"}
            </Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </View>
  );
};

export default StreamingStep;
