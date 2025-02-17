import { SafeAreaView, View, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import { Movie } from "../../types";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import { Colors } from "../../constants";
import useGetPersonInfo from "../../hooks/useGetPersonInfo";
import {
  BackButton,
  PersonBioHeader,
  MovieGrid,
  CollapsibleBiography,
  AnimatedHeader,
  HEADER_COLLAPSED_HEIGHT,
} from "./components";
import { PersonDetails } from "../../redux/apiSlice";
import { Credit } from "./types";

const Tab = createMaterialTopTabNavigator();

const CreditsTab = ({ credits }: { credits: Movie[] }) => {
  return <MovieGrid movies={credits} />;
};

const getSortedCredits = (
  credits: Credit[],
  knownForDepartment?: string | null
) => {
  const creditMap = {
    Actor: credits.find((credit) => credit.name === "Actor"),
    Director: credits.find((credit) => credit.name === "Director"),
    Producer: credits.find((credit) => credit.name === "Producer"),
    Writer: credits.find((credit) => credit.name === "Writer"),
  };

  const primaryRole =
    knownForDepartment === "Acting"
      ? "Actor"
      : knownForDepartment === "Directing"
      ? "Director"
      : knownForDepartment === "Production"
      ? "Producer"
      : knownForDepartment === "Writing"
      ? "Writer"
      : null;

  const defaultOrder = ["Director", "Producer", "Writer", "Actor"];

  if (primaryRole) {
    const orderWithoutPrimary = defaultOrder.filter(
      (role) => role !== primaryRole
    );
    const finalOrder = [primaryRole, ...orderWithoutPrimary];
    return finalOrder
      .map((role) => creditMap[role as keyof typeof creditMap])
      .filter(Boolean);
  }

  return defaultOrder
    .map((role) => creditMap[role as keyof typeof creditMap])
    .filter(Boolean);
};

interface PersonScreenProps {
  id: string;
}

const PersonScreen = ({ id }: PersonScreenProps) => {
  const { credits, person } = useGetPersonInfo(id);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [100, 120], [0, 1]);
    return { opacity };
  });

  const sortedCredits = getSortedCredits(credits, person?.known_for_department);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SafeAreaView />
      <AnimatedHeader person={person} headerOpacity={headerOpacity} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        stickyHeaderIndices={[2]}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {!!person && <PersonBioHeader person={person} />}
        {!!person?.biography && (
          <View style={{ paddingHorizontal: 15 }}>
            <CollapsibleBiography text={person.biography} />
          </View>
        )}
        {!!credits && credits.length > 0 && (
          <View
            style={{
              height:
                Dimensions.get("window").height - HEADER_COLLAPSED_HEIGHT - 70,
              backgroundColor: Colors.background,
              paddingTop: 15,
            }}
          >
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: Colors.secondary,
                  marginHorizontal: 15,
                  borderRadius: 10,
                  height: 50,
                },
                tabBarIndicatorStyle: {
                  backgroundColor: Colors.primary,
                  height: 50,
                  borderRadius: 10,
                },
                tabBarActiveTintColor: Colors.background,
                tabBarInactiveTintColor: "white",
                tabBarLabelStyle: {
                  fontSize: 14,
                  textTransform: "none",
                },
              }}
              sceneContainerStyle={{ backgroundColor: Colors.background }}
            >
              {sortedCredits.map((credit) => {
                if (credit) {
                  return (
                    <Tab.Screen
                      key={credit.name}
                      name={credit.name}
                      children={() => <CreditsTab credits={credit.movies} />}
                    />
                  );
                }
              })}
            </Tab.Navigator>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default PersonScreen;
