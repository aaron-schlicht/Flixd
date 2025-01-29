import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
const { width } = Dimensions.get("screen");

export const Title = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 800;
`;

export const CarouselView = styled.View`
  min-height: 400px;
  height: 400px;
`;

export const CarouselItemContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Gradient = styled(LinearGradient)`
  z-index: 2;
  position: absolute;
`;

export const MovieTitle = styled.Text`
  color: white;
  width: ${width * 0.7}px;
  font-size: 25px;
  font-weight: bold;
  z-index: 3;
`;

export const CarouselImage = styled(Image)`
  height: 500px;
  min-height: 500px;
`;

export const ServiceImageView = styled.View`
  position: absolute;
  right: 15px;
  z-index: 3;
  bottom: 30px;
`;
