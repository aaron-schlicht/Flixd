import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { resetFlow, updateFilters, updateStep } from "../../redux/flowSlice";
import ProviderSelect from "../SortScreen/ProviderSelect";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../../redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
import useGetRecommendations from "./useGetRecommendations";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;

const FilterStep = () => {
  let yearDiff = new Date().getFullYear() - 1890;
  const dispatch = useDispatch();
  const navigation = useNavigation<recsScreenProp>();

  const { getRecommendations } = useGetRecommendations();

  const handleNextStep = async () => {
    try {
      const recs = await getRecommendations();
      if (recs) {
        navigation.replace("Recs", { recs: recs });
        dispatch(resetFlow());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FilterAccordion
        name="years"
        description="Years of Release"
        visualText={(min, max) => `${min + 1890} - ${max + 1890}`}
        defaultMin={0}
        defaultMax={yearDiff}
      />
      <FilterAccordion
        name="length"
        description="Movie Length"
        visualText={(min, max) => `${min} minutes - ${max} minutes`}
        defaultMin={0}
        defaultMax={300}
      />
      <FilterAccordion
        name="rating"
        description="Average Rating"
        visualText={(min, max) => `${min / 10}/10 - ${max / 10}/10`}
        defaultMin={0}
        defaultMax={100}
      />
      <View style={{ paddingBottom: 80 }} />
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
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          colors={["transparent", "rgba(21, 24, 45, 0.5)"]}
        >
          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: "white",
              padding: 15,
              borderRadius: 30,
            }}
            onPress={handleNextStep}
          >
            <Text style={{ fontSize: 18 }}>Get Recommendations</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

interface FilterAccordionProps {
  name: string;
  description: string;
  visualText: (min: number, max: number) => string;
  defaultMin: number;
  defaultMax: number;
}

const FilterAccordion: FC<FilterAccordionProps> = ({
  name,
  description,
  visualText,
  defaultMin,
  defaultMax,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { min, max } = useSelector(
    (state: RootState) => state.flow.filters[name]
  ) || {
    min: defaultMin,
    max: defaultMax,
  };
  return (
    <View style={{ flex: 1, width: "100%", alignSelf: "center" }}>
      <TouchableHighlight
        style={{
          width: "100%",
          alignSelf: "center",
          padding: 15,
          backgroundColor: "#252942",
          borderBottomColor: "white",
          borderBottomWidth: 1,
        }}
        underlayColor="#252942"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            alignSelf: "center",
            width: 300,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Filter by {description}
          </Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            color="white"
            size={25}
          />
        </View>
      </TouchableHighlight>
      {isExpanded ? (
        <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {visualText(min, max)}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Slider
              value={[min, max]}
              animateTransitions
              step={1}
              onValueChange={(value) =>
                dispatch(updateFilters({ name, min: value[0], max: value[1] }))
              }
              minimumValue={defaultMin}
              maximumValue={defaultMax}
              minimumTrackTintColor="#A3BBD3"
              thumbTintColor="#A3BBD3"
              maximumTrackTintColor="#252942"
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const ProviderAccordion = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={{ flex: 1, width: "100%", alignSelf: "center" }}>
      <TouchableHighlight
        style={{
          width: "100%",
          alignSelf: "center",
          padding: 15,
          backgroundColor: "#252942",
          borderBottomColor: "white",
          borderBottomWidth: 1,
        }}
        underlayColor="#252942"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            alignSelf: "center",
            width: 300,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Filter by Streaming Service
          </Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            color="white"
            size={25}
          />
        </View>
      </TouchableHighlight>
      {!isExpanded ? null : <ProviderSelect />}
    </View>
  );
};

export default FilterStep;
