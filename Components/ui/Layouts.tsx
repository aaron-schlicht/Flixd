import { View } from "react-native";
import styled from "styled-components";
import { Colors } from "../../constants";

export const Background = styled(View)`
  background-color: ${Colors.background};
  flex: 1;
`;

export const Center = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Flex = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
