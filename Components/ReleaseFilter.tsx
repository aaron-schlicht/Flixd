import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../redux/flowSlice";
import { RootState } from "../redux/store";
import debounce from "lodash/debounce";

const ReleaseFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.flow.filters);
  const [release, setRelease] = useState([1900, new Date().getFullYear()]);

  useEffect(() => {
    setRelease([filters.releaseDate.min, filters.releaseDate.max]);
  }, [filters.releaseDate]);

  const debouncedDispatch = useCallback(
    debounce((value: number[]) => {
      dispatch(
        updateFilters({ name: "releaseDate", min: value[0], max: value[1] })
      );
    }, 300),
    []
  );

  const handleValueChange = (value: number[]) => {
    setRelease(value);
  };

  const handleSlidingComplete = (value: number[]) => {
    debouncedDispatch(value);
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ color: "white" }}>
        Release Year: {release[0]} - {release[1]}
      </Text>
      <Slider
        value={release}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
        minimumValue={1900}
        maximumValue={2024}
        step={1}
        thumbTouchSize={{ width: 200, height: 200 }}
        thumbTintColor="white"
        minimumTrackTintColor="white"
        maximumTrackTintColor="gray"
      />
    </View>
  );
};

export default ReleaseFilter;
