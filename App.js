import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import InputScreen from "./screens/InputScreen";
import ScanScreen from "./screens/ScanScreen";
import ScanScreenNeonato from "./screens/ScanScreenNeonato";
import ScanScreenGenitore from "./screens/ScanScreenGenitore";
import ScanScreenLatte from "./screens/ScanScreenLatte";
import AuthContentProvider, { AuthContext } from "./store/auth-context";

// export default function App() {

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Input" component={InputScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="ScanNeo" component={ScanScreenNeonato} />
      <Stack.Screen name="ScanGen" component={ScanScreenGenitore} />
      <Stack.Screen name="ScanLat" component={ScanScreenLatte} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  console.log("App 1 =>>", authCtx.isAuthenticated);
  console.log("APP 2 =>>", authCtx.sessionID);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContentProvider>
        <Navigation />
      </AuthContentProvider>
    </>
  );
}

//   return (
//     <>
//       <AuthContentProvider>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Input" component={InputScreen} />
//             <Stack.Screen name="Scan" component={ScanScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </AuthContentProvider>
//       <StatusBar style="auto"></StatusBar>
//     </>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
