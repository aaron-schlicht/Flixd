import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../../constants";

interface AppHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader = ({ children, style }: AppHeaderProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.header,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    paddingBottom: 10,
    height: 45,
  },
});
