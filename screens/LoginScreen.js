import { Text, View, StyleSheet, Button } from "react-native";

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the Login Screen</Text>
      <Button title='Input Screen' onPress={() => navigation.navigate('Input')} />
      <Button title='Scan Screen' onPress={() => navigation.navigate('Scan')} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
