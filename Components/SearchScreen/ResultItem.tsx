import { View, Text } from "react-native";
import { Movie, Service } from "../../types";
import { Image } from "expo-image";
import {
  Colors,
  getRatingColor,
  imageBasePath,
  MEDIUM_POSTER_BASE_URL,
} from "../../constants";
import {
  ItemButton,
  PosterImage,
  ResultItemContainer,
  TextBox,
  Title,
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

const ResultItem = ({
  item,
  service,
  handlePosterPress,
}: {
  item: Movie;
  service: Service | undefined;
  handlePosterPress: () => void;
}) => {
  if (!item.poster_path) return null;
  return (
    <ResultItemContainer>
      <ItemButton onPress={handlePosterPress}>
        <PosterImage
          source={{
            uri: MEDIUM_POSTER_BASE_URL + item.poster_path,
          }}
          recyclingKey={item.title}
        />
        <TextBox>
          <Title minimumFontScale={0.7} numberOfLines={3} adjustsFontSizeToFit>
            {item.title}{" "}
            {item.release_date
              ? `(${new Date(item.release_date).getFullYear()})`
              : ""}
          </Title>
          {item.vote_average === 0.0 ? null : (
            <Text
              style={{
                color: getRatingColor(item.vote_average),
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {item.vote_average.toFixed(2)}
            </Text>
          )}
        </TextBox>
        {service && (
          <View style={{ alignItems: "center", width: 60 }}>
            {service.isRental ? (
              <View
                style={{
                  backgroundColor: Colors.secondary,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  width: 35,
                  height: 35,
                }}
              >
                <Ionicons name="logo-usd" color={Colors.primary} size={20} />
              </View>
            ) : (
              <Image
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                }}
                source={{
                  uri: imageBasePath + service.logo_path,
                }}
                recyclingKey={item.title}
                transition={200}
              />
            )}
          </View>
        )}
      </ItemButton>
    </ResultItemContainer>
  );
};

export default ResultItem;
