import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { getSession } from "../components/http";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";

function LoginScreen({ navigation }) {
  const [errorHTTP, setErrorHTTP] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [message, setmessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isInputOk, setIsInputOk } = useState(true);
  const [url, setUrl] = useState("");
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
    return <LoadingOverlay></LoadingOverlay>
  }

  async function getSessionHandler() {
    console.log("+++++++++++++++++++++++++++++");
    console.log("GetSession1: ");

    setIsAuthenticated(true);
    wait(2000);
    const [sessionIDData, messageData, cognome, nome] = await getSession(
      usr,
      pwd,
      url
    );
    setIsAuthenticated(false);

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

  return (
    // <SafeAreaView>
    <ScrollView>
      <View style={styles.containerOuter}>
        <View style={styles.cardTitle}>
          <Text style={styles.cardText}>LOGIN</Text>
          <Text style={[styles.cardText, styles.cardSmalltext]}>
            Inserire le credenziali di Neocare
          </Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputText}
            onChangeText={urlInputHandler}
            value={url}
            placeholder="URL"
          />
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
              color="#0A0AFC"
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
                color="#0A0AFC"
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
    backgroundColor: "#24F3EF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardTitle: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // paddin: 80,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "#ff0000",
    backgroundColor: "#0A0AFC",
  },
  cardText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  cardSmalltext: {
    fontSize: 18,
    color: "white",
    // fontWeight: "bold",
  },
  containerInput: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#056B38",
  },
  containerButton: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 4,
    marginBottom: 20,
    backgroundColor: "#9BCE0D",
  },
  containerMessage: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 4,
    marginBottom: 20,
    backgroundColor: "#9BCE0D",
  },
  text: {
    margin: 5,
  },
  textAlert: {
    margin: 5,
    color: "#ff0000",
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    margin: 5,
  },

  inputText: {
    borderWidth: 2,
    borderColor: "#0A0AFC",
    backgroundColor: "white",
    color: "black",
    textDecorationColor: "white",
    margin: 5,
    padding: 4,
    minWidth: 200,
  },
});
