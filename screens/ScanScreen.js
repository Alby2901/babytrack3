import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { AuthContext } from "../store/auth-context";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function ScanScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [scanRichiesto, setScanrichiesto] = useState('');
  const scanAnim = useState(new Animated.Value(0))[0];
  const { scanElement } = route.params;

  // Costanti per leggere la dimensione dello schermo e impostare
  // il riquadro sempre poco sopra il centro
  //
  // legge le dimensioni dello schermo
  const { width, height } = Dimensions.get('window');
  // una Insetss per verificare meglio lo spazio disponibile
  const insets = useSafeAreaInsets();
  // spostamento verticare del riquadro
  const verticalOffset = -100; // negativo = più in alto
  // Definisce un riquadro che occupa il 60% della larghezza
  const scanBoxSize = width * 0.6;
  // Definisce l'angolo in alto a sinistra del riquadro
  const scanBoxTop = (height - scanBoxSize) / 2 + verticalOffset;
  const scanBoxLeft = (width - scanBoxSize) / 2;


  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
    setScanrichiesto(JSON.stringify(scanElement));
  }, [permission, scanElement]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  console.log('SCAN_SCREEN - scanRichiestoState: ', scanRichiesto);

  const authCtx = useContext(AuthContext);

  const handleBarCodeScanned = ({ data }) => {
    console.log('SCAN_SCREEN - HandleBarCodeScanned');
    console.log('SCAN_SCREEN - HandleBarCodeScanned - scanRichiestoState: ', scanRichiesto);
    setScanned(true);
  

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
        autofocus='on'
      />

      {/* Testo sopra al riquadro */}
      <Text style={[styles.guideText, { top: scanBoxTop - 40 }]}>
        Inquadra il QR Code nel riquadro
      </Text>

      {/* Maschera scura intorno al riquadro */}
      <View style={StyleSheet.absoluteFill}>
        {/* Maschera sopra */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: scanBoxTop, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        {/* Maschera sotto */}
        <View style={{ position: 'absolute', top: scanBoxTop + scanBoxSize, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        {/* Maschera a sinistra */}
        <View style={{ position: 'absolute', top: scanBoxTop, left: 0, width: scanBoxLeft, height: scanBoxSize, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        {/* Maschera a destra */}
        <View style={{ position: 'absolute', top: scanBoxTop, right: 0, width: scanBoxLeft, height: scanBoxSize, backgroundColor: 'rgba(0,0,0,0.6)' }} />
      </View>

      {/* Box ( riquadro) e riga rossa animata */}
      <View style={styles.overlay}>
        <View style={[styles.cornerContainer, {
          width: scanBoxSize,
          height: scanBoxSize,
          position: 'absolute',
          top: scanBoxTop,
          left: scanBoxLeft,
        }]}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Riga rossa animata */}
          <Animated.View
            style={[
              styles.scanLine,
              {
                width: scanBoxSize * 0.9,
                left: (scanBoxSize * 0.05), // centrata orizzontalmente
                transform: [{
                  translateY: scanAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, scanBoxSize - 4], // spostamento verticale limitato al box
                  }),
                }],
              }
            ]}
          />
        </View>
      </View>

      {/* Pulsante per rifare la scansione */}
      {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Scansiona di nuovo</Text>
        </TouchableOpacity>
      )}

      {/* Pulsante per attivare la torcia */}
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cornerContainer: {
    width: 200,
    height: 200,
    position: 'relative',
  },

  corner: {
    width: 30,
    height: 30,
    borderColor: '#00FF00',
    position: 'absolute',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 6,
  },

  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 6,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 6,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 6,
  },
  scanLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'red',
    opacity: 0.8,
  },
  guideText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  }
});
