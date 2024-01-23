import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFilters, updateStep } from "../../redux/flowSlice";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../../redux/store";
import useGetRecommendations from "./useGetRecommendations";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { Colors } from "../../constants";
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePrev = () => {
    dispatch(updateStep(2));
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 15,
          paddingLeft: 15,
          gap: 5,
          alignItems: "center",
          width: Dimensions.get("window").width * 0.9,
        }}
      >
        <Ionicons name="filter" color={Colors.primary} size={30} />
        <Text
          style={{
            color: Colors.primary,
            fontSize: 25,
            fontWeight: "600",
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Add any additional filters
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          paddingTop: 35,
          paddingHorizontal: 20,
          gap: 20,
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}
        data={[
          {
            name: "year",
            icon: "calendar",
            description: "Years of Release",
            visualText: (min: number, max: number) =>
              `${min + 1890} - ${max + 1890}`,
            defaultMin: 0,
            defaultMax: yearDiff,
          },
          {
            name: "length",
            icon: "time",
            description: "Movie Length",
            visualText: (min: number, max: number) =>
              `${min} minutes - ${max} minutes`,
            defaultMin: 0,
            defaultMax: 300,
          },
          {
            name: "rating",
            icon: "star",
            description: "Average Rating",
            visualText: (min: number, max: number) =>
              `${min / 10}/10 - ${max / 10}/10`,
            defaultMin: 0,
            defaultMax: 100,
          },
        ]}
        keyExtractor={({ name }) => `${name}-filter`}
        renderItem={({ item }) => {
          return <FilterAccordion {...item} />;
        }}
      />
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
            onPress={handleNextStep}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 25,
              }}
            >
              See Results
            </Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </View>
  );
};

interface FilterAccordionProps {
  name: string;
  icon: any;
  description: string;
  visualText: (min: number, max: number) => string;
  defaultMin: number;
  defaultMax: number;
}

const FilterAccordion: FC<FilterAccordionProps> = ({
  name,
  icon,
  description,
  visualText,
  defaultMin,
  defaultMax,
}) => {
  const dispatch = useDispatch();
  const { min, max } = useSelector(
    (state: RootState) => state.flow.filters[name]
  ) || {
    min: defaultMin,
    max: defaultMax,
  };
  const isDefault = min === defaultMin && max === defaultMax;
  return (
    <View style={{ flex: 1, width: "100%", alignSelf: "center" }}>
      <View
        style={{
          width: "100%",
          padding: 15,
          paddingHorizontal: 20,
          borderRadius: 10,
          backgroundColor: Colors.secondary,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={25} color="white" />
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          {description}
        </Text>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "300",
            fontSize: 20,
          }}
        >
          {isDefault ? `Any ${name}` : visualText(min, max)}
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
            minimumTrackTintColor={Colors.primary}
            thumbTintColor={Colors.primary}
            maximumTrackTintColor={Colors.secondary}
          />
        </View>
      </View>
    </View>
  );
};

export default FilterStep;
