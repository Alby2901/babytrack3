import React from "react";
import { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import UtenteInput from "../components/UtenteInput";
import NeonatoInput from "../components/NeonatoInput";
import GenitoreInput from "../components/GenitoreInput";
import LatteCullaInput from "../components/LatteCullaInput";
import { AuthContext } from "../store/auth-context";
import { getChkParent } from "../components/http";

function InputScreen({ navigation }) {
  const [utente, setUtente] = useState("");
  const [neonato, setNeonato] = useState("");
  const [genitore, setGenitore] = useState("");
  const [latteculla, setLatteCulla] = useState("");

  const [ret, setRet] = useState("");
  const [message, setMessage] = useState("");
  const [childN, setChildN] = useState("");
  const [motherN, setMotherN] = useState("");

  const authCtx = useContext(AuthContext);

  console.log("Input Screen isAuth =>>", authCtx.isAuthenticated);
  console.log("Input Screen SessID =>>", authCtx.sessionID);
  console.log("Input Screen Ut.Cognome =>>", authCtx.cognome);
  console.log("Input Screen Ut.Nome =>>", authCtx.nome);

  console.log("Input Screen BC Neo =>>", authCtx.neonato);
  console.log("Input Screen BC Gen =>>", authCtx.genitore);
  console.log("Input Screen BC Lat =>>", authCtx.latte);

  const cognomeNome = authCtx.cognome + " " + authCtx.nome;

  function setUtenteHandler(utenteBack) {
    setUtente(utenteBack);
  }

  function setNeonatoHandler(neonatoBack) {
    setNeonato(neonatoBack);
  }

  function setGenitoreHandler(genitoreBack) {
    setGenitore(genitoreBack);
  }
  function setLatteCullaHandler(lattecullaBack) {
    setLatteCulla(lattecullaBack);
  }

  async function VerificaGenitore() {
    const n = JSON.stringify(authCtx.neonato);
    const g = JSON.stringify(authCtx.genitore);

    console.log("N: ", n);
    console.log("G: ", g);

    console.log("Neonato: ", authCtx.neonato);
    console.log("Genitore: ", authCtx.genitore);

    if (authCtx.neonato === "" || authCtx.neonato == null) {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il neonato!");
    } else if (authCtx.genitore === "" || authCtx.genitore == null) {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il genitore!");
    } else {
      const [ret, messageData, childName, motherName] = await getChkParent(
        authCtx.sessionID,
        "2021025214",
        "322857"
      );

      setRet(ret);
      setMessage(messageData);
      setChildN(childName);
      setMotherN(motherName);

      if ((authCtx.neonato = authCtx.genitore)) {
        Alert.alert(
          "RICONOSCIMENTO CORRETTO",
          "Il riconoscimento Neonato <=> Genitore è stato eseguito correttamente"
        );
      } else {
        Alert.alert(
          "RICONOSCIMENTO ERRATO",
          "ATENZIONE riconoscimento Neonato <=> Genitore ERRATO! "
        );
      }
    }
  }

  function VerificaLatteCulla() {
    const n = JSON.stringify(neonato);
    const l = JSON.stringify(latteculla);

    console.log("Neonato: ", n);
    console.log("LatteCulla: ", l);

    if (authCtx.neonato === "" || authCtx.neonato == null) {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il neonato!");
    } else if (authCtx.latte === "" || authCtx.latte == null) {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il latte/culla!");
    } else {
      if ((authCtx.neonato = authCtx.latte)) {
        Alert.alert(
          "RICONOSCIMENTO CORRETTO",
          "Il riconoscimento Neonato <=> Culla/Latte è stato eseguito correttamente"
        );
      } else {
        Alert.alert(
          "RICONOSCIMENTO ERRATO",
          "ATENZIONE riconoscimento Neonato <=> Culla/Latte ERRATO!"
        );
      }
    }
  }

  function Reset() {
    authCtx.readNeonato(null);
    authCtx.readGenitore(null);
    authCtx.readLatte(null);

    setUtente("");
    setNeonato("");
    setGenitore("");
    setLatteCulla("");
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.containerOuter}>
          {/* <View style={styles.container}> */}
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>Input Screen</Text>
            </View>
            <View style={styles.userContainer}>
              <Text style={styles.textUtente}>{cognomeNome}</Text>
              <Text style={styles.textSessione}>
                Sessione: {authCtx.sessionID}
              </Text>
              {/* <UtenteInput onSetUtente={setUtenteHandler} /> */}
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.buttonsContainer4}>
                <Button
                  title="Scan Neo"
                  onPress={() => navigation.navigate("ScanNeo")}
                  color="#94941f"
                />
                <Text style={styles.text}>Neonato: {authCtx.neonato}</Text>
              </View>
              <View style={styles.buttonsContainer4}>
                <Button
                  title="Scan Gen"
                  onPress={() => navigation.navigate("ScanGen")}
                  color="#94941f"
                />
                <Text style={styles.text}>Genitore: {authCtx.genitore}</Text>
              </View>
              <View style={styles.buttonsContainer4}>
                <Button
                  title="Scan Lat"
                  onPress={() => navigation.navigate("ScanLat")}
                  color="#94941f"
                />
                <Text style={styles.text}>Latte/Culla: {authCtx.latte}</Text>
              </View>

              {ret && <Text style={styles.text}>Ret: {ret}</Text>}
              {message && <Text style={styles.text}>Msg: {message}</Text>}
              {childN && <Text style={styles.text}>ChildN: {childN}</Text>}
              {motherN && <Text style={styles.text}>MotherN: {motherN}</Text>}
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <Button
                  title="Chk Genitore"
                  onPress={VerificaGenitore}
                ></Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Chk Latte" onPress={VerificaLatteCulla}></Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Reset" onPress={Reset}></Button>
              </View>
            </View>
            <View style={styles.buttonsContainer3}>
              <Button title="Logout" onPress={authCtx.logout} color="#ff0000" />
            </View>
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default InputScreen;

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 100,
    backgroundColor: "#0099ff",
  },
  container: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: "center",
    // justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // height: 900,
    // marginTop: 40,
    // marginBottom: 80,
    // marginLeft: 10,
    // marginRight: 10,
    backgroundColor: "#ff0000",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00ffff",
    // marginTop: 40,
    padding: 10,
    // height: 400,
  },
  userContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#00ff00",
    // marginTop: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // height: 400,
  },
  inputsContainer: {
    flex: 4,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#00ff00",
    // marginTop: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 300,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF0505",
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 4,
    // height: 100,
  },
  buttonsContainer2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3DF28",
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 4,
    // height: 100,
  },
  buttonsContainer3: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0000ff",
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 4,
    // height: 100,
  },
  buttonsContainer4: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: "#07D974",
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 8,
    // marginHorizontal: 2,
    // height: 100,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#ff00ff",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textUtente: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSessione: {
    fontSize: 11,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
