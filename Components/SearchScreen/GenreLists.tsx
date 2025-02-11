import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const BASE_URL = "/discover/movie";

interface GenreButton {
  url: string;
  name: string;
  backdrop: string;
}

const genres: GenreButton[] = [
  {
    url: `${BASE_URL}?with_genres=28`,
    name: "Action",
    backdrop: "/r17jFHAemzcWPPtoO0UxjIX0xas.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=35`,
    name: "Comedy",
    backdrop: "/sTgavNm82pTaZR9U2NQZ1J2FrJz.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=18`,
    name: "Drama",
    backdrop: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=27`,
    name: "Horror",
    backdrop: "/mmd1HnuvAzFc4iuVJcnBrhDNEKr.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=10749`,
    name: "Romance",
    backdrop: "/j0Ce4AsZi34NKYUZr61lh0PBQ7G.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=53`,
    name: "Thriller",
    backdrop: "/rbZvGN1A1QyZuoKzhCw8QPmf2q0.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=878`,
    name: "Science Fiction",
    backdrop: "/qr7dUqleMRd0VgollazbmyP9XjI.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=99`,
    name: "Documentary",
    backdrop: "/z2uuQasY4gQJ8VDAFki746JWeQJ.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=16`,
    name: "Animation",
    backdrop: "/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=12`,
    name: "Adventure",
    backdrop: "/ueDw7djPgKPZfph0vC43aD2EMyF.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=14`,
    name: "Fantasy",
    backdrop: "/5JrZAtyk3LwiiAWLW0kwz41XZJC.jpg",
  },
  {
    url: `${BASE_URL}?with_genres=9648`,
    name: "Mystery",
    backdrop: "/vlnSG1EQi0ez2A6MkFfjovPfkES.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=9672`,
    name: "Based on a True Story",
    backdrop: "/cq9N64ucEtfIc3eMxNr1VzY9LH9.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=10683`,
    name: "Coming of Age",
    backdrop: "/yjGllQUm28R4X9xD9T5xMszirgw.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=10051`,
    name: "Heist",
    backdrop: "/X7zKxmyrVmYCfcyvDgVLH8iNzA.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=12570`,
    name: "Whodunit",
    backdrop: "/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=9799`,
    name: "Romantic Comedy",
    backdrop: "/cdYj6HFpKp5NTmLiHHbNEGSmDT4.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=9715`,
    name: "Superhero",
    backdrop: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=15060`,
    name: "Period Piece",
    backdrop: "/sOJqNAx4RFrCRn8HS99LEc8aenI.jpg",
  },
  {
    url: `${BASE_URL}?with_keywords=5565`,
    name: "Biography",
    backdrop: "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
  },
];

const GenreLists = () => {
  const renderGenreItem = ({ item }: { item: GenreButton }) => (
    <TouchableOpacity
      style={styles.genreButton}
      onPress={() => {
        router.push({
          pathname: "/movies/[genre]",
          params: { name: item.name, url: item.url },
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={`https://image.tmdb.org/t/p/w500${item.backdrop}`}
          style={styles.backgroundImage}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        >
          <Text style={styles.genreText} numberOfLines={1} adjustsFontSizeToFit>
            {item.name}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={genres}
      renderItem={renderGenreItem}
      keyExtractor={(item) => item.url}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 200,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  genreButton: {
    width: "48%",
    height: 120, // Add fixed height
    borderRadius: 15,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    justifyContent: "flex-end",
    padding: 12,
    borderRadius: 8,
  },
  genreText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default GenreLists;
