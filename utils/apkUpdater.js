import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { Alert, Platform } from 'react-native';

export async function downloadAndInstallApk(apkUrl, apkFileName) {
  if (Platform.OS !== 'android') {
    Alert.alert('Aggiornamento non supportato', 'Questo tipo di aggiornamento è disponibile solo su Android.');
    return;
  }

  try {
    const apkPath = FileSystem.documentDirectory + apkFileName;
    console.log('APK-UPDATER FN - apkPath:', apkPath);
    console.log('APK-UPDATER FN - apkUrl:', apkUrl);

    // ✅ Verifica che il file esista sul server (HEAD request)
    const response = await fetch(apkUrl, { method: 'HEAD' });
    if (!response.ok) {
      Alert.alert('Errore', 'Il file APK non è disponibile sul server.');
      return;
    }

    // ✅ Avvia il download
    // >> NON SERVE PIU' perché il file viene scaricato in un altro modo
    // const downloadResumable = FileSystem.createDownloadResumable(apkUrl, apkPath);
    // const { uri } = await downloadResumable.downloadAsync();
    // console.log('APK-UPDATER FN - uri:', uri);

    // ✅ Verifica che il file sia valido e non vuoto
    // >> NON SERVE PIU' perché il file viene scaricato in un altro modo
    // const fileInfo = await FileSystem.getInfoAsync(uri);
    // console.log('APK-UPDATER FN - File scaricato:', {
    //   path: uri,
    //   size: fileInfo.size,
    //   exists: fileInfo.exists
    // });

    // if (!fileInfo.exists || fileInfo.size < 1000000) {  // meno di 1MB è sospetto
    //   Alert.alert('Errore', 'Il file scaricato non è valido o incompleto.');
    //   return;
    // }

    // ✅ Avvia installazione
    // >> Questa versione scarica il file direttamente dall'URL remoto tramite il browser 
    // >> e permette di salvare il file e di installarlo manualmente 
    try {
      const canOpen = await Linking.canOpenURL(apkUrl);
      if (!canOpen) {
        Alert.alert('Errore', 'Impossibile aprire il link per l’installazione.');
        return;
      }
      await Linking.openURL(apkUrl); // ✅ questo aprirà il browser per scaricare/installare
    } catch (linkError) {
      console.error('Errore durante apertura dell’URL APK remoto:', linkError);
      Alert.alert('Errore', 'Impossibile avviare l’installazione: ' + linkError.message);
    }

    // >> Questa versione tenta di aprire il file scaricato localmente ma Android dalla 7+ 
    // >> non permette questa operazione dall'interno di una app per sicurezza.-
    // >> NON SERVE PIU'!
    // try {
    //   const canOpen = await Linking.canOpenURL(uri);
    //   if (!canOpen) {
    //     Alert.alert('Errore', 'Impossibile aprire il file APK per l’installazione.');
    //     return;
    //   }
    //   await Linking.openURL(uri);
    // } catch (linkError) {
    //   console.error('Errore durante apertura del file APK:', linkError);
    //   Alert.alert('Errore', 'Apertura del file APK fallita: ' + linkError.message);
    // }

  } catch (error) {
    console.error('Errore durante il download/installazione APK:', error);
    Alert.alert('Errore', 'Aggiornamento fallito: ' + error.message);
  }
}
