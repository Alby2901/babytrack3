import { Alert } from 'react-native';
import Constants from 'expo-constants';

function isRemoteVersionNewer(localVersion, remoteVersion) {
  console.log(`UPDATE CHECKER - CheckForUpFN - Controllo versione: locale ${localVersion}, remota ${remoteVersion}`);
  const local = localVersion.split('.').map(Number);
  const remote = remoteVersion.split('.').map(Number);

  for (let i = 0; i < Math.max(local.length, remote.length); i++) {
    const l = local[i] || 0;
    const r = remote[i] || 0;
    if (r > l) return true;
    if (r < l) return false;
  }

  return false;
}

export async function checkForAppUpdate(updateUrl, onUpdateConfirm) {
  console.log('UPDATE CHECKER - CheckForUpFN - onUpdateConfirm: ', onUpdateConfirm);

  try {
    console.log('UPDATE CHECKER - CheckForUpFN - Controllo aggiornamento...');
    // const response = await fetch('http://192.168.230.4:8080/version.json');
    // const response = await fetch('http://172.31.234.97:8084/babytrack_version.json');


    const response = await fetch(`${updateUrl}?nocache=${Date.now()}`);

    // const response = await fetch(`http://172.31.234.97:8084/babytrack_version.json?nocache=${Date.now()}`);


    if (!response.ok) throw new Error('Errore nel download del file con la versione disponibile.');


    console.log('UPDATE CHECKER - CheckForUpFN - Risposta ricevuta:', response);

    const remoteData = await response.json();


    console.log('UPDATE CHECKER - CheckForUpFN - Dati remoti:', remoteData);


    const remoteVersion = remoteData.version;
    const localVersion = Constants.expoConfig.version;

    const isUpdateAvailable = isRemoteVersionNewer(localVersion, remoteVersion);
    console.log(`Versione locale: ${localVersion}, Versione remota: ${remoteVersion}, Aggiornamento disponibile: ${isUpdateAvailable}`);
    if (isUpdateAvailable) {
      Alert.alert(
        'Aggiornamento disponibile',
        `È disponibile una nuova versione (${remoteVersion}). Vuoi aggiornare ora?`,
        [
          { text: 'Annulla', style: 'cancel' },
          {
            text: 'Aggiorna',
            onPress: () => {
              if (onUpdateConfirm) onUpdateConfirm(remoteData);
            }
          }
        ]
      );
    } else {

      console.log('L\'app è aggiornata alla versione più recente.');
      Alert.alert('L\'app è aggiornata alla versione più recente.',);
    }
  } catch (error) {
    Alert.alert(
      'Errore durante il controllo versione',
      'Controlla le impostazioni\ndell’Update Url e riprova.'
    );
    console.warn('Errore durante il controllo versione:', error);
  }
}
