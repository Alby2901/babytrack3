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
import { GlobalStyles } from "../UI/GlobalConstant";
import { setObjectToStore } from '../store/StoreDataLocal';
import LoadingOverlay from "../UI/LoadingOverlay";
import IconButton from '../UI/IconButton';

function SettingAccessScreen({ navigation }) {
  // const [sessionID, setSessionID] = useState("");
  // const [serverSetted, setServerSetted] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [showConfigInput, setshowConfigInput] = useState(false);
  // const { isInputOk, setIsInputOk } = useState(true);
  // const [url, setUrl] = useState("http://37.159.251.165:8090");

  const [message, setMessage] = useState();
  const [errorHTTP, setErrorHTTP] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [pwd, setPwd] = useState("");
  const [isAutorized, setIsAutorized] = useState(false);

  const authCtx = useContext(AuthContext);

  const message1 = <></>;
  // setMessage(message1);

  function getSessionHandler() {
    console.log("Setting Access Screen +++++++++++++++++++++++++++++");
    console.log("Setting Access Screen - pwd: ", pwd);

    if (pwd) {

      if (pwd == '123456') {
        console.log('From Settin Access Screen => Open setting screen... ');
        setIsAutorized(true)
        navigation.navigate('Settings');
      } else {
        console.log('From Settin Access Screen - else...   ');
        const message2 = [
            <Text style={styles.textAlert}>ATTENZIONE! Password errata!</Text>
        ];
        setMessage(message2);
        console.log('From Settin Access Screen - message', message);
        setIsAutorized(false)
      }
    } else {
      const message2 = <></>;
      setMessage(message2);
    }
  }

  function resetIsLogged() {
    setIsLogged(false);
  }

  function pwdInputHandler(enteredPwd) {
    if (!enteredPwd) {
      const message2 = <></>;
      setMessage(message2);
    }
    setPwd(enteredPwd);
  }

  return (
    <ScrollView>
      <View style={[styles.containerOuter]}>

        <View style={styles.cardTitle}>
          <Text style={styles.cardText}>Accesso</Text>
          <Text style={styles.cardText}>Configurazione </Text>
          <Text style={[styles.cardText, styles.cardSmalltext]}>
            Inserire la passord per accedere alla configurazione
          </Text>
        </View>

        <View style={styles.containerInput}>
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
              title="Entra"
              color={GlobalStyles.colors.BG_DarkBlue}
              onPress={getSessionHandler}
            ></Button>
          </View>
        )}

        <View style={styles.containerMessage}>
          {message}
          {/* {pwd && !isAutorized &&  <Text style={styles.textAlert}>ATTENZIONE!</Text>} */}
          {/* {pwd && message} */}
        </View>



        {/* {isLogged && (
          <View style={styles.containerMessage}>
            <Text>The Session ID is: {sessionID}</Text>
            {!isAutorized && pwd && <Text style={styles.textAlert}>ATTENZIONE!</Text>}
            {isAutorized && pwd && <Text style={styles.textAlert}>{message}</Text>}

          </View>
        )} */}

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
  );
}

export default SettingAccessScreen;

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    // alignItems: '',
    // justifyContent: 'flex-start',
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 395,
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
