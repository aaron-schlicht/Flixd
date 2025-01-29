import { View, Text, Dimensions, FlatList, SafeAreaView } from "react-native";
import { Colors } from "../../constants";
import GenreStep from "../FlowScreen/GenreStep";
import Accordion from "../../components/Accordion";
import KeywordStep from "../FlowScreen/KeywordStep";
import RatingFilter from "../../components/RatingFilter";
import ReleaseFilter from "../../components/ReleaseFilter";
import SelectedFilters from "../../components/SelectedFilters";
import { Background, Center, Flex } from "../../components/ui/Layouts";
import { H3 } from "../../components/ui/Typography";

const { width, height } = Dimensions.get("screen");

const AccordionItems = [
  { h: 300, title: "Filter by Genre", component: <GenreStep /> },
  { h: 400, title: "Filter by Keyword", component: <KeywordStep /> },
  { title: "Filter by Rating", component: <RatingFilter /> },
  { title: "Filter by Year", component: <ReleaseFilter /> },
  {
    title: "Filter by Streaming Service",
    component: <Text>Streaming Service goes here</Text>,
  },
];

const FilterScreen = () => {
  return (
    <Background style={{ overflow: "hidden" }}>
      <SafeAreaView>
        <Center>
          <Flex style={{ marginTop: 30 }}>
            <H3>Filter</H3>
          </Flex>
          <SelectedFilters />
          <View style={{ height: height, width: width }}>
            <FlatList
              data={AccordionItems}
              contentContainerStyle={{ paddingBottom: 200 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Accordion h={item.h} title={item.title}>
                  {item.component}
                </Accordion>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Center>
      </SafeAreaView>
    </Background>
  );
};

export default FilterScreen;
