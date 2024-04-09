import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Colors, KeywordMap, Keywords } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { updateKeywords, updateStep } from "../../redux/flowSlice";
import { RootState } from "../../redux/store";
import * as Haptics from "expo-haptics";
import KeywordSearch from "./KeywordSearch";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Keyword } from "../../types";

const KeywordStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const dispatch = useDispatch();

  const handlePress = (selection: Keyword) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateKeywords(selection));
  };

  let keywordArray = [...keywords, ...Keywords];
  keywordArray = keywordArray.filter(
    (value, index) => keywordArray.indexOf(value) === index
  );

  return (
    <View style={{ flex: 1 }}>
      <KeywordSearch />
      <View
        style={{
          flex: 1,
          paddingTop: 0,
          borderTopColor: Colors.secondary,
          borderTopWidth: 2,
        }}
      >
        <FlatList
          data={keywordArray}
          numColumns={3}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 200,
            paddingHorizontal: 10,
          }}
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
        backgroundColor: isActive ? Colors.primary : Colors.secondary,
        padding: 5,
        flex: 1,
        borderRadius: 10,
        margin: 5,
        height: 55,
        justifyContent: "center",
      }}
      onPress={() => handleSelect(keyword)}
    >
      <Text
        style={{
          color: isActive ? Colors.background : "#FFF",
          textAlign: "center",
          fontSize: 14,
        }}
        numberOfLines={2}
        adjustsFontSizeToFit
        allowFontScaling={true}
      >
        {keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default KeywordStep;
