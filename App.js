import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import AuthContentProvider, { AuthContext } from "./store/auth-context";
import { GlobalStyles } from "./UI/GlobalConstant";
import LoginScreen from "./screens/LoginScreen";
import InputScreen from "./screens/InputScreen";
import ScanScreen from "./screens/ScanScreen";
import ResultsScreen from "./screens/ResultsScreen";
import SettingAccess from "./screens/SettingAccess";
import StoreLocalScreen from "./screens/StoreLocalScreen";
import { getObjectFromStore, getAllKeys } from './store/StoreDataLocal';

const Stack = createNativeStackNavigator();
const titleApp = "Baby Track";
const appVersion = Constants.expoConfig.version;
// console.log("Versione app:", appVersion);


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.BG_Blue,
          height: 10, // <- aggiungi altezza fissa più bassa
        },
        headerTitleContainerStyle: {
          paddingBottom: 0,
          paddingTop: 0,
          marginBottom: 0,
          marginTop: 0,
        },
        headerTintColor: GlobalStyles.colors.Text_Main,
        headerTitleAlign: "left",
        headerTitle: () => (
          // <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <View style={{ flexDirection: "row", alignItems: "baseline", minHeight: 40 }}>
            <Text style={{ fontWeight: "bold", fontSize: 28, color: GlobalStyles.colors.Text_Main }}>
              {titleApp}
            </Text>
            <Text style={{ fontSize: 14, color: GlobalStyles.colors.Text_Main, marginLeft: 6 }}>
              v. {appVersion}
            </Text>
          </View>
        ),
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="SettingAccess" component={SettingAccess}></Stack.Screen>
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
      <Stack.Screen
        name='Settings'
        component={StoreLocalScreen}
        options={{
          headerLeft: () => { return (<></>); }
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.BG_Blue, },
        headerTintColor: GlobalStyles.colors.Text_Main,
        headerTitleAlign: "left",
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ fontWeight: "bold", fontSize: 28, color: GlobalStyles.colors.Text_Main }}>
              {titleApp}
            </Text>
            <Text style={{ fontSize: 14, color: GlobalStyles.colors.Text_Main, marginLeft: 6 }}>
              v. {appVersion}
            </Text>
          </View>
        ),
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{
            title: titleApp,
          }}
        />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          title: titleApp,
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
          name="ResultsScreen"
          component={ResultsScreen}
        // Options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  console.log("App NAVIGATION authCtx.isAuthenticated =>>", authCtx.isAuthenticated);
  console.log("APP NAVIGATION authCtx.sessionID =>>", authCtx.sessionID);
  console.log("APP NAVIGATION authCtx.urlsetted =>>", authCtx.urlsetted);
  console.log("APP NAVIGATION authCtx.sessionTimer =>>", authCtx.sessionTimer);
  console.log("APP NAVIGATION authCtx.key1 =>>", authCtx.key1);
  console.log("APP NAVIGATION authCtx.url =>>", authCtx.urlsetted);
  console.log("APP NAVIGATION authCtx.mode =>>", authCtx.mode);
  console.log("APP NAVIGATION authCtx.user =>>", authCtx.user);
  console.log("APP NAVIGATION authCtx.deviceid =>>", authCtx.deviceid);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {

  const authCtx = useContext(AuthContext);

  useEffect(() => {

    console.log('--------------- APP UseEffect START--------------------------------------');

    async function getKeysAtLoading() {

      console.log('--------------- APP UseEffect Async Function getKeyAtLoadind START--------------------------------------');

      const allKeys = await getAllKeys();

      // setKeyState(allKeys[0]);
      if (allKeys[0]) {

        authCtx.setKey1(allKeys[0]);

        const objGetted = await getObjectFromStore(allKeys[0])
        // setDataRed(existingValues => ({
        //   ...existingValues,
        //   mode_status: objGetted.mode_status,
        //   url_address: objGetted.url_address
        // }))

        // console.log('objGetted.url_address.toString(): ', objGetted.url_address.toString());
        // console.log('objGetted.mode_status: ', objGetted.mode_status);
        // console.log('TEST 2025: objGetted.deviceid_status: ', objGetted.deviceid_status);

        authCtx.readUrlSetted(objGetted.url_address.toString());
        authCtx.setMode(objGetted.mode_status ? objGetted.mode_status : 'Devel');
        authCtx.setdeviceID(objGetted.deviceid_status) //? objGetted.deviceid_status : '998');
        authCtx.setUser(objGetted.user_status);

        // setUrlState(objGetted.url_address.toString());
        // setModeState(objGetted.mode_status);

        // console.log('authCtx.UrlSetted: ', authCtx.urlsetted);

      } else {
        console.log('keysStored non setted: ');
      }
    }
    getKeysAtLoading();

    console.log('--------------- APP UseEffect THE END --------------------------------------');

  }, [])

  console.log('--------------- APP Function Root() just before "return <Navigation />" --------------------------------------');

  return <Navigation />

}

export default function App() {

  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#000000" translucent={false} />
        <AuthContentProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Root />
          </SafeAreaView>
        </AuthContentProvider>
      </SafeAreaProvider>
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
