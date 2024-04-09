import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { useGetKeywordSearchResultsQuery } from "../../redux/apiSlice";
import { Colors } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword, updateKeywords } from "../../redux/flowSlice";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Keyword } from "../../types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const suggestions = [
  "Small Town",
  "Independent Film",
  "Friendship",
  "Based on Play or Musical",
  "Politics",
  "Remake",
  "Based on Novel or Book",
  "New York City",
  "Los Angeles",
  "Origin Story",
  "Samurai",
  "Viking",
  "World War II",
  "Paris",
];

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
};

const KeywordSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query);
  const { data } = useGetKeywordSearchResultsQuery(debouncedValue);
  const dispatch = useDispatch();
  const { keywords } = useSelector((state: any) => state.flow);
  const [suggestion, setSuggestion] = useState(
    suggestions[Math.floor(Math.random() * suggestions.length)]
  );
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (selectedValue: Keyword) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log(selectedValue);
    dispatch(updateKeywords(selectedValue));
    dispatch(addKeyword(selectedValue));
  };

  useEffect(() => {
    const randomInterval = setInterval(() => {
      setIsVisible(true);
      setSuggestion(
        suggestions[Math.floor(Math.random() * suggestions.length)]
      );
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }, 6000);
    return () => clearInterval(randomInterval);
  }, [suggestion]);

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = isVisible
      ? withTiming(0.5, {
          duration: 1000,
        })
      : withTiming(0, { duration: 1000 });
    return {
      opacity,
    };
  });

  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 10,
      }}
    >
      {isFocused ? (
        <View
          style={{
            padding: 10,
            paddingLeft: 20,
            backgroundColor: Colors.secondary,
            borderRadius: 15,
            height: 45,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              fontSize: 16,
              height: 45,
              color: "white",
              flex: 1,
            }}
            autoFocus
            onSubmitEditing={() => setIsFocused(false)}
            onChangeText={(e) => setQuery(e)}
            value={query}
            returnKeyType="search"
          />
          {query.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                setQuery("");
                setIsFocused(false);
              }}
            >
              <Ionicons name="close-circle" color="#ccc" size={18} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <View>
          <TouchableHighlight
            style={{
              backgroundColor: Colors.secondary,
              padding: 10,
              paddingLeft: 20,
              height: 45,
              borderRadius: 15,
              justifyContent: "center",
            }}
            underlayColor={Colors.secondary}
            onPress={() => setIsFocused(true)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={{ color: "white", fontSize: 12, opacity: 0.5 }}>
                Search keywords... try
              </Text>
              <Animated.Text
                style={[opacityStyle, { color: "white", fontSize: 13 }]}
              >
                "{suggestion}"
              </Animated.Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
      {!data ? null : (
        <View style={{ marginTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.results
              .filter(
                (k) =>
                  !keywords.filter((key: Keyword) => key.id === k.id).length
              )
              .slice(0, 10)
              .map((item) => {
                const keyWord: Keyword = { name: item.name, id: item.id };
                return (
                  <KeywordButton
                    key={`keyword-${keyWord.id}`}
                    handleSelect={handleSelect}
                    keyword={keyWord}
                    isActive={false}
                  />
                );
              })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const KeywordButton = ({
  handleSelect,
  keyword,
  isActive,
}: {
  handleSelect: (value: any) => void;
  keyword: Keyword;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? Colors.primary : Colors.secondary,
        padding: 10,
        flex: 1,
        borderRadius: 15,
        margin: 5,
        height: 50,
        minWidth: 90,
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
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={true}
      >
        {keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default KeywordSearch;
