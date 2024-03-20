import { View, Text, FlatList, Dimensions, SafeAreaView } from "react-native";
import RecsIcon from "./RecsIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Colors, Genres } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;
const SummaryStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const providers = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const filters = useSelector((state: RootState) => state.flow.filters);

  const dispatch = useDispatch();
  const navigation = useNavigation<recsScreenProp>();

  const genreText = () => {
    switch (genres.length) {
      case 1:
        return Genres[genres[0]].name;
      case 2:
        return Genres[genres[0]].name + " & " + Genres[genres[1]].name;
      case 3:
        return (
          Genres[genres[0]].name +
          ", " +
          Genres[genres[1]].name +
          ", & " +
          Genres[genres[2]].name
        );
      default:
        return "";
    }
  };

  const getKeywordText = () => {
    if (!keywords.length) return "";
    if (keywords.length === 1) {
      return (
        keywords[0].name.charAt(0).toUpperCase() + keywords[0].name.slice(1)
      );
    } else {
      let str = "";
      keywords.map((keyword, index) => {
        str += keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1);
        if (index !== keywords.length - 1) {
          str += ", ";
        }
      });
      return str;
    }
  };

  const getProvidersText = () => {
    if (providers.length === 0) return "";
    if (providers.length === 1) {
      return providers[0].name;
    } else {
      let str = "";
      providers.map((provider, index) => {
        str += provider.name;
        if (index !== providers.length - 1) {
          str += ", ";
        }
      });
      return str;
    }
  };

  const getReleaseDate = () => {
    if (filters["year"]) {
      const { min, max } = filters["year"];
      return `${min + 1890} - ${max + 1890}`;
    } else {
      return "";
    }
  };

  const getRatingDescriptor = () => {
    if (filters["rating"]) {
      const { min, max } = filters["rating"];
      if (max === 10.0) {
        return "rated higher than ";
      } else if (min === 0.0) {
        return "rated lower than ";
      } else {
        return "rated between ";
      }
    }
    return "with ";
  };

  const getRating = () => {
    if (filters["rating"]) {
      const { min, max } = filters["rating"];
      if (max === 10.0) {
        return `${min / 10}/10`;
      } else if (min === 0.0) {
        return `${max / 10}/10`;
      } else {
        return `${min / 10}/10 - ${max / 10}/10`;
      }
    }
    return "";
  };

  const data = [
    {
      descriptor: "with ",
      text: genreText().length ? "genres " + genreText() : "any genre",
      step: 0,
    },
    {
      descriptor: "and ",
      text: getKeywordText().length
        ? "keywords " + getKeywordText()
        : "any keywords",
      step: 1,
    },
    {
      descriptor: "on ",
      text: getProvidersText().length
        ? getProvidersText()
        : "any streaming services",
      step: 2,
    },
    {
      descriptor: "released ",
      text: getReleaseDate().length
        ? "between " + getReleaseDate()
        : "any year",
      step: 3,
    },
    {
      descriptor: getRatingDescriptor(),
      text: getRating().length ? getRating() : "any rating",
      step: 3,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#15182D" }}>
      <SafeAreaView />
      <View style={{ flex: 1, padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            paddingTop: 20,
            alignItems: "center",
          }}
        >
          <RecsIcon width={30} height={30} viewBox="0 0 75 75" />
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Great choices!
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            paddingTop: 60,
            fontWeight: "bold",
          }}
        >
          Finding you movies
        </Text>
        <FlatList
          data={data}
          contentContainerStyle={{ gap: 10, paddingVertical: 20 }}
          renderItem={({ item }) => {
            return <DescriptorView {...item} />;
          }}
        />
      </View>
    </View>
  );
};

const DescriptorView = ({
  descriptor,
  text,
}: {
  descriptor: string;
  text: string;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        width: Dimensions.get("window").width * 0.85,
      }}
    >
      <Text style={{ color: "white", fontSize: 20 }}>{descriptor}</Text>
      <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: "500" }}>
        {text}
      </Text>
    </View>
  );
};

export default SummaryStep;
