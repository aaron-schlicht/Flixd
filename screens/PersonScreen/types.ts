import { ViewStyle } from "react-native";
import { AnimatedStyleProp } from "react-native-reanimated";
import { Movie, PersonDetails } from "../../types";

export interface Credit {
  name: string;
  movies: Movie[];
}

export interface AnimatedHeaderProps {
  person: PersonDetails | null;
  headerOpacity: AnimatedStyleProp<ViewStyle>;
}
