import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  Extrapolation,
  FadeOutRight,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants";

const SearchBar = ({
  isFocused,
  setIsFocused,
  query,
  setQuery,
}: {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const width = useSharedValue(1);
  useEffect(() => {
    if (isFocused) {
      width.value = 0;
    } else {
      width.value = 1;
    }
  }, [isFocused]);

  const handleClear = () => {
    setQuery("");
  };

  const handleCancel = () => {
    setQuery("");
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const searchBoxAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedWidth = interpolate(width.value, [0, 1], [85, 100], {
      extrapolateRight: "clamp",
    });
    return {
      width: withTiming(`${interpolatedWidth}%`, {
        duration: 200,
      }),
    };
  });

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Animated.View
        style={[
          searchBoxAnimatedStyle,
          {
            backgroundColor: Colors.secondary,
            borderColor: Colors.primary,
            borderWidth: 1,
            borderRadius: 10,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingHorizontal: 10,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          color={query.length ? "white" : Colors.primary}
          size={25}
        />
        <TextInput
          keyboardAppearance="dark"
          autoCapitalize="words"
          autoCorrect={false}
          placeholderTextColor={Colors.primary}
          style={{
            color: "white",
            fontSize: 20,
            flex: 1,
          }}
          onFocus={() => setIsFocused(true)}
          onChangeText={(text) => setQuery(text)}
          value={query}
          returnKeyType="search"
          placeholder="Search movies..."
        />
        {query.length ? (
          <TouchableOpacity style={{ width: 30 }} onPress={() => handleClear()}>
            <Ionicons name="close-circle" color={Colors.primary} size={25} />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
      {isFocused ? (
        <Animated.View exiting={FadeOutRight}>
          <TouchableOpacity
            style={{ height: 50, justifyContent: "center" }}
            onPress={() => handleCancel()}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default SearchBar;
