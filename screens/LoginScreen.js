import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { getSession } from "../components/http";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { GlobalStyles } from "../UI/GlobalConstant";

function LoginScreen({ navigation }) {
  const [errorHTTP, setErrorHTTP] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [message, setmessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showConfigInput, setshowConfigInput] = useState(true);
  const { isInputOk, setIsInputOk } = useState(true);
  const [url, setUrl] = useState("http://130.0.151.40:8090/babysafe/login");
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");

  const authCtx = useContext(AuthContext);

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
    console.log("+++++++++++++++++++++++++++++");
    console.log("GetSession1: ");

    // setIsAuthenticated(true);
    // wait(2000);
    const [sessionIDData, messageData, cognome, nome] = await getSession(
      usr,
      pwd,
      url
    );
    // setIsAuthenticated(false);

    console.log("SessId: ", sessionIDData);
    authCtx.authenticate(sessionIDData, cognome, nome);
    console.log("Ctx.sessionID: ", authCtx.sessionID);
    console.log("Ctx.isAuthenticated: ", authCtx.isAuthenticated);

    console.log("GetSession2: ");
    setSessionID(sessionIDData);
    console.log("GetSession3: ");
    setmessage(messageData);
    console.log("GetSession4: ");
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

  function showConfigInputHandler(){
    setshowConfigInput(!showConfigInput)
  }

  return (
    // <SafeAreaView>
    <ScrollView>
      <View style={styles.containerOuter}>
        <Pressable onPress={showConfigInputHandler}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardText}>LOGIN</Text>
            <Text style={[styles.cardText, styles.cardSmalltext]}>
              Inserire le credenziali di Neocare
            </Text>
          </View>
        </Pressable>
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
            {/* <Text>The Session ID is: {sessionID}</Text> */}

            {/* {!isInputOk && <Text style={styles.textAlert}>I CAMPI SONO VUOTI!</Text>} */}

            {isLogged && <Text style={styles.textAlert}>ATTENZIONE!</Text>}
            {isLogged && <Text style={styles.textAlert}>{message}</Text>}

            {/* {isLogged && sessionID && <Text style={styles.textAlert}>The Session ID is: {sessionID}</Text>} */}
            {/* {isLogged && !sessionID && (
          <Text style={styles.textAlert}>
            The Session ID is not avaiable!
          </Text>
        )} */}
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
    paddingBottom: 420,
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
