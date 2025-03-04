import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Colors } from "../../constants";
import { Image } from "expo-image";
import { Skeleton } from "@rneui/themed";
import { TEXT_BOX_WIDTH } from "./constants";
const { width } = Dimensions.get("screen");
const POSTER_WIDTH = width * 0.15;

export const ResultItemContainer = styled.View`
  width: ${width * 0.97}px;
  align-self: center;
  padding: 5px;
  border-bottom-color: ${Colors.secondary};
  border-bottom-width: 1px;
  padding-vertical: 10px;
`;

export const ItemButton = styled.TouchableOpacity`
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const PosterImage = styled(Image)`
  width: ${POSTER_WIDTH}px;
  height: ${POSTER_WIDTH * 1.5}px;
  border-radius: 10px;
`;

export const TextBox = styled.View`
  width: ${TEXT_BOX_WIDTH}px;
  padding-horizontal: 10px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${Colors.primary};
  font-size: 16px;
  font-weight: bold;
`;

export const SkeletonLayout = styled.View`
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const SkeletonBox = styled(Skeleton)`
  background-color: #373d63;
  border-radius: 10px;
`;
