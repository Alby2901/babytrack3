import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from "../store/auth-context";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

function ScanScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [scanRichiesto, setScanrichiesto] = useState('');
  const { scanElement } = route.params;

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
    setScanrichiesto(JSON.stringify(scanElement));
  }, [permission, scanElement]);

  console.log('SCAN_SCREEN - scanRichiestoState: ', scanRichiesto);

  const authCtx = useContext(AuthContext);

  const handleBarCodeScanned = ({ data }) => {
    console.log('SCAN_SCREEN - HandleBarCodeScanned');
    console.log('SCAN_SCREEN - HandleBarCodeScanned - scanRichiestoState: ', scanRichiesto);
    setScanned(true);
    // alert(`Codice QR scansionato: ${data}`);

    if (scanRichiesto == 1) {
      console.log(`SCAN_SCREEN - Case Neonato! => ${data}`);
      authCtx.readNeonato(data);
    } else if (scanRichiesto == 2) {
      console.log(`SCAN_SCREEN - Case Genitore! => ${data}`);
      authCtx.readGenitore(data);
    } else if (scanRichiesto == 3) {
      console.log(`SCAN_SCREEN - Case Latte! => $${data}`);
      authCtx.readLatte(data);
    } else {
      console.log(`SCAN_SCREEN - Non FUNZIONA:  => ${data}`);
    }

    // authCtx.readNeonato(data);
    navigation.navigate('Input')

  };

  if (!permission) {
    return <Text>Richiesta permessi...</Text>;
  }

  if (!permission.granted) {
    return <Text>Accesso alla fotocamera negato</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        // barcodeScannerSettings={{barcodeTypes: ['qr'],}}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        enableTorch={torchOn ? true : false}
      />

      {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Scansiona di nuovo</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.torchButton} onPress={() => setTorchOn(!torchOn)}>
        <Ionicons name={torchOn ? 'flash-off' : 'flash'} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  scanButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  torchButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 50,
  },
});
