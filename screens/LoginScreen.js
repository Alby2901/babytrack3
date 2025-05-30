import {
  Text, View, StyleSheet, Button, TextInput,
  ScrollView, SafeAreaView, Pressable
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import ScreenContainer from "../UI/ScreenContainer";
import { getSession } from "../components/http";
import { useContext, useState, useLayoutEffect, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { GlobalStyles } from "../UI/GlobalConstant";
import IconButton from '../UI/IconButton';
import { setObjectToStore } from '../store/StoreDataLocal';


function LoginScreen({ navigation }) {
  // console.log("LoginScreen navigation:", navigation);
  // console.log("LoginScreen route.params:", route.params);

  const [errorHTTP, setErrorHTTP] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [message, setmessage] = useState("");
  const [serverSetted, setServerSetted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showConfigInput, setshowConfigInput] = useState(false);
  const { isInputOk, setIsInputOk } = useState(true);
  const [url, setUrl] = useState("http://93.145.42.53:8090");
  const [deviceID, setdeviceID] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ----------------------------
  // ELIMINARE IL DEFAULT!
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  // ----------------------------

  const authCtx = useContext(AuthContext);

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
  }

  function headerSettingsIconPressHandler() {
    console.log('✅ ICONA PREMUTA — Navigazione a SettingAccess');
    console.log('From Login Screen => Open setting screen... ');
    navigation.navigate('SettingAccess');
  }

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       return (

  //         <Pressable onPress={headerSettingsIconPressHandler}>
  //           <Text style={styles.cardText}>X</Text>
  //           <View style={styles.hideButton}></View>
  //         </Pressable>

  //         // <View pointerEvents="box-none" style={{ marginRight: 10, zIndex: 10 }}>
  //         //   <IconButton
  //         //     icon="settings-outline"
  //         //     size={24}
  //         //     color={'red'}
  //         //     onPress={headerSettingsIconPressHandler}
  //         //   />
  //         // </View>
  //       )
  //     },
  //     // headerLeft: () => {
  //     //   return (
  //     //     <Text style={styles.version}>(1.3.1)</Text>
  //     //   )
  //     // }
  //   });
  // }, [navigation, headerSettingsIconPressHandler]);

  useEffect(() => {
    if (authCtx.urlsetted) {
      setUrl(authCtx.urlsetted);
      setServerSetted(true);
      setUsr(authCtx.user);
      console.log('LOGIN_SCREEN => useEffect => authCtx.user: ', usr)
    } else {
      setServerSetted(false);
    };
  }, [authCtx.urlsetted, authCtx.user, authCtx.mode, authCtx.deviceid])

  // function checkInput(usrp, pwdp, urlp) {
  //   if (usrp && pwdp && urlp) {
  //     setIsInputOk(true);
  //     getSessionHandler();
  //   } else {
  //     setIsInputOk(false);
  //   }
  // }

  if (isAuthenticated) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  async function getSessionHandler() {
    console.log("Login Screen +++++++++++++++++++++++++++++");
    console.log("Login Screen GetSession1: ");

    console.log("Login Screen url: ", url);

    authCtx.readUrlSetted(url);
    console.log("Login Screen authCtx.urlsetted: ", authCtx.urlsetted);

    // authCtx.readUrlSetted(url);
    // console.log("Login Screen authCtx.urlsetted: ", authCtx.urlsetted);

    console.log("Login Screen authCtx.mode: ", authCtx.mode);
    console.log("Login Screen authCtx.deviceid: ", authCtx.deviceid);

    authCtx.setUser(usr);
    const valObj = { url_address: url, mode_status: authCtx.mode, user_status: usr, deviceid_status: authCtx.deviceid };
    console.log('Login Screen => Store di local Obj: ', valObj);
    await setObjectToStore(authCtx.key1, valObj);

    console.log('Login Screen => End Store di local Obj!');
    setIsAuthenticated(true);
    console.log('Login Screen => Pre chiamata "getSession"');
    // wait(2000);
    const [sessionIDData, sessionTimeout, messageData, cognome, nome] = await getSession(
      usr,
      pwd,
      url,
      authCtx.deviceid
    );
    setIsAuthenticated(false);

    console.log("Login Screen SessId: ", sessionIDData);
    authCtx.authenticate(sessionIDData, sessionTimeout, cognome, nome);
    const p1 = authCtx.sessionID;
    const p2 = authCtx.isAuthenticated;
    console.log("Login Screen Ctx.sessionID (p1): ", p1);
    console.log("Login Screen Ctx.isAuthenticated (p2): ", p2);

    console.log("Login Screen Ctx.sessionID: ", authCtx.sessionID);
    console.log("Login Screen Ctx.isAuthenticated: ", authCtx.isAuthenticated);

    console.log("Login Screen GetSession2: ");
    setSessionID(sessionIDData);
    console.log("Login Screen GetSession3: ");
    setmessage(messageData);
    console.log("Login Screen GetSession4: ");
    setIsLogged(true);
  }

  function resetIsLogged() {
    setIsLogged(false);
  }

  function urlInputHandler(enteredUrl) {
    setUrl(enteredUrl);
  }

  function usrInputHandler(enteredUsr) {
    setUsr(enteredUsr);
  }

  function pwdInputHandler(enteredPwd) {
    setPwd(enteredPwd);
  }

  function showConfigInputHandler() {
    setshowConfigInput(!showConfigInput);
  }

  return (
    <ScreenContainer>
      <View style={styles.containerOuter}>

        {/* SEGRETO - Mostra campo per per impostare server  */}
        {/* nello spigolo in alto a sinistra della testata della schermata
            c'è una piccola area cliccabile "nascosta" - stesso colore dello sfondo   */}
        <Pressable onPress={showConfigInputHandler}>
          {/* <Text style={styles.cardText}>Set Server</Text> */}
          <View style={styles.hideButton}></View>
        </Pressable>
        
        {/* Testata */}
        <View style={styles.cardTitle}>
          <Text style={styles.cardText}>LOGIN</Text>
          <Text style={[styles.cardText, styles.cardSmalltext]}>
            Inserire le credenziali di Neocare
          </Text>
        </View>

        
        {/* Dati correnti di SErver Modalità Device */}
        <View >
          {serverSetted ? <Text >Server: {authCtx.urlsetted} </Text> : <Text >ATTENZIONE! Server non impostato</Text>}
          {authCtx.mode ? <Text >Modo: {authCtx.mode} </Text> : <Text >Modo: Nessuno!</Text>}
          {authCtx.deviceid ? <Text >Device: {authCtx.deviceid} </Text> : <Text >Device: non in memoria</Text>}
        </View>

        <View style={styles.containerInput}>

          {/* Input text per inserimento URL server - Nascosto */}
          {showConfigInput && (
            <TextInput
              style={styles.inputText}
              onChangeText={urlInputHandler}
              value={url}
              placeholder="URL"
            />
          )}

          {/* Input Text Utente */}
          <TextInput
            style={styles.inputText}
            onChangeText={usrInputHandler}
            value={usr}
            placeholder="Utente"
          />

          {/* Input Text Password + Oscchiolino visualizza password */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={pwdInputHandler}
              value={pwd}
              secureTextEntry={!showPassword}
              placeholder="Password"
            />
            <Pressable onPress={toggleShowPassword} style={styles.toggleButton}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={18}
                color={'#c1c1c1'}
                // color={GlobalStyles.colors.Text_Main}
              />
            </Pressable>
          </View>

        </View>
        {!isLogged && (
          <View style={styles.containerButton}>
            {/* <Text style={styles.text}>Test chiamate HTTP...</Text> */}
            <Button
              style={styles.button}
              title="Login"
              color={GlobalStyles.colors.BG_DarkBlue}
              onPress={getSessionHandler}
            ></Button>
          </View>
        )}
        {!isLogged && (
          // <View pointerEvents="box-none" style={{ marginRight: 10, zIndex: 10 }}>
          <View pointerEvents="box-none" style={styles.containerButton}>
            <IconButton
              icon="settings-outline"
              size={24}
              color={'red'}
              onPress={headerSettingsIconPressHandler}
            />
          </View>
        )}
        {isLogged && (
          <View style={styles.containerMessage}>
            <Text>The Session ID is: {sessionID}</Text>

            {/* {!isInputOk && <Text style={styles.textAlert}>I CAMPI SONO VUOTI!</Text>} */}

            {isLogged && <Text style={styles.textAlert}>ATTENZIONE!</Text>}
            {isLogged && <Text style={styles.textAlert}>{message}</Text>}

            {/* {isLogged && sessionID && <Text style={styles.textAlert}>The Session ID is: {sessionID}</Text>} */}
            {/* {isLogged && !sessionID && (<Text style={styles.textAlert}>The Session ID is not avaiable!</Text>)} */}
          </View>
        )}

        {isLogged && (
          <View style={styles.containerButton}>
            {(isLogged || errorHTTP) && (
              <Button
                style={styles.button}
                title="Riprova..."
                // onPress={resetIsLogged}  Valutra se meglio rilanciare subito il login oppure resettare
                //                          resettare prima l'errore e poi rifare il login 
                onPress={getSessionHandler}
                color={GlobalStyles.colors.BG_DarkBlue}
              ></Button>
            )}
            {errorHTTP && (
              <Text style={styles.textAlert} cd>
                Server is not responding!
              </Text>
            )}
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  // scrollContent: {
  //   flexGrow: 1,
  //   justifyContent: "space-between",
  //   paddingHorizontal: 0,
  //   paddingVertical: 0,
  // },
  containerOuter: {
    flex: 1,
    // alignItems: '',
    // justifyContent: 'flex-start',
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
    paddingHorizontal: 20,
    paddingTop: 0,
    // paddingBottom: 203, //ZenPhone 203 - MotorolaEdge 420
  },
  hideButton: {
    alignItems: "center",
    height: 10,
    width: 10,
    paddingVertical: 0,
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
    // backgroundColor: GlobalStyles.colors.BG_InputField,
  },
  cardTitle: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: GlobalStyles.colors.BG_DarkBlue,
  },
  cardText: {
    fontSize: 30,
    color: GlobalStyles.colors.Text_Main,
    fontWeight: "bold",
  },
  cardSmalltext: {
    fontSize: 18,
    color: GlobalStyles.colors.Text_Main,
  },
  version: {
    fontSize: 10,
    color: GlobalStyles.colors.Text_Main,
  },
  containerInput: {
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 0,
    marginBottom: 0,
  },
  containerButton: {
    alignItems: "center",
    paddingVertical: 4,
    marginBottom: 20,
  },
  containerMessage: {
    alignItems: "center",
    paddingVertical: 4,
    marginBottom: 10,
  },
  text: {
    margin: 5,
  },
  textAlert: {
    margin: 5,
    color: GlobalStyles.colors.TextAlert,
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    margin: 5,
  },
  inputText: {
    borderWidth: 2,
    borderColor: GlobalStyles.colors.BG_DarkBlue,
    backgroundColor: GlobalStyles.colors.BG_InputField,
    color: GlobalStyles.colors.Text_Input,
    textDecorationColor: GlobalStyles.colors.Text_Main,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 4, // controlla l’altezza
    width: 200,
    height: 40,         // altezza fissa
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GlobalStyles.colors.BG_DarkBlue,
    backgroundColor: GlobalStyles.colors.BG_InputField,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 0, // controlla l’altezza
    width: 200,
    height: 40,        // stessa altezza del campo utente
  },
  toggleButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // uguale al contenitore
    width: 30, // larghezza minima per cliccare
  },
  toggleButtonText: {
    color: GlobalStyles.colors.Text_Main,
    fontSize: 14,
  },
  passwordInput: {
    flex: 1,
    color: GlobalStyles.colors.Text_Input,
    backgroundColor: GlobalStyles.colors.BG_InputField,
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: '100%',
  },
});
