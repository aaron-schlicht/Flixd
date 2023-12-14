import { useState, useEffect, Key } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useGetKeywordSearchResultsQuery } from "../../redux/apiSlice";
import { Keyword } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword, updateKeywords } from "../../redux/flowSlice";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

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

  const handleSelect = (selectedValue: Keyword) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log(selectedValue);
    dispatch(updateKeywords(selectedValue));
    dispatch(addKeyword(selectedValue));
  };

  return (
    <View style={{ marginTop: 15, paddingHorizontal: 5 }}>
      {isFocused ? (
        <View
          style={{
            padding: 10,
            paddingLeft: 20,
            backgroundColor: "#252942",
            borderRadius: 15,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              fontSize: 16,
              height: 50,
              color: "white",
              flex: 1,
            }}
            autoFocus
            onSubmitEditing={() => setIsFocused(false)}
            onChangeText={(e) => setQuery(e)}
            value={query}
            returnKeyType="search"
            //placeholder={`Search keywords... Try "Spies"`}
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
              backgroundColor: "#252942",
              padding: 10,
              paddingLeft: 20,
              height: 50,
              borderRadius: 15,
              justifyContent: "center",
            }}
            underlayColor="#252942"
            onPress={() => setIsFocused(true)}
          >
            <Text style={{ color: "white", fontSize: 16, opacity: 0.5 }}>
              Search for keywords...
            </Text>
          </TouchableHighlight>
        </View>
      )}
      {!data ? null : (
        <View style={{ marginTop: 10 }}>
          <FlatList
            horizontal
            data={data.results.filter(
              (k) => !keywords.filter((key: Keyword) => key.id === k.id).length
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const keyWord: Keyword = { name: item.name, id: item.id };
              return (
                <KeywordButton
                  handleSelect={handleSelect}
                  keyword={keyWord}
                  isActive={false}
                />
              );
            }}
          />
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
        backgroundColor: isActive ? "#A3BBD3" : "#252942",
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

export default KeywordSearch;
