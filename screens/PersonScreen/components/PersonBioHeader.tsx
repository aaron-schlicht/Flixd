import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { imageBasePath, Colors } from "../../../constants";
import { PersonDetails } from "../../../redux/apiSlice";

export const HEADER_HEIGHT = 140;
export const PROFILE_IMAGE_SIZE = 100;

interface PersonBioHeaderProps {
  person: PersonDetails;
}

export const PersonBioHeader = ({ person }: PersonBioHeaderProps) => (
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
      {!!person?.profile_path ? (
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
    <View style={{ flex: 1, justifyContent: "center", gap: 5 }}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "600",
        }}
        numberOfLines={2}
      >
        {person.name}
      </Text>
      {!!person?.place_of_birth && (
        <Text style={{ color: "white", fontSize: 14 }}>
          Born in {person.place_of_birth}
        </Text>
      )}
      {!!person?.known_for_department && (
        <Text style={{ color: Colors.primary, fontSize: 14 }} numberOfLines={1}>
          Known for {person.known_for_department}
        </Text>
      )}
    </View>
  </View>
);
