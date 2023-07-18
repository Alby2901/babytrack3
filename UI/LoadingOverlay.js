import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalConstant";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white"></ActivityIndicator>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    aligneItem: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
  },
});
