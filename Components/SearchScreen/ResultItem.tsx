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
import { useCallback } from "react";
import { H3 } from "../ui/Typography";
import {
  POSTER_WIDTH,
  SERVICE_ICON_SIZE,
  SERVICE_CONTAINER_WIDTH,
} from "./constants";
const SMALL_POSTER_BASE_PATH = "https://image.tmdb.org/t/p/w342/";

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
          style={{ width: POSTER_WIDTH, height: POSTER_WIDTH * 1.5 }}
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
        <ServiceIcon recyclingKey={item.title} service={service} />
      </ItemButton>
    </ResultItemContainer>
  );
};

const ServiceIcon = ({
  service,
  recyclingKey,
}: {
  service?: Service;
  recyclingKey: string;
}) => {
  const renderServiceIcon = useCallback(() => {
    if (service) {
      return (
        <Image
          style={{
            width: SERVICE_ICON_SIZE,
            height: SERVICE_ICON_SIZE,
            borderRadius: 5,
          }}
          source={{
            uri: SMALL_POSTER_BASE_PATH + service.logo_path,
          }}
          recyclingKey={recyclingKey}
          transition={200}
        />
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: Colors.secondary,
            width: SERVICE_ICON_SIZE,
            height: SERVICE_ICON_SIZE,
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          <H3 style={{ color: Colors.primary, textAlign: "center" }}>$</H3>
        </View>
      );
    }
  }, [service]);

  return (
    <View style={{ alignItems: "center", width: SERVICE_CONTAINER_WIDTH }}>
      {renderServiceIcon()}
    </View>
  );
};

export default ResultItem;
