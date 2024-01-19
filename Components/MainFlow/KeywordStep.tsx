import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Genre, Keyword, KeywordMap, Keywords } from "../../constants";
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
import { Key, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const KeywordStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const dispatch = useDispatch();

  const buildKeywords = () => {
    let commonKeywords: {
      [key: number]: { occurences: number; keyword: Keyword };
    } = {};
    for (const genre of genres) {
      let keywords = KeywordMap[genre];
      for (let i = 0; i < keywords.length; i++) {
        commonKeywords[keywords[i].id] = commonKeywords[keywords[i].id]
          ? {
              ...commonKeywords[keywords[i].id],
              occurences: ++commonKeywords[keywords[i].id].occurences,
            }
          : { keyword: keywords[i], occurences: 1 };
      }
    }
    return Object.values(commonKeywords)
      .sort((a, b) => b.occurences - a.occurences)
      .map((val) => val.keyword);
  };

  const handlePress = (selection: Keyword) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateKeywords(selection));
  };

  const keywordArray = !genres.length ? Keywords : buildKeywords();

  const handleNext = () => {
    dispatch(updateStep(2));
    dispatch(updatePrevStep(1));
  };

  const handlePrev = () => {
    dispatch(updateStep(0));
    dispatch(updatePrevStep(1));
  };

  const getKeywordText = () => {
    if (!keywords.length) return null;
    if (keywords.length === 1) {
      return (
        keywords[0].name.charAt(0).toUpperCase() + keywords[0].name.slice(1)
      );
    } else {
      let str = "";
      keywords.map((keyword, index) => {
        str += keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1);
        if (index !== keywords.length - 1) {
          str += ", ";
        }
      });
      return str;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 15,
          paddingLeft: 15,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          width: Dimensions.get("window").width * 0.9,
        }}
      >
        <Ionicons name="key" color="#A3BBD3" size={30} />
        <Text
          style={{
            color: "#A3BBD3",
            fontSize: 25,
            fontWeight: "600",
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Select any keywords
        </Text>
      </View>
      <Text
        style={{
          height: 30,
          marginTop: 10,
          color: "white",
          fontSize: 25,
          paddingLeft: 15,
          fontWeight: "300",
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {getKeywordText()}
      </Text>
      <KeywordSearch />
      <View style={{ flex: 1, paddingTop: 10 }}>
        <Text
          style={{
            color: "white",
            paddingHorizontal: 15,
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Suggested
        </Text>
        <FlatList
          data={keywordArray}
          numColumns={3}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 5 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={{ width: "33%" }} key={`keyword-${item.id}`}>
                <KeywordButton
                  keyword={item}
                  handleSelect={handlePress}
                  isActive={!!keywords.find(({ id }) => id === item.id)}
                />
              </View>
            );
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
              onPress={handleNext}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: 25,
                }}
              >
                {keywords.length ? "Next" : "Skip"}
              </Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const KeywordButton = ({
  handleSelect,
  keyword,
  isActive,
}: {
  handleSelect: (key: Keyword) => void;
  keyword: Keyword;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? "#A3BBD3" : "#252942",
        padding: 5,
        flex: 1,
        borderRadius: 15,
        margin: 5,
        height: 70,
        justifyContent: "center",
      }}
      onPress={() => handleSelect(keyword)}
    >
      <Text
        style={{
          color: isActive ? "#15182D" : "#FFF",
          textAlign: "center",
          fontSize: 14,
        }}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        allowFontScaling={true}
      >
        {keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default KeywordStep;
