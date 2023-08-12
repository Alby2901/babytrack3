import { useContext, useState, useLayoutEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'


export async function setObjectToStore(keyp,value) {

    try {
        
        console.log('StoreDataLocal => setObjectToStore => Keyp ', keyp);
        console.log('StoreDataLocal => setObjectToStore => Value', value);

        const key = JSON.stringify(keyp);
        const jsonValue = JSON.stringify(value);

        console.log('StoreDataLocal => setObjectToStore => ', key);
        console.log('StoreDataLocal => setObjectToStore => ', jsonValue);
        await AsyncStorage.setItem(keyp,jsonValue)
                
    } catch (e) {
        // save error
        console.log('Error Set to Store: ', e);
    }

    console.log('Stored Done.')
}

export async function getObjectFromStore(keyp) {
    try {
        console.log('StoreDataLocal => getObjectFromStore => keyp', keyp);
        const jsonValue = await AsyncStorage.getItem(keyp)
        console.log('StoreDataLocal => getObjectFromStore => ', jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // read error
        console.log('Error Get From Store: ',e)
    }
}

export async function clearStore() {
    try {
        await AsyncStorage.clear()
        console.log("Store cleared!")
        return null
    } catch (e) {
        // read error
        console.log('Error Clear Store: ', e);
    }
}


export async function getAllKeys () {
    let keys = []
    try {
      
      keys = await AsyncStorage.getAllKeys();
      console.log('StoreDataLocal => setObjectToStore => AllKeys: ', keys);
      return keys;

    } catch(e) {
      // read key error
      console.log('Error Get all Keys Store: ', e);
    }
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }