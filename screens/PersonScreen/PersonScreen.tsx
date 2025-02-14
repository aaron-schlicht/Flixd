import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { imageBasePath, Colors } from "../../constants";
import useGetPersonInfo from "../../hooks/useGetPersonInfo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import { Movie } from "../../types";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Tab = createMaterialTopTabNavigator();

const CollapsibleBiography = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const maxHeight = 100;
  const shouldShowButton = textHeight > maxHeight;

  return (
    <View>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 5,
        }}
      >
        Biography
      </Text>
      <View
        style={{
          maxHeight: isExpanded ? undefined : maxHeight,
          overflow: "hidden",
        }}
      >
        <Text
          style={{ color: "white", lineHeight: 20 }}
          onLayout={({ nativeEvent }) => {
            setTextHeight(nativeEvent.layout.height);
          }}
        >
          {text}
        </Text>
      </View>
      {shouldShowButton && (
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          style={{ paddingVertical: 10, alignItems: "center" }}
        >
          <Text style={{ color: Colors.primary, fontSize: 14 }}>
            {isExpanded ? "See Less" : "See More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const MovieGrid = ({ movies }: { movies: any[] }) => {
  const PADDING = 15;
  const GAP = 10;
  const numColumns = 3;
  const itemWidth =
    (Dimensions.get("window").width - PADDING * 2 - GAP * (numColumns - 1)) /
    numColumns;

  const renderItem = ({ item: movie }: { item: any }) => (
    <TouchableOpacity
      style={{
        width: itemWidth,
        marginBottom: 15,
      }}
      onPress={() => router.push(`/modal/movie?id=${movie.id}`)}
    >
      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
          aspectRatio: 2 / 3,
          backgroundColor: Colors.secondary,
        }}
      >
        <Image
          source={{ uri: imageBasePath + movie.poster_path }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={movies}
        renderItem={renderItem}
        estimatedItemSize={200}
        numColumns={3}
        contentContainerStyle={{ padding: PADDING, paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const CreditsTab = ({ credits }: { credits: Movie[] }) => {
  return <MovieGrid movies={credits} />;
};

const HEADER_HEIGHT = 140;
const PROFILE_IMAGE_SIZE = 100;
const HEADER_COLLAPSED_HEIGHT = 50;

const PersonBioHeader = ({ person }: { person: any }) => (
  <View
    style={{
      height: HEADER_HEIGHT,
      flexDirection: "row",
      marginTop: 40,
      padding: 15,
      gap: 15,
      alignItems: "flex-start",
      backgroundColor: Colors.background,
    }}
  >
    <View
      style={{
        shadowColor: "black",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 15,
      }}
    >
      {person?.profile_path ? (
        <Image
          source={{ uri: imageBasePath + person.profile_path }}
          style={{
            width: PROFILE_IMAGE_SIZE,
            height: PROFILE_IMAGE_SIZE,
            borderRadius: 15,
          }}
          transition={200}
          contentFit="cover"
        />
      ) : (
        <View
          style={{
            width: PROFILE_IMAGE_SIZE,
            height: PROFILE_IMAGE_SIZE,
            borderRadius: 15,
            backgroundColor: Colors.secondary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="person" color={Colors.primary} size={70} />
        </View>
      )}
    </View>

    {/* Right side - Text info */}
    <View style={{ flex: 1, justifyContent: "center", gap: 5 }}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "600",
        }}
        numberOfLines={2}
      >
        {person?.name}
      </Text>
      {person?.place_of_birth && (
        <Text style={{ color: "white", fontSize: 14 }}>
          Born in {person.place_of_birth}
        </Text>
      )}
      {person?.known_for_department && (
        <Text style={{ color: Colors.primary, fontSize: 14 }} numberOfLines={1}>
          Known for {person.known_for_department}
        </Text>
      )}
    </View>
  </View>
);

const AnimatedHeader = ({
  person,
  headerOpacity,
}: {
  person: any;
  headerOpacity: any;
}) => (
  <Animated.View
    style={[
      {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_COLLAPSED_HEIGHT,
        backgroundColor: Colors.background,
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
      },
      headerOpacity,
    ]}
  >
    <Text
      style={{
        color: "white",
        fontSize: 18,
        fontWeight: "600",
      }}
      numberOfLines={1}
    >
      {person?.name}
    </Text>
  </Animated.View>
);

const getSortedCredits = (credits: any[], knownForDepartment?: string) => {
  const creditMap = {
    Actor: credits.find((credit) => credit.name === "Actor"),
    Director: credits.find((credit) => credit.name === "Director"),
    Producer: credits.find((credit) => credit.name === "Producer"),
    Writer: credits.find((credit) => credit.name === "Writer"),
  };

  // Convert known department to credit type
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

  // Default order
  const defaultOrder = ["Director", "Producer", "Writer", "Actor"];

  // If primary role exists, move it to front
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

const PersonScreen = ({ id }: { id: string }) => {
  const { credits, person, loading } = useGetPersonInfo(id);
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
      <BackButton onPress={() => router.back()} />
      <AnimatedHeader person={person} headerOpacity={headerOpacity} />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        stickyHeaderIndices={[2]} // Make tabs sticky (index of the Tab.Navigator View)
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Biography section */}
        {person && <PersonBioHeader person={person} />}

        {/* Biography text */}
        {person?.biography && (
          <View style={{ paddingHorizontal: 15 }}>
            <CollapsibleBiography text={person.biography} />
          </View>
        )}

        {/* Credits tabs - This will be sticky */}
        {credits && credits.length > 0 && (
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
              {sortedCredits.map((credit) => (
                <Tab.Screen
                  key={credit.name}
                  name={credit.name}
                  children={() => <CreditsTab credits={credit.movies} />}
                />
              ))}
            </Tab.Navigator>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{
      padding: 10,
      borderRadius: 360,
      width: 50,
      height: 50,
      position: "absolute",
      top: 5,
      left: 15,
      zIndex: 101, // Higher than the animated header
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(21, 24, 45, 0.3)",
    }}
    onPress={onPress}
  >
    <Ionicons name="chevron-back" color="white" size={30} />
  </TouchableOpacity>
);

export default PersonScreen;
