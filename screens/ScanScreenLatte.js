import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AuthContext } from "../store/auth-context";

// function ScanQR() {
  function ScanScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [scanData, setScanData] = useState("");
  const [permission, setPermission] = useState(true);

  const datoScansionato = "Dato dallo schermo 2";

  const authCtx = useContext(AuthContext);

  function sendDataBack(data) {
    authCtx.readLatte(data);
    navigation.navigate('Input')
  }

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status, granted } =
        await BarCodeScanner.requestPermissionsAsync();
      // console.log(`Status: ${status}, granted: ${granted}`);

      if (status === "granted") {
        // console.log("access granted");
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      // console.log(error);
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.container}>
        <Text>requesting permision...</Text>
      </View>
    );

  // if (scanData) {
  //   Alert.alert("ScanData ok");
  //   return (
  //     <View style={styles.container2}>
  //       <Text>{scanData}</Text>
  //       <Button
  //         title="ScanAgain"
  //         onPress={() => setScanData(undefined)}
  //       ></Button>
  //     </View>
  //   );
  // }

  //   if (permission) {
  //     Alert.alert("Permission ok");
  //     return (
  //       <BarCodeScanner
  //         style={[styles.container1]}
  //         onBarCodeScanned={({ type, data }) => {
  //             Alert.alert("ScanData ok" + data);
  //             sendDataBack(data);

  if (permission) {
    // Alert.alert("Permission ok");
    return (
      <BarCodeScanner
        style={[styles.container1]}
        onBarCodeScanned={({ type, data }) => {
          // Alert.alert("ScanData ok" + data);
          sendDataBack(data);

          // try {
          //   console.log("Tipo dato: " + type);
          //   console.log("Dato: " + data);
          //   // let _data = JSON.parse(data);
          //   let _data = data;
          //   setScanData(_data);
          // } catch (error) {
          //   console.error("Unable to parse string: ", error);
          // }
        }}
      >
        {/* <Text style={styles.text}>Scan the QR code.</Text> */}
      </BarCodeScanner>
    );
  } else {
    return <Text style={styles.textError}>Permission rejected.</Text>;
  }
}

export default ScanScreen;

const styles = StyleSheet.create({
  button: {
    margin: 20,
    borderColor: "red",
    borderWidth: 1,
  },
  container1: {
    borderColor: "red",
    borderWidth: 3,
    borderStyle: "solid",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // height: 300,
    // width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    borderColor: "blue",
    borderWidth: 3,
    borderStyle: "solid",
    // flex: 1,
    // justifyContent: 'center',
    //alignItems: 'center',
    height: 300,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    backgroundColor: "black",
    color: "white",
  },
});