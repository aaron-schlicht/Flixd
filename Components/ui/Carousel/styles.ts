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
  min-height: 200px;
  height: 200px;
  flex-direction: row;
`;

export const CarouselItemContainer = styled.View`
  width: ${width * 0.8}px;
  justify-content: center;
  align-items: center;
`;

export const Gradient = styled(LinearGradient)`
  z-index: 2;
  width: ${width * 0.75}px;
  height: 200px;
  border-radius: 20px;
  position: absolute;
`;

export const MovieTitle = styled.Text`
  color: white;
  position: absolute;
  bottom: 0px;
  left: ${width * 0.06}px;
  width: ${width * 0.45}px;
  font-size: 25px;
  font-weight: bold;
  z-index: 3;
`;

export const CarouselImage = styled(Image)`
  width: ${width * 0.75}px;
  height: 200px;
  min-height: 200px;
  border-radius: 20px;
`;

export const ServiceImageView = styled.View`
  position: absolute;
  right: 15px;
  z-index: 3;
  bottom: 5px;
`;
