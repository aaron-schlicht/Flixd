import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Colors } from "../../constants";
import { Image } from "expo-image";
import { Skeleton } from "@rneui/themed";
const { width } = Dimensions.get("screen");

export const ResultItemContainer = styled.View`
  width: ${width * 0.97}px;
  align-self: center;
  padding: 5px;
  border-bottom-color: ${Colors.secondary};
  border-bottom-width: 1px;
`;

export const ItemButton = styled.TouchableOpacity`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const PosterImage = styled(Image)`
  width: 50px;
  height: 75px;
  border-radius: 10px;
`;

export const TextBox = styled.View`
  width: ${width * 0.6}px;
`;

export const Title = styled.Text`
  color: ${Colors.primary};
  font-size: 16px;
  font-weight: bold;
`;

export const SkeletonLayout = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const SkeletonBox = styled(Skeleton)`
  background-color: #373d63;
  border-radius: 10px;
`;
