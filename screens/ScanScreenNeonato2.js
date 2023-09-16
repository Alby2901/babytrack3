import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import { Camera } from 'expo-camera';
import { BarCodeScanner } from "expo-barcode-scanner";

// function ScanQR() {
function ScanScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(true);

  // const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashlight, setFlashlight] = useState(Camera.Constants.FlashMode.off);
  const [scanRichiesto, setScanrichiesto] = useState('');

  const { scanElement } = route.params;
  console.log('SCAN_SCREEN - Parametro 1 ricevuto: ', JSON.stringify(scanElement));

  useEffect(() => {
    setScanrichiesto(JSON.stringify(scanElement));
  }, [scanElement]);

  console.log('SCAN_SCREEN - scanRichiestoState: ', scanRichiesto);

  const authCtx = useContext(AuthContext);

  const toggleFlashlight = () => {
    setFlashlight(
      flashlight === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  // function sendDataBack(data) {
  //   // authCtx.readNeonato(data);
  //   navigation.navigate('Input')
  // }

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('SCAN_SCREEN - HandleBarCodeScanned');
    console.log('SCAN_SCREEN - HandleBarCodeScanned - scanRichiestoState: ', scanRichiesto);
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    if (scanRichiesto == 1) {
      console.log('SCAN_SCREEN - Case Neonato!');
      authCtx.readNeonato(data);
    } else if (scanRichiesto == 2) {
      console.log('SCAN_SCREEN - Case Genitore!');
      authCtx.readGenitore(data);
    } else if (scanRichiesto == 3) {
      console.log('SCAN_SCREEN - Case Latte!');
      authCtx.readLatte(data);
    } else {
      console.log('SCAN_SCREEN - Non FUNZIONA: ');
    }

    // authCtx.readNeonato(data);
    navigation.navigate('Input')
  };

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

  if (permission) {
    // Alert.alert("Permission ok");

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          flashMode={flashlight}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused}>
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerLeft} />
          </View>
          <View style={styles.layerBottom} />
        </Camera>
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
          />
        )}
        <View>
          <Button
            title={'Attiva/Disattiva Torcia'}
            onPress={toggleFlashlight}
            style={styles.flashlightButton}
          />
        </View>

      </View>
    );

  } else {
    return <Text style={styles.textError}>Permission rejected.</Text>;
  }
}

export default ScanScreen;

const opacity = 'rgba(0, 0, 0, .4)';
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
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
  flashlightButton: {
    marginTop: 20,
  },
});
