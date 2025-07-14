import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { Alert, Platform } from 'react-native';

export async function downloadAndInstallApk(apkUrl, apkFileName) {
  if (Platform.OS !== 'android') {
    Alert.alert('APK-UPDATER FN - Aggiornamento non supportato', 'Questo tipo di aggiornamento è disponibile solo su Android.');
    return;
  }

  try {
    // const apkFilename = 'babytrack.apk';
    const apkPath = FileSystem.documentDirectory + apkFileName;
    console.log('APK-UPDATER FN - apkPath:', apkPath);
    console.log('APK-UPDATER FN - apkUrl:', apkUrl);

    const downloadResumable = FileSystem.createDownloadResumable(apkUrl, apkPath);
    
    console.log('APK-UPDATER FN - downloadresumable:  done');
    
    const { uri } = await downloadResumable.downloadAsync();

    console.log('APK-UPDATER FN - downloadAsync:  done');
    console.log('APK-UPDATER FN - uri: ', uri);

    if (uri) {
      // Avvia installazione
      Linking.openURL(uri);
    } else {
      Alert.alert('Errore', 'Impossibile scaricare il file APK.');
    }
  } catch (error) {
    console.error('Errore durante il download/installazione APK:', error);
    Alert.alert('Errore', 'Aggiornamento fallito: ' + error.message);
  }
}
