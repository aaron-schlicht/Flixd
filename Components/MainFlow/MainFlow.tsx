import { View, SafeAreaView } from "react-native";
import GenreStep from "./GenreStep";
import { useSelector } from "react-redux";
import KeywordStep from "./KeywordStep";
import FilterStep from "./FilterStep";
import { RootState } from "../../redux/store";

const RenderStep = (step: number) => {
  switch (step) {
    case 0:
      return <GenreStep />;
    case 1:
      return <KeywordStep />;
    case 2:
      return <FilterStep />;
  }
};

const MainFlow = () => {
  const step = useSelector((state: RootState) => state.flow.step);
  return (
    <View style={{ flex: 1, backgroundColor: "#252942" }}>
      <SafeAreaView style={{ flex: 1 }}>{RenderStep(step)}</SafeAreaView>
    </View>
  );
};

export default MainFlow;
