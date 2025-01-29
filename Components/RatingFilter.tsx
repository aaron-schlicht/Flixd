import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../redux/flowSlice";
import { RootState } from "../redux/store";

const RatingFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.flow.filters);
  const [rating, setRating] = useState([0, 100]);

  useEffect(() => {
    setRating([filters.rating.min, filters.rating.max]);
  }, [filters.rating]);

  const handleValueChange = (value: number[]) => {
    setRating(value);
    dispatch(updateFilters({ name: "rating", min: value[0], max: value[1] }));
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ color: "white" }}>
        Rating: {rating[0]} - {rating[1]}
      </Text>
      <Slider
        value={rating}
        onValueChange={handleValueChange}
        minimumValue={0}
        maximumValue={100}
        step={1}
        thumbTintColor="white"
        minimumTrackTintColor="white"
        maximumTrackTintColor="gray"
      />
    </View>
  );
};

export default RatingFilter;
