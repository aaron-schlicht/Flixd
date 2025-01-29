import { useLocalSearchParams } from "expo-router";
import MovieScreen from "../../screens/MovieScreen";

export default function Movie() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <MovieScreen id={id} />;
}
