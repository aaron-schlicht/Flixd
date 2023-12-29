import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Genre, Keyword, KeywordMap } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { updateKeywords, updateStep } from "../../redux/flowSlice";
import { RootState } from "../../redux/store";
import * as Haptics from "expo-haptics";
import KeywordSearch from "./KeywordSearch";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  SlideInDown,
  SlideInRight,
  SlideOutDown,
  SlideOutRight,
} from "react-native-reanimated";

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

  const getKeywordSet = () => {
    const keywordSet: Set<Keyword> = new Set();
    Object.values(KeywordMap).map((keywords) => {
      for (const keyword of keywords) {
        keywordSet.add(keyword);
      }
    });
    return [...keywordSet];
  };

  const handlePress = (selection: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateKeywords(selection));
  };

  const keywordArray = !!!genres.length ? getKeywordSet() : buildKeywords();

  const handleNext = () => {
    dispatch(updateStep(2));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <KeywordSearch />
        <FlatList
          data={keywordArray}
          numColumns={3}
          horizontal={false}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ paddingBottom: 65 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={{ width: "33%" }} key={`keyword-${item.id}`}>
                <KeywordButton
                  keyword={item}
                  handleSelect={handlePress}
                  isActive={!!keywords.find((id: number) => id === item.id)}
                />
              </View>
            );
          }}
        />
        {!genres.length ? null : (
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
                  Next
                </Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        )}
      </View>
    </View>
  );
};

const KeywordButton = ({
  handleSelect,
  keyword,
  isActive,
}: {
  handleSelect: (id: number) => void;
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
        height: 60,
        justifyContent: "center",
      }}
      onPress={() => handleSelect(keyword.id)}
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
