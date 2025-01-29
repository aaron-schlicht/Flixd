import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Colors } from "../../constants";
import { Link } from "expo-router";
import useFilteredMovies from "../../hooks/useFilteredMovies";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Background, Center, Flex } from "../../components/ui/Layouts";
import { H2 } from "../../components/ui/Typography";
const { height, width } = Dimensions.get("screen");
const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w342/";

const DiscoverScreen = () => {
  const { movies, loading } = useFilteredMovies();

  if (loading) {
    return (
      <Background>
        <SafeAreaView />
        <Center style={{ flex: 1 }}>
          <H2>Loading...</H2>
        </Center>
      </Background>
    );
  }

  return (
    <Background>
      <SafeAreaView />
      <Flex style={{ justifyContent: "center", padding: 10 }}>
        <Link href={"/modal/filter"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <H2>Filter</H2>
          </TouchableOpacity>
        </Link>
      </Flex>
      <View style={{ height: "100%", width: width }}>
        <FlashList
          data={movies}
          numColumns={3}
          estimatedItemSize={150}
          showsVerticalScrollIndicator={false}
          getItemType={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/modal/movie?id=${item.id}`} asChild>
              <TouchableOpacity style={{ flex: 1, margin: 5 }}>
                <Image
                  recyclingKey={item.id.toString()}
                  source={{
                    uri: SMALL_POSTER_BASE_PATH + item.poster_path,
                  }}
                  style={{ width: 100, height: 150, borderRadius: 10 }}
                  transition={500}
                />
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 5, paddingBottom: 300 }}
        />
      </View>
    </Background>
  );
};

export default DiscoverScreen;
