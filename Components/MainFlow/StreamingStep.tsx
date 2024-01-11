import ProviderSelect from "../SortScreen/ProviderSelect";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Genre, Keyword, KeywordMap } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  updateKeywords,
  updatePrevStep,
  updateStep,
} from "../../redux/flowSlice";
import { RootState } from "../../redux/store";
import * as Haptics from "expo-haptics";
import KeywordSearch from "./KeywordSearch";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";

const StreamingStep = () => {
  const step = useSelector((state: RootState) => state.flow.step);
  const prevStep = useSelector((state: RootState) => state.flow.prevStep);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(updateStep(3));
    dispatch(updatePrevStep(2));
  };

  const handlePrev = () => {
    dispatch(updateStep(1));
    dispatch(updatePrevStep(2));
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: "#A3BBD3",
          fontSize: 20,
          paddingTop: 15,
          paddingLeft: 15,
          fontWeight: "600",
        }}
      >
        Select your streaming services
      </Text>
      <View style={{ paddingVertical: 10 }}>
        <ProviderSelect />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          width: "120%",
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
              Next
            </Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </View>
  );
};

export default StreamingStep;
