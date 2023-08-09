import AsyncStorage from '@react-native-async-storage/async-storage'

export async function setObjectToStore(value) {
    try {
        const jsonValue = JSON.stringify(value)
        console.log('StoreData => setObjectToStore => ', jsonValue);
        await AsyncStorage.setItem('Chiave1', jsonValue)
    } catch (e) {
        // save error
        console.log('Error Set to Store: ', e);
    }

    console.log('Stored Done.')
}

export async function getObjectFromStore() {
    try {
        const jsonValue = await AsyncStorage.getItem('Chiave1')
        console.log('StoreData => getObjectFromStore => ', jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // read error
        console.log('Error Get From Store: ',e)
    }
}

export async function clearStore() {
    try {
        await AsyncStorage.clear()
        console.log("Store creared!")
        return null
    } catch (e) {
        // read error
        console.log('Error Clear Store: ', e);
    }
}


export async function getAllKeys () {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
      console.log('Error Get all Keys Store: ', e);
    }

    console.log('keys: ', keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }