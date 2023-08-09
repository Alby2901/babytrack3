import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Button, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import InputScreen from "./screens/InputScreen";
import ScanScreen from "./screens/ScanScreen";
import ScanScreenNeonato from "./screens/ScanScreenNeonato";
import ScanScreenGenitore from "./screens/ScanScreenGenitore";
import ScanScreenLatte from "./screens/ScanScreenLatte";
import ModalScreenOK from "./screens/ModalScreenOK";
import ModalScreenKO from "./screens/ModalScreenKO";
import AuthContentProvider, { AuthContext } from "./store/auth-context";
import { GlobalStyles } from "./UI/GlobalConstant";
import ResultScreen from "./screens/ResultScreen";
import IconButton from './UI/IconButton';
import StoreLocalScreen from "./screens/StoreLocalScreen";

// export default function App() {

export default function App() {
  const Stack = createNativeStackNavigator();

  function AuthStack() {


    return (
      <Stack.Navigator
        screenOptions={{
          title: "Baby Track",
          headerStyle: { backgroundColor: GlobalStyles.colors.BG_Blue, },
          headerTintColor: GlobalStyles.colors.Text_Main,
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold", fontSize: 30, },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen}/>
        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
        <Stack.Screen name='Settings' component={StoreLocalScreen}></Stack.Screen>
      </Stack.Navigator>
    );
  }

  function AuthenticatedStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          title: "Baby Track 2023",
          headerStyle: {
            backgroundColor: GlobalStyles.colors.BG_Blue,
          },
          headerTintColor: GlobalStyles.colors.Text_Main,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name="Input"
            component={InputScreen}
            options={{
              title: "Baby Track 2023",
            }}
          />
          <Stack.Screen name="ResultOk" component={ResultScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="ScanNeo" component={ScanScreenNeonato} />
          <Stack.Screen name="ScanGen" component={ScanScreenGenitore} />
          <Stack.Screen name="ScanLat" component={ScanScreenLatte} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            title: "Baby Track 2023",
            presentation: "modal",
            backgroundColor: 'red',
            // headerShown: false,
            headerStyle: {
              backgroundColor: GlobalStyles.colors.BG_Blue,
            },
            headerTintColor: GlobalStyles.colors.Text_Main,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
            },
          }}
        >
          <Stack.Screen
            name="ModalScrOK"
            component={ModalScreenOK}
          // Options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModalScrKO"
            component={ModalScreenKO}
          // Options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  function Navigation() {
    const authCtx = useContext(AuthContext);

    console.log("App authCtx.isAuthenticated =>>", authCtx.isAuthenticated);
    console.log("APP authCtx.sessionID =>>", authCtx.sessionID);
    console.log("APP authCtx.urlsetted =>>", authCtx.urlsetted);
    console.log("APP authCtx.sessionTimer =>>", authCtx.sessionTimer);

    return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <AuthContentProvider>
        <Navigation />
      </AuthContentProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
