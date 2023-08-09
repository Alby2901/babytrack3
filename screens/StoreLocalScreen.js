// import * as React from "react";
import { useContext, useState, useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable, TextInput } from "react-native";
import { setObjectToStore, getObjectFromStore, clearStore, getAllKeys } from '../store/StoreDataLocal';
import { GlobalConstants, GlobalStyles } from "../UI/GlobalConstant";

function StoreLocalScreen({ navigation }) {
  const [dataRed, setDataRed] = useState();
  const [urlState, setUrlState] = useState();

  function urlInputHandler(enteredUrl) {
    setUrlState(enteredUrl);
  }

  function setToStore() {
    const oggetto = { url_address: urlState }
    console.log('Key sent: ', oggetto);
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
    <View style={styles.AllContainer}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 30 }}>Setting screen!</Text>
      </View>
      <View style={styles.dataAllContainer}>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={urlInputHandler}
            value={urlState}
            placeholder="http:// url : port "
          />
        </View>

        <View style={styles.dataOutContainer}>
        {dataRed && <Text style={styles.textOutLable}>Url_Address:</Text>}
        {dataRed && <Text style={styles.textOutData}>{dataRed.url_address}</Text>}
        </View>

        <View style={styles.buttonAllContainer}>
          <View style={styles.buttonRowContainer}>
            <Pressable style={styles.buttonContainer} onPress={setToStore}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Save to store</Text>
              </View>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={getKeys}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Chek keys</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.buttonRowContainer}>
            <Pressable style={styles.buttonContainer} onPress={clearAllStore}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Clear Store</Text>
              </View>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={getfromstore}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Get from store</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View >
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
  AllContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  dataAllContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    margin: 2,
  },
  dataContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    margin: 2,
  },
  dataOutContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    margin: 2,
  },
  buttonAllContainer: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    margin: 2,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonRowContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 2,
    borderColor: 'blue',
    borderWidth: 1,
    height: 60,
  },
  buttonContainer: {
    borderRadius: 20,
    minWidth: 120,
    minHeight: 50,
    backgroundColor: GlobalStyles.colors.BG_DarkBlue,
    margin: 5,
    padding: 0,
    // elevation: 2,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  buttonText: {
    color: 'white',
  },
  textOutLable: {
    textAlign: 'left',
  },
  textOutData: {
    alignContent: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold'
  },
});
