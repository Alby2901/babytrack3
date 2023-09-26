import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { getSession } from "../components/http";
import { useContext, useState, useLayoutEffect, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { GlobalStyles } from "../UI/GlobalConstant";
import IconButton from '../UI/IconButton';
import { setObjectToStore } from '../store/StoreDataLocal';

function LoginScreen({ navigation }) {
  const [errorHTTP, setErrorHTTP] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [message, setmessage] = useState("");
  const [serverSetted, setServerSetted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showConfigInput, setshowConfigInput] = useState(false);
  const { isInputOk, setIsInputOk } = useState(true);
  const [url, setUrl] = useState("http://37.159.251.165:8090");

  // ----------------------------
  // ELIMINARE IL DEFAULT!
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  // ----------------------------

  const authCtx = useContext(AuthContext);

  function headerSettingsIconPressHandler() {
    console.log('From Login Screen => Open setting screen... ');
    navigation.navigate('SettingAccess');
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="settings-outline"
            size={24}
            color={(authCtx.mode == 'Prod' || authCtx.mode == 'Prod-Manual' ? GlobalStyles.colors.BG_Blue : 'white')}
            // onPress={() => {}}
            onPress={headerSettingsIconPressHandler}
          />)
      }
    });
  }, [navigation, headerSettingsIconPressHandler]);


  useEffect(() => {
    if (authCtx.urlsetted) {
      setUrl(authCtx.urlsetted);
      setServerSetted(true);
      setUsr(authCtx.user);
      console.log('LOGIN_SCREEN => useEffect => authCtx.user: ', usr)
    } else {
      setServerSetted(false);
    };
  }, [authCtx.urlsetted, authCtx.user, authCtx.mode])

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

    authCtx.setUser(usr);
    const valObj = { url_address: url, mode_status: authCtx.mode, user_status: usr };
    console.log('Login Screen => Store di local Obj: ', valObj);
    await setObjectToStore(authCtx.key1, valObj);


    setIsAuthenticated(true);
    // wait(2000);
    const [sessionIDData, messageData, cognome, nome] = await getSession(
      usr,
      pwd,
      url
    );
    setIsAuthenticated(false);

    console.log("Login Screen SessId: ", sessionIDData);
    authCtx.authenticate(sessionIDData, 2, cognome, nome);
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
    // <SafeAreaView>
    <ScrollView>
      <View style={[styles.containerOuter, { paddingBottom: (authCtx.mode == 'Prod' ? 203 : 378) }]}>
        <Pressable onPress={showConfigInputHandler}>
          <View style={styles.hideButton}></View>
        </Pressable>

        <View style={styles.cardTitle}>
          <Text style={styles.cardText}>LOGIN</Text>
          <Text style={[styles.cardText, styles.cardSmalltext]}>
            Inserire le credenziali di Neocare
          </Text>
        </View>

        <View >
          {serverSetted ? <Text >Server: {authCtx.urlsetted} </Text> : <Text >ATTENZIONE! Server non impostato</Text>}
        </View>

        <View style={styles.containerInput}>
          {showConfigInput && (
            <TextInput
              style={styles.inputText}
              onChangeText={urlInputHandler}
              value={url}
              placeholder="URL"
            />
          )}
          <TextInput
            style={styles.inputText}
            onChangeText={usrInputHandler}
            value={usr}
            placeholder="Utente"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={pwdInputHandler}
            value={pwd}
            secureTextEntry={true}
            placeholder="Password"
          />
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
                onPress={resetIsLogged}
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
    </ScrollView>
    // </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    // alignItems: '',
    // justifyContent: 'flex-start',
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
    paddingHorizontal: 20,
    paddingTop: 20,
    // paddingBottom: 203, //ZenPhone 203 - MotorolaEdge 420
  },
  hideButton: {
    alignItems: "center",

    height: 10,
    width: 10,
    paddingVertical: 0,
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
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
    padding: 4,
    minWidth: 200,
  },
});
