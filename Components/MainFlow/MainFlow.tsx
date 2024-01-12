import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
  Text,
  FlatList,
} from "react-native";
import GenreStep from "./GenreStep";
import { useDispatch, useSelector } from "react-redux";
import KeywordStep from "./KeywordStep";
import FilterStep from "./FilterStep";
import { RootState } from "../../redux/store";
import StreamingStep from "./StreamingStep";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { resetFlow, updateStep } from "../../redux/flowSlice";

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
const MainFlow = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const step = useSelector((state: RootState) => state.flow.step);
  const ref = useRef<FlatList>(null);
  const dispatch = useDispatch();

  const navigation = useNavigation<recsScreenProp>();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToIndex({ animated: true, index: step });
    }
  }, [ref.current, step]);

  const SCREEN_WIDTH = Dimensions.get("screen").width;

  const handleBack = () => {
    dispatch(resetFlow());
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#15182D" }}>
      <SafeAreaView />
      <View>
        <TouchableOpacity
          onPress={() => handleBack()}
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            backgroundColor: "white",
            width: 100,
            justifyContent: "center",
            paddingVertical: 5,
            borderRadius: 20,
            marginLeft: 10,
          }}
        >
          <Ionicons name="arrow-back" color="#15182D" size={25} />
          <Text style={{ color: "#15182D", fontWeight: "600", fontSize: 20 }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        ref={ref}
        horizontal
        data={[
          <GenreStep />,
          <KeywordStep />,
          <StreamingStep />,
          <FilterStep />,
        ]}
        bounces={false}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        onScrollToIndexFailed={(error) => {
          console.log("error: ", error);
        }}
        snapToAlignment="start"
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          return <View style={{ flex: 1, width: SCREEN_WIDTH }}>{item}</View>;
        }}
      />
    </View>
  );
};

export default MainFlow;
