import React, { useState } from "react";
import { View, Text, Dimensions, FlatList, SafeAreaView } from "react-native";
import { Colors } from "../../constants";
import GenreStep from "../FlowScreen/GenreStep";
import Accordion from "../../components/Accordion";
import KeywordStep from "../FlowScreen/KeywordStep";
import RatingFilter from "../../components/RatingFilter";
import ReleaseFilter from "../../components/ReleaseFilter";
import SelectedFilters from "../../components/SelectedFilters";
import { Background, Center, Flex } from "../../components/ui/Layouts";
import { H2, H3 } from "../../components/ui/Typography";
import CertificationFilter from "../../components/CertificationFilter"; // Add import

const { width, height } = Dimensions.get("screen");

const AccordionItems = [
  { h: 300, title: "Genres", component: <GenreStep /> },
  { h: 400, title: "Keywords", component: <KeywordStep /> },
  { title: "Rating", component: <RatingFilter /> },
  { title: "Release Year", component: <ReleaseFilter /> },
  { title: "Age Rating", component: <CertificationFilter /> }, // Add new filter
];

const FilterScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Background style={{ overflow: "hidden" }}>
      <SafeAreaView>
        <View
          style={{
            width,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#11142A",
            gap: 10,
            height: 120,
          }}
        >
          <H2
            style={{
              width: width * 0.8,
              marginLeft: 15,
              marginTop: 10,
              color: Colors.primary,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Filter By
          </H2>
          <SelectedFilters />
        </View>
        <View style={{ height: height, width: width }}>
          <FlatList
            data={AccordionItems}
            contentContainerStyle={{ paddingBottom: 200, overflow: "hidden" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Accordion
                h={item.h}
                title={item.title}
                isExpanded={activeIndex === index}
                onPress={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                {item.component}
              </Accordion>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default FilterScreen;
