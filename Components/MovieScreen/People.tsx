import { View, Text, ScrollView } from "react-native";
import { CastMember, CrewMember, imageBasePath } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

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
    <View style={{ width: 110, alignItems: "center" }}>
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
            backgroundColor: "#252942",
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
            <Ionicons name="person" color="#A3BBD3" size={80} />
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
          style={{ color: "#A3BBD3", textAlign: "center", fontSize: 10 }}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          "{character}"
        </Text>
      ) : null}
    </View>
  );
};

export default People;
