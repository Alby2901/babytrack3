// import * as React from "react";
import { useContext, useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable, TextInput, ScrollView, SafeAreaView, } from "react-native";
import { setObjectToStore, getObjectFromStore, clearStore, getAllKeys } from '../store/StoreDataLocal';
import { GlobalConstants, GlobalStyles } from "../UI/GlobalConstant";
import { AuthContext } from "../store/auth-context";
import { SelectList } from 'react-native-dropdown-select-list'

function StoreLocalScreen({ navigation }) {
  // console.log("StoreLocalScreen navigation:", navigation);
  // console.log("StoreLocalScreen route.params:", route.params);

  const [dataRed, setDataRed] = useState();
  const [keysStored, setKeysStored] = useState();
  const [keyState, setKeyState] = useState();
  const [urlState, setUrlState] = useState();
  const [modeState, setModeState] = useState();
  const [deviceIDState, setDeviceIDState] = useState();
  const [testState, setTestState] = useState();
  const [userState, setUserState] = useState();
  const [selected, setSelected] = useState("");

  const autxCtx = useContext(AuthContext);

  const data = GlobalConstants.modeData;

  useEffect(() => {

    console.log('--------------- STORE LOCAL SCREEN - UseEffect --------------------------------------');

    async function getKeysAtLoading() {

      console.log('--------------- STORE LOCAL SCREEN - UseEffect Async Function START--------------------------------------');
      // console.log('keysState_before: ', keyState);
      const allKeys = await getAllKeys();
      // console.log('keys from store: ', allKeys);
      // console.log('keys from store[0]: ', allKeys[0]);
      setKeyState(allKeys[0]);
      // console.log('keysState_after: ', keyState);

      if (allKeys[0]) {
        // console.log('==> Key foud, get values... ');
        const objGetted = await getObjectFromStore(allKeys[0])
        setDataRed(existingValues => ({
          ...existingValues,
          mode_status: objGetted.mode_status,
          deviceid_status: objGetted.deviceid_status,
          url_address: objGetted.url_address
        }))

        // console.log('objGetted.url_address: ', objGetted.url_address);
        // console.log('objGetted.mode_status: ', objGetted.mode_status);
         console.log('LOGGO IO! objGetted.deviceid__status: ', objGetted.deviceid__status);

        // console.log('==> Value getted! Set State value... ');

        setUrlState(objGetted.url_address.toString());
        setModeState(objGetted.mode_status);
        setUserState(objGetted.user_status);
        setDeviceIDState(objGetted.deviceid_status);

        // console.log('UrlState_after: ', urlState);
        // console.log('ModeState_after: ', modeState);
        // console.log('==> State value setted! Set contex value... ');
        // console.log('objGetted.url_address.toString()... ', objGetted.url_address.toString());

        autxCtx.urlsetted = objGetted.url_address.toString();

        // console.log('autxCtx.urlsetted: ', autxCtx.urlsetted);
        // console.log('--------------- UseEffect if end --------------------------------------');
      } else {
        // console.log('keysStored non setted: ');
      }

      // console.log('TestState_before: ', testState);
      // console.log('==> Set State Test... ');
      // setTestState('Pippo');
      // console.log('TestState_after: ', testState);
      // console.log('Test: ', test);
      console.log('--------------- STORE LOCAL SCREEN - UseEffect async function END --------------------------------------');
      // return test
    }

    // console.log('TestState_before2: ', testState);

    // const ttt = getKeysAtLoading();
    getKeysAtLoading();

    // console.log('ttt: ', ttt);
    // console.log('==> Set State Test... ');
    // setTestState(ttt);
    // console.log('TestState_after: ', testState);

    console.log('--------------- STORE LOCAL SCREEN - UseEffect THE END --------------------------------------');

  }, [])

  function urlInputHandler(enteredUrl) {
    setUrlState(enteredUrl);
  }
  function keyInputHandler(enteredKey) {
    setKeyState(enteredKey);
  }
  function deviceIDInputHandler(enteredDeviceID) {
    setDeviceIDState(enteredDeviceID);
  }
  function modeInputHandler(enteredStatus) {
    setModeState(enteredStatus);
  }
  function userInputHandler(enteredStatus) {
    setUserState(enteredStatus);
  }

  async function setToStore() {
    console.log('---------------------------- SAVE TO STORE KEY  - START ---------------- ');
    // const keyObj = { key: keyState };
    // console.log('KeyObj sent: ', keyObj);
    const valObj = { url_address: urlState, mode_status: modeState, user_status: userState, deviceid_status: deviceIDState};
    console.log('STORE LOCAL SCREEN ValObj sent: ', valObj);
    await setObjectToStore(keyState, valObj);
    console.log('STORE LOCAL SCREEN ValObj.url_address: ', valObj.url_address);
    console.log('STORE LOCAL SCREEN ValObj.mode_status: ', valObj.mode_status);
    console.log('STORE LOCAL SCREEN ValObj.user_status: ', valObj.user_status);
    console.log('STORE LOCAL SCREEN ValObj.deviceid_status: ', valObj.deviceid_status);


    console.log('STORE LOCAL SCREEN autxCtxCtx.Key1_before: ', autxCtx.key1);
    console.log('STORE LOCAL SCREEN autxCtxCtx.url_address_before: ', autxCtx.urlsetted);
    console.log('STORE LOCAL SCREEN autxCtxCtx.mode_before: ', autxCtx.mode);
    console.log('STORE LOCAL SCREEN autxCtxCtx.user_before: ', autxCtx.user);
    console.log('STORE LOCAL SCREEN autxCtxCtx.deviceid_before: ', autxCtx.deviceid);

    autxCtx.setKey1(keyState);
    autxCtx.readUrlSetted(valObj.url_address);
    autxCtx.setMode(valObj.mode_status);
    autxCtx.setUser(valObj.user_status);
    autxCtx.setdeviceID(valObj.deviceid_status);

    console.log('STORE LOCAL SCREEN autxCtxCtx.Key1_after: ', autxCtx.key1);
    console.log('STORE LOCAL SCREEN autxCtxCtx.url_address_after: ', autxCtx.urlsetted);
    console.log('STORE LOCAL SCREEN autxCtxCtx.mode_after: ', autxCtx.mode);
    console.log('STORE LOCAL SCREEN autxCtxCtx.user_after: ', autxCtx.user);
    console.log('STORE LOCAL SCREEN autxCtxCtx.deviceid_after: ', autxCtx.deviceid);

    console.log('---------------------------- SAVE TO STORE KEY - THE END ---------------- ');

  }

  async function getKeys() {
    console.log('---------------------------- GET KEYS - START ---------------- ');
    console.log('keysStored_before: ', keysStored);
    const allKeys = await getAllKeys();
    console.log('keys from store: ', allKeys);
    setKeysStored(allKeys[0]);
    console.log('keysStored_after: ', keysStored);
    console.log('---------------------------- GET KEYS - THE END ---------------- ');
  }

  async function clearAllStore() {
    console.log('---------------------------- CLEAR ALL STORE, CONTEXY§T END STATES - START ---------------- ');
    await clearStore();
    setDataRed(null);
    setKeysStored(null)
    setKeyState(null);
    setUrlState(null);
    setModeState(null);
    autxCtx.setKey1(null);
    autxCtx.setMode(null);
    autxCtx.readUrlSetted(null);
    autxCtx.setdeviceID(null);
    console.log('---------------------------- CLEAR ALL STORE, CONTEXY§T END STATES - START ---------------- ');
  };

  async function getfromstore() {
    console.log('---------------------------- GET VALUE FROM STRORE  - START ---------------- ');

    if (keyState) {
      const objGetted = await getObjectFromStore(keyState)
      console.log('get obj: ', objGetted);
      // console.log('get 02');

      setDataRed(existingValues => ({
        ...existingValues,
        url_address: objGetted.url_address,
        mode_status: objGetted.mode_status,
        user_status: objGetted.user_status,
        deviceid_status: objGetted.deviceid_status
      }))

      console.log('objGetted.url_address: ', objGetted.url_address);
      console.log('objGetted.mode_status: ', objGetted.mode_status);

      setUrlState(objGetted.url_address.toString());
      setModeState(objGetted.mode_status);
      setUserState(objGetted.user_status);
      setDeviceIDState(objGetted.deviceid_status);

    } else {

      console.log('Non ci sono chiavi!');

    }
    console.log('---------------------------- GET VALUE FROM STRORE - THE END ---------------- ');
  };

  function showAllState() {
    console.log('---------------------------- SHOW ALL STATE - START ---------------- ');
    console.log('DataRed_State: ', dataRed);
    console.log('KeysStored_State: ', keysStored);
    console.log('KeyState_State: ', keyState);
    console.log('UrlState_State: ', urlState);
    console.log('ModeState_State: ', modeState);
    console.log('DeviceIDState_State: ', deviceIDState);
    console.log('---------------------------- SHOW ALL STATE - THE END ---------------- ');
  }

  function checkAllContx() {
    console.log('---------------------------- CHECK ALL CONTEXT - START ---------------- ');
    console.log('sessionID_Ctx: ', autxCtx.sessionID);
    console.log('sessionTimer_Ctx: ', autxCtx.sessionTimer);
    console.log('isAuthenticated_Ctx: ', autxCtx.isAuthenticated);
    console.log('urlsetted_Ctx: ', autxCtx.urlsetted);
    console.log('key1_Ctx: ', autxCtx.key1);
    console.log('mode_Ctx: ', autxCtx.mode);
    console.log('user_Ctx: ', autxCtx.user);
    console.log('deviceID_Ctx: ', autxCtx.deviceid);
    console.log('---------------------------- CHECK ALL CONTEXT - THE END ---------------- ');
  }

  function goToLoginScr() {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.AllContainer}>
          <View style={styles.titleContainer}>
            <Text style={{ fontSize: 30 }}>Setting screen!</Text>
            <Text style={{ fontSize: 10 }}>Test: {testState}</Text>
          </View>
          <View>
            {/* <View style={styles.dataContainer}>
              <TextInput
                style={styles.inputText}
                onChangeText={keyInputHandler}
                value={keyState}
                placeholder="Key"
              />
            </View> */}

            <View style={styles.dataContainer}>
              <SelectList
                setSelected={(val) => setDeviceIDState(val)}
                data={GlobalConstants.deviceID}
                save="value"
                placeholder="Device ID"
                defaultOption={{ key: deviceIDState, value: deviceIDState }}
                boxStyles={{ backgroundColor: 'yellow', height: 50, width: 220 }}
                inputStyles={{ color: 'mediumblue' }}
              // onSelect={modeInputHandler}
              />
            </View>

            <View style={styles.dataContainer}>
              <SelectList
                setSelected={(val) => setKeyState(val)}
                data={GlobalConstants.keyData}
                save="value"
                placeholder="Key"
                defaultOption={{ key: keyState, value: keyState }}
                boxStyles={{ backgroundColor: 'blue', height: 50, width: 220 }}
                inputStyles={{ color: 'white' }}
              // onSelect={modeInputHandler}
              />
            </View>

            {/* <View style={styles.dataContainer}>
              <TextInput
                style={styles.inputText}
                onChangeText={urlInputHandler}
                value={urlState}
                placeholder="http:// url : port "
              />
            </View> */}
            <View style={styles.dataContainer}>
              <SelectList
                setSelected={(val) => setUrlState(val)}
                data={GlobalConstants.urlData}
                save="value"
                placeholder="http:// url : port "
                defaultOption={{ key: urlState, value: urlState }}
                boxStyles={{ backgroundColor: 'green', height: 50, width: 220 }}
                inputStyles={{ color: 'white' }}
              // onSelect={modeInputHandler}
              />
            </View>
            {/* <View style={styles.dataContainer}>
              <TextInput
                style={styles.inputText}
                onChangeText={modeInputHandler}
                value={modeState}
                placeholder="Prodction/Develop"
              />
            </View> */}
            {/* <View style={styles.dataDropDownContainer}> */}
            <View style={styles.dataContainer}>
              <SelectList
                setSelected={(val) => setModeState(val)}
                data={GlobalConstants.modeData}
                save="value"
                placeholder="Prodction/Develop"
                defaultOption={{ key: modeState, value: modeState }}
                boxStyles={{ backgroundColor: 'red', height: 50, width: 220 }}
                inputStyles={{ color: 'white' }}
              // onSelect={modeInputHandler}
              />
            </View>
            <View style={styles.dataContainer}>
              <TextInput
                style={styles.inputText}
                onChangeText={userInputHandler}
                value={userState}
                placeholder="Utente"
              />
            </View>

            <View style={styles.dataOutContainer}>
              {keysStored && <Text style={styles.textOutLable}>Keys:</Text>}
              {/* {dataRed && <Text style={styles.textOutData}>{keysStored.map(item => {`key:  ${item}`})}</Text>} */}
              {keysStored && <Text style={styles.textOutData}>{keysStored}</Text>}
            </View>


            <View style={styles.dataOutContainer}>
              {dataRed && <Text style={styles.textOutLable}>Data From store:</Text>}
              {dataRed && <Text style={styles.textOutData}>{dataRed.url_address}</Text>}
              {dataRed && <Text style={styles.textOutData}>{dataRed.mode_status}</Text>}
              {dataRed && <Text style={styles.textOutData}>{dataRed.user_status}</Text>}
              {dataRed && <Text style={styles.textOutData}>{dataRed.deviceid_status}</Text>}
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
                <Pressable style={styles.buttonContainer} onPress={getfromstore}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Get from store</Text>
                  </View>
                </Pressable>

              </View>
              <View style={styles.buttonRowContainer}>
                <Pressable style={styles.buttonContainer} onPress={clearAllStore}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Clear Store</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.buttonContainer} onPress={showAllState}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Show All State</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.buttonContainer} onPress={checkAllContx}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Chk All Cntx</Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.buttonRowContainer}>
                <Pressable style={styles.buttonContainer} onPress={goToLoginScr}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Back to Login</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View >
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 30,
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
    marginBottom: 80,
  },
  buttonRowContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 2,
    borderColor: 'blue',
    borderWidth: 1,
    height: 50,
  },
  buttonContainer: {
    borderRadius: 20,
    minWidth: 100,
    minHeight: 50,
    backgroundColor: GlobalStyles.colors.BG_DarkBlue,
    margin: 2,
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
