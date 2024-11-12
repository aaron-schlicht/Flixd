import { View, TouchableOpacity, Text } from "react-native";
import { Movie, Service } from "../../../types";
import { Image } from "expo-image";
import { Colors, imageBasePath } from "../../../constants";
import {
  CarouselImage,
  CarouselItemContainer,
  Gradient,
  MovieTitle,
  ServiceImageView,
} from "./styles";

const CarouselItem = ({
  onPress,
  movie,
  service,
}: {
  onPress: () => void;
  movie: Movie;
  service: Service | undefined;
}) => {
  return (
    <CarouselItemContainer>
      <TouchableOpacity onPress={onPress}>
        <Gradient
          colors={[
            "rgba(21, 24, 45, 0)",
            "rgba(21, 24, 45, 0.2)",
            "rgba(21, 24, 45, 0.8)",
          ]}
        />
        <MovieTitle numberOfLines={2} adjustsFontSizeToFit>
          {movie.title}
        </MovieTitle>
        <CarouselImage
          source={{ uri: imageBasePath + movie.backdrop_path }}
          recyclingKey={movie.title}
          contentFit="cover"
          transition={500}
        />
        <ServiceImageView>
          {!!service && (
            <View>
              {service.isRental ? (
                <View
                  style={{
                    backgroundColor: Colors.secondary,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: Colors.primary }}>RENTAL</Text>
                </View>
              ) : (
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: imageBasePath + service.logo_path,
                  }}
                  recyclingKey={movie.title}
                  transition={200}
                />
              )}
            </View>
          )}
        </ServiceImageView>
      </TouchableOpacity>
    </CarouselItemContainer>
  );
};

export default CarouselItem;
