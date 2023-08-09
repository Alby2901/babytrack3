// import * as React from "react";
import { useContext, useState, useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable, TextInput } from "react-native";
import { setObjectToStore, getObjectFromStore, clearStore, getAllKeys } from '../store/StoreDataLocal';
import { GlobalStyles } from "../UI/GlobalConstant";

function StoreLocalScreen({ navigation }) {
  const [dataRed, setDataRed] = useState();
  const [url, setUrl] = useState();

  function urlInputHandler(enteredUrl) {
    setUrl(enteredUrl);
  }

  function setToStore() {
    const oggetto = { name: "John", age: 30, city: "New York" }
    console.log('Obj: ', oggetto);
    setObjectToStore(oggetto);
  }

  function getKeys() {
    getAllKeys();
  }

  function clearAllStore() {
    clearStore();
    setDataRed(null);
  }

  async function getfromstore() {
    console.log('get 01');
    const objGetted = await getObjectFromStore()
    console.log('get obj: ', objGetted);
    console.log('get 02');
    setDataRed(objGetted);
    console.log('get 03');
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: 'space-evenly' }}>
        <TextInput
          style={styles.inputText}
          onChangeText={urlInputHandler}
          value={url}
          placeholder="URL"
        />

        <Button
          title="Save to store"
          onPress={setToStore}
        />

        <Button
          title="Chek keys"
          onPress={getKeys}
        />

        <Button
          title="Clear store"
          onPress={clearAllStore}
        />

        <Button
          title="Get from store"
          onPress={getfromstore}
        />

        {dataRed && <Text>Nome: {dataRed.name}</Text>}
        {dataRed && <Text>Età: {dataRed.age}</Text>}
        {dataRed && <Text>Città: {dataRed.city}</Text>}
      </View>
    </View>
  );
}

export default StoreLocalScreen;

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 2,
    borderColor: GlobalStyles.colors.BG_DarkBlue,
    backgroundColor: GlobalStyles.colors.BG_InputField,
    color: GlobalStyles.colors.Text_Input,
    textDecorationColor: GlobalStyles.colors.Text_Main,
    margin: 5,
    padding: 4,
    minWidth: 200,
  },
  button: {
    borderRadius: 20,
    margin: 20,
    padding: 10,
    elevation: 2,
  },
});
