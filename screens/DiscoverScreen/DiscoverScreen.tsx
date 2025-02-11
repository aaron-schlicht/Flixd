import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
} from "react-native";
import { Colors, imageBasePath, MainProviders } from "../../constants";
import { Link, useRouter } from "expo-router"; // Added useRouter
import useFilteredMovies from "../../hooks/useFilteredMovies";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Background, Flex } from "../../components/ui/Layouts";
const { height, width } = Dimensions.get("screen");
const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w342/";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { Movie, Service } from "../../types";
import Animated, {
  withRepeat,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  FadeIn,
} from "react-native-reanimated";
import Octicons from "@expo/vector-icons/Octicons";
import ServicesFilter from "../../components/ui/ServicesFilter";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as Haptics from "expo-haptics";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient"; // Added LinearGradient

const ITEM_WIDTH = Dimensions.get("window").width * 0.3;
const ITEM_SPACING = 10;

const TopServiceLogos = ({
  selectedServices,
}: {
  selectedServices: Service[];
}) => {
  const isSelected = useSelector(
    (state: RootState) => state.flow.useStreamingServices
  );
  const firstThreeProviders =
    selectedServices.length > 0
      ? selectedServices.slice(0, 3)
      : MainProviders.slice(0, 3);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isSelected ? Colors.primary : Colors.secondary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 35,
        borderWidth: 1,
        borderColor: isSelected ? Colors.primary : "#696969",
      }}
    >
      {firstThreeProviders.map((provider, index) => (
        <Image
          key={provider.provider_id}
          source={{ uri: imageBasePath + provider.logo_path }}
          style={{
            width: 25,
            height: 25,
            zIndex: -index,
            marginLeft: index === 0 ? 0 : -12,
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
};

const SkeletonMovieGrid = () => {
  const shimmerAnimation = useSharedValue(0);

  useEffect(() => {
    shimmerAnimation.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: shimmerAnimation.value * 0.5 + 0.3,
  }));

  const renderSkeletonItem = () => (
    <Animated.View
      style={[
        {
          width: ITEM_WIDTH,
          height: ITEM_WIDTH * 1.5,
          backgroundColor: "#2A2E43",
          borderRadius: 10,
          marginHorizontal: ITEM_SPACING / 2,
          marginVertical: ITEM_SPACING / 2,
        },
        animatedStyle,
      ]}
    />
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlashList
        data={Array(12).fill(null)}
        numColumns={3}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={{ flex: 1, alignItems: "center" }}>
            {renderSkeletonItem()}
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const ListFooterSpinner = () => (
  <View
    style={{
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <Animated.View
      entering={FadeIn}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <ActivityIndicator color={Colors.primary} />
      <Text style={{ color: Colors.primary }}>Loading more...</Text>
    </Animated.View>
  </View>
);

const EmptyListComponent = () => (
  <View
    style={{
      flex: 1,
      height: 400,
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
    }}
  >
    <Ionicons name="film-outline" size={80} color={Colors.primary} />
    <Text
      style={{
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 24,
        textAlign: "center",
      }}
    >
      No movies found{"\n"}Try adjusting your filters
    </Text>
  </View>
);

const DiscoverScreen = () => {
  const {
    movies,
    loading,
    loadingMore,
    fetchMoreMovies,
    getRandomMovie,
    showScrollTop,
    setShowScrollTop,
  } = useFilteredMovies();
  const listRef = useRef<FlashList<Movie>>(null);
  const router = useRouter(); // Added useRouter
  const [filterVisible, setFilterVisible] = useState(false);
  const filterHeight = useSharedValue(0);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );

  useEffect(() => {
    filterHeight.value = withTiming(filterVisible ? 135 : 0, {
      duration: 300,
    });
  }, [filterVisible]);

  const animatedFilterStyle = useAnimatedStyle(() => ({
    height: filterHeight.value,
    overflow: "hidden",
  }));

  const handleServicePress = () => {
    if (selectedServices.length > 0) {
      toggleFilter();
    } else {
      router.push("/modal/services");
    }
  };

  const toggleFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowScrollTop(scrollPosition > height * 0.3); // Show button after scrolling 30% of screen height
  };

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleRandomMovie = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const randomMovie = await getRandomMovie();
    if (randomMovie) {
      router.push(`/modal/movie?id=${randomMovie.id}`);
    }
  };

  return (
    <Background>
      <SafeAreaView
        style={{
          backgroundColor: "#11142A",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Flex
          style={{
            marginTop: -5,
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
            <Link href={"/modal/sort"} asChild>
              <TouchableOpacity
                style={{
                  padding: 5,
                  paddingHorizontal: 15,
                  display: "flex",
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
            <Link href={"/modal/filter"} asChild>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  padding: 5,
                  paddingHorizontal: 15,
                  display: "flex",
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
              paddingRight: 10,
            }}
          >
            <TouchableOpacity onPress={handleServicePress}>
              <TopServiceLogos selectedServices={selectedServices} />
            </TouchableOpacity>
          </Flex>
        </Flex>
      </SafeAreaView>
      <Animated.View style={[{ zIndex: 10 }, animatedFilterStyle]}>
        <ServicesFilter />
      </Animated.View>
      <View style={{ height: "100%", width: width }}>
        {loading ? (
          <SkeletonMovieGrid />
        ) : (
          <FlashList
            ref={listRef}
            data={movies}
            numColumns={3}
            estimatedItemSize={ITEM_WIDTH * 1.5}
            showsVerticalScrollIndicator={false}
            getItemType={(item) => item.id}
            onEndReached={fetchMoreMovies}
            onEndReachedThreshold={0.8}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ListEmptyComponent={EmptyListComponent}
            ListFooterComponent={() =>
              loadingMore ? <ListFooterSpinner /> : null
            }
            renderItem={({ item }) => (
              <Link href={`/modal/movie?id=${item.id}`} asChild>
                <TouchableOpacity
                  style={{
                    width: ITEM_WIDTH,
                    marginHorizontal: ITEM_SPACING / 2,
                    marginVertical: ITEM_SPACING / 2,
                    alignItems: "center",
                  }}
                >
                  <Image
                    recyclingKey={item.id.toString()}
                    source={{
                      uri: SMALL_POSTER_BASE_PATH + item.poster_path,
                    }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_WIDTH * 1.5,
                      borderRadius: 10,
                    }}
                    transition={500}
                  />
                </TouchableOpacity>
              </Link>
            )}
            keyExtractor={(item, index) => `${index}-${item.id.toString()}`}
            contentContainerStyle={{
              paddingHorizontal: ITEM_SPACING / 2,
              paddingBottom: 300,
            }}
          />
        )}
      </View>

      {showScrollTop && (
        <TouchableOpacity
          onPress={scrollToTop}
          style={{
            position: "absolute",
            bottom: height * 0.14,
            zIndex: 20,
            left: 20,
            padding: 10,
            borderRadius: 30,
            backgroundColor: Colors.secondary,
            shadowOpacity: 1,
            shadowRadius: 3.84,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
          }}
        >
          <Ionicons name="arrow-up" color={Colors.primary} size={35} />
        </TouchableOpacity>
      )}
      {movies.length > 0 && (
        <TouchableOpacity
          onPress={handleRandomMovie}
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            bottom: height * 0.14,
            zIndex: 20,
            right: 20,
            shadowOpacity: 1,
            shadowRadius: 3.84,
            shadowColor: Colors.background,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
          }}
        >
          <LinearGradient
            colors={["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 15,
              borderRadius: 30,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <FontAwesome5 name="dice" size={20} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Random
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </Background>
  );
};

export default DiscoverScreen;
