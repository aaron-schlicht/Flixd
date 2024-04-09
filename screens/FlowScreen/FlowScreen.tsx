import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import GenreStep from "./GenreStep";
import { useDispatch, useSelector } from "react-redux";
import KeywordStep from "./KeywordStep";
import FilterStep from "./FilterStep";
import { RootState } from "../../redux/store";
import StreamingStep from "./StreamingStep";
import { useEffect, useRef, useState } from "react";
import { Gesture, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { resetFlow } from "../../redux/flowSlice";
import { Colors, imageBasePath } from "../../constants";
import { Movie, RootStackParamList } from "../../types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useGetRecommendations from "../../hooks/useGetRecommendations";
import {
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import LargePosterButton from "../../components/LargePosterButton";
import SearchResults from "../DiscoverScreen/SearchResults";
import ResultsList from "./ResultsList";
import Results from "./Results";

const ITEM_SIZE = Dimensions.get("window").width * 0.8;
const EMPTY_ITEM_SIZE = (Dimensions.get("window").width - ITEM_SIZE) / 2;
const IMAGE_WIDTH = Dimensions.get("window").width * 0.75;
const ITEM_HEIGHT = Dimensions.get("window").height * 0.55;
const OFFSET = 0;

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
const Tab = createMaterialTopTabNavigator();
const MainFlow = () => {
  const step = useSelector((state: RootState) => state.flow.step);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const genres = useSelector((state: RootState) => state.flow.genres);
  const services = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const [recs, setRecs] = useState<Movie[]>([]);
  const { getRecommendations, loading } = useGetRecommendations();
  const dispatch = useDispatch();
  const pressed = useSharedValue(0);
  const offset = useSharedValue(OFFSET);

  const navigation = useNavigation<recsScreenProp>();

  const hasChanged = genres.length || keywords.length;

  const getRecs = async () => {
    const res = await getRecommendations();
    if (res) {
      setRecs(res.filter((value) => value.poster_path));
    }
  };

  const handleReset = () => {
    dispatch(resetFlow());
  };

  useEffect(() => {
    getRecs();
  }, [services, keywords, genres]);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = offset.value;
    })
    .onUpdate((event) => {
      offset.value = Math.max(OFFSET, pressed.value + event.translationY);
    })
    .onFinalize((event) => {
      if (event.translationY > 0) {
        // User swiped downwards
        if (event.translationY > 130) {
          offset.value = withTiming(350);
        } else {
          offset.value = withTiming(OFFSET);
        }
      } else {
        // User swiped upwards
        if (-event.translationY > 130) {
          offset.value = withTiming(OFFSET);
        } else {
          offset.value = withTiming(350);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: offset.value > 350 ? 350 : offset.value,
    };
  });

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            offset.value === 350 ? withTiming(`180deg`) : withTiming(`0deg`),
        },
      ],
    };
  });

  const handlePress = () => {
    offset.value =
      offset.value === OFFSET ? withTiming(350) : withTiming(OFFSET);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <SafeAreaView />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            alignItems: "center",
            height: 45,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <View style={{ width: "25%" }} />
          <View style={{ width: "50%", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                width: 120,
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                padding: 2,
                borderRadius: 20,
              }}
              onPress={handlePress}
            >
              <Ionicons
                name="filter-circle"
                color={Colors.background}
                size={30}
              />
              <Text
                style={{
                  color: Colors.background,
                  fontSize: 22,
                  fontWeight: "400",
                }}
              >
                Filter
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "25%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {hasChanged ? (
              <TouchableOpacity
                onPress={handleReset}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Ionicons name="refresh" color={Colors.primary} size={25} />
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <Animated.View style={animatedStyle}>
          <DrawerOptions offset={offset} />
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: Colors.secondary,
          }}
        >
          <GestureDetector gesture={pan}>
            <Animated.View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: Colors.secondary,
                alignItems: "center",
                borderTopColor: Colors.secondary,
                borderTopWidth: 2,
              }}
            >
              <Animated.View style={rotateStyle}>
                <TouchableOpacity onPress={handlePress}>
                  <Ionicons name="chevron-down" color="white" size={25} />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </GestureDetector>
          {loading ? (
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.background,
                paddingTop: "50%",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
            <Results movies={recs} />
          )}
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const DrawerOptions = ({ offset }: { offset: SharedValue<number> }) => {
  const textOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value, [60, 90], [0, 1]);
    return {
      opacity,
    };
  });

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: Colors.background,
      }}
      /*screenListeners={({ navigation, route }) => ({
        tabPress: (e) => {
          if (offset.value === OFFSET) {
            offset.value = withTiming(350);
            e.preventDefault();
            setTimeout(() => {
              navigation.navigate(route.name);
            }, 400);
          } else {
            e.preventDefault();
            navigation.navigate(route.name);
          }
        },
      })}*/
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.secondary,
          width: "90%",
          alignSelf: "center",
          height: 40,
        },
        tabBarItemStyle: { justifyContent: "flex-start" },
        tabBarLabelStyle: {
          color: "#ccc",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          borderRadius: 30,
        },
      }}
    >
      <Tab.Screen
        name="Genres"
        component={GenreStep}
        options={{
          tabBarLabel: ({ focused }) => (
            <Animated.View
              style={[
                {
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                },
              ]}
            >
              <Animated.Text
                style={[
                  {
                    color: focused ? "white" : "#ccc",
                    fontWeight: "bold",
                  },
                ]}
              >
                Genres
              </Animated.Text>
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Keywords"
        component={KeywordStep}
        options={{
          tabBarLabel: ({ focused }) => (
            <Animated.View
              style={[
                {
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                },
              ]}
            >
              <Animated.Text
                style={[
                  {
                    color: focused ? "white" : "#ccc",
                    fontWeight: "bold",
                  },
                ]}
              >
                Keywords
              </Animated.Text>
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Streaming"
        component={StreamingStep}
        options={{
          tabBarLabel: ({ focused }) => (
            <Animated.View
              style={[
                {
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                },
              ]}
            >
              <Animated.Text
                style={[
                  {
                    color: focused ? "white" : "#ccc",
                    fontWeight: "bold",
                  },
                ]}
              >
                Streaming
              </Animated.Text>
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainFlow;
