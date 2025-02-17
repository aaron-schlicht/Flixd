import { View, TouchableOpacity, Dimensions } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../../constants";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Flex } from "../../../components/ui/Layouts";
import { TopServiceLogos } from "./TopServiceLogos";
import { Service } from "../../../types";

const { width } = Dimensions.get("screen");

interface HeaderActionsProps {
  selectedServices: Service[];
  onServicePress: () => void;
}

export const HeaderActions = ({
  selectedServices,
  onServicePress,
}: HeaderActionsProps) => {
  return (
    <Flex
      style={{
        paddingBottom: 10,
        height: 45,
        justifyContent: "space-between",
      }}
    >
      <Flex
        style={{
          width: width * 0.7,
          justifyContent: "flex-start",
          gap: 10,
          height: 35,
          paddingLeft: 15,
        }}
      >
        <Link href="/modal/sort" asChild>
          <TouchableOpacity
            style={{
              padding: 5,
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              borderColor: Colors.secondary,
              backgroundColor: Colors.secondary,
              borderWidth: 1,
              borderRadius: 30,
              gap: 5,
            }}
          >
            <Octicons name="sort-desc" color={Colors.primary} size={20} />
          </TouchableOpacity>
        </Link>
        <Link href="/modal/filter" asChild>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 5,
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 30,
              borderColor: Colors.primary,
              borderWidth: 1,
              gap: 5,
            }}
          >
            <Ionicons name="options" color={Colors.background} size={20} />
          </TouchableOpacity>
        </Link>
      </Flex>
      <Flex
        style={{
          width: width * 0.3,
          justifyContent: "flex-end",
          gap: 8,
          paddingRight: 15,
        }}
      >
        <TouchableOpacity onPress={onServicePress}>
          <TopServiceLogos selectedServices={selectedServices} />
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};
