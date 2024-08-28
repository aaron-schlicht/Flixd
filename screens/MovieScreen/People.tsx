import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors, imageBasePath } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CastMember, CrewMember, RootStackParamList } from "../../types";
import { get } from "../../api";
import { CastResults } from "../../redux/apiSlice";
import { useEffect, useState } from "react";
import { Skeleton } from "@rneui/themed";

const People = ({
  topCast,
  topCrew,
}: {
  topCast: CastMember[];
  topCrew: CrewMember[];
}) => {
  return (
    <View style={{ gap: 20 }}>
      <DirectorView directors={topCrew} />
      <CastView cast={topCast} />
    </View>
  );
};

const DirectorView = ({ directors }: { directors: CrewMember[] }) => {
  if (!directors.length) return null;
  else {
    return (
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            paddingLeft: 15,
          }}
        >
          {directors.length > 1 ? "Directors" : "Director"}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 5, paddingTop: 10 }}
        >
          {directors.map((director, index) => (
            <View
              key={`director-${index}`}
              style={{
                paddingLeft: index === 0 ? 15 : 0,
                paddingRight: index === directors.length - 1 ? 15 : 0,
              }}
            >
              <Person
                name={director.name}
                profile_path={director.profile_path}
                id={director.id}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
};

const CastView = ({ cast }: { cast: CastMember[] }) => {
  if (!cast.length) return null;
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "white",
          paddingLeft: 15,
        }}
      >
        Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 5, paddingTop: 10 }}
      >
        {cast.map((member, index) => (
          <View
            key={`castMember-${index}`}
            style={{
              paddingLeft: index === 0 ? 15 : 0,
              paddingRight: index === cast.length - 1 ? 15 : 0,
            }}
          >
            <Person
              name={member.name}
              profile_path={member.profile_path}
              id={member.id}
              character={member.character}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

type movieScreenProp = StackNavigationProp<RootStackParamList, "Movie">;
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
  const navigation = useNavigation<movieScreenProp>();
  const handlePress = () => {
    navigation.push("Person", { person: { name, id, profile_path } });
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ width: 110, alignItems: "center" }}
    >
      <View
        style={{
          shadowColor: "black",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: 30,
          backgroundColor: "black",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            height: 100,
            backgroundColor: Colors.secondary,
            borderRadius: 20,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {profile_path ? (
            <Image
              source={{ uri: imageBasePath + profile_path }}
              style={{ width: 100, height: 100, borderRadius: 20 }}
              transition={200}
              contentFit="cover"
            />
          ) : (
            <Ionicons name="person" color={Colors.primary} size={80} />
          )}
        </View>
      </View>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          paddingTop: 10,
          height: 30,
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {name}
      </Text>
      {character ? (
        <Text
          style={{ color: Colors.primary, textAlign: "center", fontSize: 10 }}
          numberOfLines={2}
        >
          "{character}"
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const fetchTopCredits = async (id: number) => {
  const { data } = await get<CastResults>(`movie/${id}/credits`);
  if (data) {
    return {
      cast: data.cast,
      crew: data.crew.filter(
        (crew) => crew.job.toLocaleUpperCase() === "DIRECTOR"
      ),
    };
  } else {
    return { cast: [], crew: [] };
  }
};

const PeopleSkeleton = () => (
  <View
    style={{
      width: Dimensions.get("window").width,
      alignItems: "center",
      paddingTop: 10,
    }}
  >
    <Skeleton
      style={{ backgroundColor: "#373D63", borderRadius: 10 }}
      skeletonStyle={{
        backgroundColor: "#252942",
      }}
      width={Dimensions.get("window").width * 0.91}
      height={220}
    />
  </View>
);

const ConnectedPeople = ({ id }: { id: number }) => {
  const [topCast, setTopCast] = useState<CastMember[]>([]);
  const [topCrew, setTopCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(false);

  const getTopCredits = async () => {
    setLoading(true);
    const { cast, crew } = await fetchTopCredits(id);
    setTopCast(cast);
    setTopCrew(crew);
    setLoading(false);
  };

  useEffect(() => {
    getTopCredits();
  }, []);

  if (loading) {
    return <PeopleSkeleton />;
  }
  return <People topCast={topCast} topCrew={topCrew} />;
};

export default ConnectedPeople;
