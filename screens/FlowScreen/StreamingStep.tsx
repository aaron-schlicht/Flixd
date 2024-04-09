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
      <ProviderSelect />
    </View>
  );
};

export default StreamingStep;
