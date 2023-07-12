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

function LoginScreen({ navigation }) {
  const [errorHTTP, setErrorHTTP] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [message, setmessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [url, setUrl] = useState("");
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");

  const authCtx = useContext(AuthContext);

  async function getSessionHandler() {
    console.log("+++++++++++++++++++++++++++++");
    console.log("GetSession1: ");
    
    const [sessionIDData, messageData, cognome, nome] = await getSession(usr, pwd, url);
    // const sessId = await getSession(usr, pwd, url);
    
    console.log('SessId: ', sessionIDData);
    authCtx.authenticate(sessionIDData, cognome, nome);
    console.log('Ctx.sessionID: ', authCtx.sessionID);
    console.log('Ctx.isAuthenticated: ', authCtx.isAuthenticated);

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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.containerOuter}>
          <View style={styles.containerUp}>
            <Text>This is the Login Screen</Text>
            <Button
              title="Input Screen"
              onPress={() => navigation.navigate("Input")}
            />
            <Button
              title="Scan Screen"
              onPress={() => navigation.navigate("Scan")}
            />
          </View>
          <View style={styles.containerDown}>
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
              placeholder="Password"
            />
            <Text style={styles.text}>Test chiamate HTTP...</Text>
            <Button
              style={styles.button}
              title="Chek utente"
              onPress={getSessionHandler}
            ></Button>
            {/* <Text>The Session ID is: {sessionID}</Text> */}
            {isLogged && <Text>The Message is: {message}</Text>}
            {isLogged && sessionID && (
              <Text>The Session ID is: {sessionID}</Text>
            )}
            {isLogged && !sessionID && (
              <Text style={styles.textAlert} cd>
                The Session ID is not avaiable!
              </Text>
            )}
            {(isLogged || errorHTTP) && (
              <Button
                style={styles.button}
                title="Annulla... "
                onPress={resetIsLogged}
              ></Button>
            )}
            {errorHTTP && (
              <Text style={styles.textAlert} cd>
                Server is not responding!
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddin: 40,
    backgroundColor: "#0099ff",
  },
  containerUp: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddin: 80,
    marginTop: 150,
    marginBottom: 20,
    // backgroundColor: "#00ff00",
  },
  containerDown: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddin: 20,
    marginTop: 20,
    marginBottom: 200,
    // backgroundColor: "#ff0000",
  },
  text: {
    margin: 5,
  },
  textAlert: {
    margin: 5,
    color: "#ff0000",
  },
  button: {
    margin: 5,
  },

  inputText: {
    borderWidth: 2,
    borderColor: "#ff0000",
    backgroundColor: "white",
    color: "black",
    textDecorationColor: "white",
    margin: 5,
    padding: 4,
    width: 100,
  },
});
