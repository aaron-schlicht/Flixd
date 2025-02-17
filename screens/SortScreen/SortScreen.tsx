import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants";
import { H2 } from "../../components/ui/Typography";
import { Background } from "../../components/ui/Layouts";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { updateSort } from "../../redux/flowSlice";
import { RootState } from "../../redux/store";
import * as Haptics from "expo-haptics";
import { styles } from "./styles";

const sortOptions = [
  {
    title: "Popularity",
    options: [
      { label: "Most Popular", value: "popularity.desc" },
      { label: "Least Popular", value: "popularity.asc" },
    ],
  },
  {
    title: "Release Date",
    options: [
      { label: "Newest", value: "release_date.desc" },
      { label: "Oldest", value: "release_date.asc" },
    ],
  },
  {
    title: "Rating",
    options: [
      { label: "Highest Rated", value: "vote_average.desc" },
      { label: "Lowest Rated", value: "vote_average.asc" },
    ],
  },
  {
    title: "Earnings",
    options: [
      { label: "Highest Earning", value: "revenue.desc" },
      { label: "Lowest Earning", value: "revenue.asc" },
    ],
  },
  {
    title: "Alphabetical Order",
    options: [
      { label: "A-Z", value: "title.asc" },
      { label: "Z-A", value: "title.desc" },
    ],
  },
];

const SortScreen = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector((state: RootState) => state.flow.sortBy);

  const handleSort = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateSort(value));
    router.back();
  };

  // Update button style to show selected state
  const getButtonStyle = (value: string) => ({
    ...styles.button,
    backgroundColor: currentSort === value ? Colors.primary : Colors.secondary,
  });

  const getButtonTextStyle = (value: string) => ({
    ...styles.buttonText,
    color: currentSort === value ? Colors.secondary : Colors.primary,
  });

  return (
    <Background>
      <SafeAreaView style={{ backgroundColor: Colors.header }}>
        <View style={styles.header}>
          <H2 style={styles.title}>Sort By</H2>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {sortOptions.map((group, index) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.buttonContainer}>
              {group.options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={getButtonStyle(option.value)}
                  onPress={() => handleSort(option.value)}
                >
                  <Text style={getButtonTextStyle(option.value)}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </Background>
  );
};

export default SortScreen;
