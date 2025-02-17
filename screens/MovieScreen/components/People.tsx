import {
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors, imageBasePath } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { CastMember, CrewMember } from "../../../types";
import { get } from "../../../api";
import { CastResults } from "../../../redux/apiSlice";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";

const SCREEN_PADDING = 15;
const GRID_GAP = 10;
const COLUMNS = 3;
const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH =
  (screenWidth - SCREEN_PADDING * 2 - GRID_GAP * (COLUMNS - 1)) / COLUMNS;
const IMAGE_SIZE = ITEM_WIDTH - 20; // Leave some margin for the text below

const PeopleGrid = ({ people }: { people: (CastMember | CrewMember)[] }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        padding: SCREEN_PADDING,
        gap: GRID_GAP,
      }}
    >
      {people.map((person, index) => (
        <View
          key={`person-${index}`}
          style={{
            width: ITEM_WIDTH,
            marginBottom: 20,
          }}
        >
          <Person
            name={person.name}
            profile_path={person.profile_path}
            id={person.id}
            character={"character" in person ? person.character : undefined}
          />
        </View>
      ))}
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const EmptyState = ({ message }: { message: string }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >
    <Ionicons name="people" size={50} color={Colors.secondary} />
    <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>
      {message}
    </Text>
  </View>
);

const PeopleList = ({ people }: { people: (CastMember | CrewMember)[] }) => {
  if (!people?.length) {
    return <EmptyState message="No people to display" />;
  }

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <PeopleGrid people={people} />
    </ScrollView>
  );
};

const DirectorTab = ({ crew }: { crew: CrewMember[] }) => {
  const directors =
    crew?.filter((c) => c?.job?.toUpperCase() === "DIRECTOR") ?? [];

  if (!directors.length) {
    return <EmptyState message="No directors found" />;
  }

  return <PeopleList people={directors} />;
};

const ProducerTab = ({ crew }: { crew: CrewMember[] }) => {
  const producers =
    crew?.filter((c) => c?.job?.toUpperCase().includes("PRODUCER")) ?? [];

  if (!producers.length) {
    return <EmptyState message="No producers found" />;
  }

  return <PeopleList people={producers} />;
};

const CastTab = ({ cast }: { cast: CastMember[] }) => {
  if (!cast?.length) {
    return <EmptyState message="No cast members found" />;
  }

  return <PeopleList people={cast} />;
};

const fetchTopCredits = async (id: number) => {
  const { data } = await get<CastResults>(`movie/${id}/credits`);
  if (data) {
    return {
      cast: data.cast,
      crew: data.crew, // Return all crew members
    };
  } else {
    return { cast: [], crew: [] };
  }
};

const Person = ({
  name,
  id,
  profile_path,
  character,
}: {
  name: string;
  id: number;
  profile_path?: string;
  character?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/modal/person?id=${id}`)}
      style={{ alignItems: "center" }}
    >
      <View
        style={{
          shadowColor: "black",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: IMAGE_SIZE / 4,
          backgroundColor: "black",
        }}
      >
        <View
          style={{
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
            backgroundColor: Colors.secondary,
            borderRadius: IMAGE_SIZE / 4,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {profile_path ? (
            <Image
              source={{ uri: imageBasePath + profile_path }}
              style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
              transition={200}
              contentFit="cover"
            />
          ) : (
            <Ionicons
              name="person"
              color={Colors.primary}
              size={IMAGE_SIZE * 0.75}
            />
          )}
        </View>
      </View>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          paddingTop: 5,
          fontSize: 12,
          width: ITEM_WIDTH,
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
      {character && (
        <Text
          style={{
            color: Colors.primary,
            textAlign: "center",
            fontSize: 10,
            width: ITEM_WIDTH,
          }}
          numberOfLines={1}
        >
          {character}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const ConnectedPeople = ({ id }: { id: number }) => {
  const [topCast, setTopCast] = useState<CastMember[]>([]);
  const [topCrew, setTopCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true); // Changed to start as true
  const windowHeight = Dimensions.get("window").height;

  const getTopCredits = async () => {
    try {
      const { cast, crew } = await fetchTopCredits(id);
      setTopCast(cast ?? []);
      setTopCrew(crew ?? []);
    } catch (error) {
      setTopCast([]);
      setTopCrew([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopCredits();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          marginTop: 15,
          height: windowHeight * 0.6,
          backgroundColor: Colors.secondary,
          marginHorizontal: 15,
          borderRadius: 10,
        }}
      />
    );
  }

  return <People topCast={topCast} topCrew={topCrew} />;
};

const People = ({
  topCast,
  topCrew,
}: {
  topCast: CastMember[];
  topCrew: CrewMember[];
}) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      style={{
        height: windowHeight * 0.6,
        marginTop: 15,
        borderBottomColor: Colors.secondary,
        borderBottomWidth: 1,
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
        <Tab.Screen name="Cast" children={() => <CastTab cast={topCast} />} />
        <Tab.Screen
          name="Director"
          children={() => <DirectorTab crew={topCrew} />}
        />
        <Tab.Screen
          name="Producer"
          children={() => <ProducerTab crew={topCrew} />}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ConnectedPeople;
