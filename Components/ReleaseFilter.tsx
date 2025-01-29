import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../redux/flowSlice";
import { RootState } from "../redux/store";

const ReleaseFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.flow.filters);
  const [releaseDate, setReleaseDate] = useState([
    1900,
    new Date().getFullYear(),
  ]);

  useEffect(() => {
    setReleaseDate([filters.releaseDate.min, filters.releaseDate.max]);
  }, [filters.releaseDate]);

  const handleValueChange = (value: number[]) => {
    setReleaseDate(value);
    dispatch(
      updateFilters({ name: "releaseDate", min: value[0], max: value[1] })
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: "white" }}>
        Release Date: {releaseDate[0]} - {releaseDate[1]}
      </Text>
      <Slider
        value={releaseDate}
        onValueChange={handleValueChange}
        minimumValue={1900}
        maximumValue={new Date().getFullYear()}
        step={1}
        thumbTintColor="white"
        minimumTrackTintColor="white"
        maximumTrackTintColor="gray"
      />
    </View>
  );
};

export default ReleaseFilter;
