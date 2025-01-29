import { useLocalSearchParams } from "expo-router";
import PersonScreen from "../../screens/PersonScreen";

export default function Person() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PersonScreen id={id} />;
}
