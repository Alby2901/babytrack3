// import * as React from "react";
import { useContext, useState, useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable, TextInput } from "react-native";
import { setObjectToStore, getObjectFromStore, clearStore, getAllKeys } from '../store/StoreDataLocal';
import { GlobalConstants, GlobalStyles } from "../UI/GlobalConstant";
import { AuthContext } from "../store/auth-context";

function StoreLocalScreen({ navigation }) {
  const [dataRed, setDataRed] = useState();
  const [keysStored, setKeysStored] = useState();
  const [keyState, setKeyState] = useState();
  const [urlState, setUrlState] = useState();
  const [modeState, setModeState] = useState();

  const autxCtx = useContext(AuthContext);

  function urlInputHandler(enteredUrl) {
    setUrlState(enteredUrl);
  }

  function keyInputHandler(enteredKey) {
    setKeyState(enteredKey);
  }

  function modeInputHandler(enteredStatus) {
    setModeState(enteredStatus);
  }

  async function setToStore() {
    // const keyObj = { key: keyState };
    // console.log('KeyObj sent: ', keyObj);
    const valObj = { url_address: urlState, mode_status: modeState };
    console.log('ValObj sent: ', valObj);
    await setObjectToStore(keyState, valObj);

    console.log('autxCtxCtx.Key1_before: ', autxCtx.key1);
    console.log('autxCtxCtx.Val1_before: ', autxCtx.value1);

    autxCtx.setKey1(keyState);
    autxCtx.setValue1(valObj);

    console.log('autxCtxCtx.Key1_after: ', autxCtx.key1);
    console.log('autxCtxCtx.Val1_before: ', autxCtx.value1);

  }

  async function getKeys() {
    console.log('keysStored_before: ', keysStored);
    const allKeys =  await getAllKeys();
    console.log('keys from store: ', allKeys);
    setKeysStored(allKeys[0]);
    console.log('keysStored_after: ', keysStored);
  }

  async function clearAllStore() {
    await clearStore();
    setDataRed(null);
    setKeysStored(null)
    setKeyState(null);
    setUrlState(null);
    setModeState(null)
  };

  async function getfromstore() {
    console.log('get 01');
    const objGetted = await getObjectFromStore(keyState)
    console.log('get obj: ', objGetted);
    console.log('get 02');

    setDataRed(existingValues => ({
      ...existingValues,
      mode_status: objGetted.mode_status,
      url_address: objGetted.url_address
    }))

    console.log('objGetted.url_address: ', objGetted.url_address);
    console.log('objGetted.mode_status: ', objGetted.mode_status);

    setUrlState(objGetted.url_address.toString());
    setModeState(objGetted.mode_status);

    console.log('get 03');
  };

  function showAllState() {
    console.log('DataRed_State: ', dataRed);
    console.log('KeysStored_State: ', keysStored);
    console.log('KeyState_State: ', keyState);
    console.log('UrlState_State: ', urlState);
    console.log('ModeState_State: ', modeState);
  }

  function tbdef(){
    console.log('To be define: ');
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
            onChangeText={keyInputHandler}
            value={keyState}
            placeholder="Key"
          />
        </View>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={urlInputHandler}
            value={urlState}
            placeholder="http:// url : port "
          />
        </View>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={modeInputHandler}
            value={modeState}
            placeholder="Prodction/Develop"
          />
        </View>

        <View style={styles.dataOutContainer}>
          {dataRed && <Text style={styles.textOutLable}>Keys:</Text>}
          {/* {dataRed && <Text style={styles.textOutData}>{keysStored.map(item => {`key:  ${item}`})}</Text>} */}
          {dataRed && <Text style={styles.textOutData}>{keysStored}</Text>}
        </View>


        <View style={styles.dataOutContainer}>
          {dataRed && <Text style={styles.textOutLable}>Data From store:</Text>}
          {dataRed && <Text style={styles.textOutData}>{dataRed.mode_status}</Text>}
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

          <View style={styles.buttonRowContainer}>
            <Pressable style={styles.buttonContainer} onPress={showAllState}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Show All State</Text>
              </View>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={tbdef}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>TBD</Text>
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
    flex: 1,
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
    marginBottom: 120,
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
