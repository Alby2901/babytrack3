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
import AuthContentProvider, { AuthContext } from "../store/auth-context";

function InputScreen({ navigation }) {
  const [utente, setUtente] = useState("");
  const [neonato, setNeonato] = useState("");
  const [genitore, setGenitore] = useState("");
  const [latteculla, setLatteCulla] = useState("");

  const authCtx = useContext(AuthContext);

  console.log("Input Screen 1 =>>", authCtx.isAuthenticated);
  console.log("Input Screen 2 =>>", authCtx.sessionID);
  console.log("Input Screen 3 =>>", authCtx.cognome);
  console.log("Input Screen 4 =>>", authCtx.nome);

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

  function VerificaGenitore() {
    const n = JSON.stringify(neonato);
    const g = JSON.stringify(genitore);

    console.log("Neonato: ", { neonato });
    console.log("Genitore: ", { genitore });

    if (neonato === "") {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il neonato!");
    } else if (genitore === "") {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il genitore!");
    } else {
      if (neonato === genitore) {
        Alert.alert(
          "RICONOSCIMENTO CORRETTO",
          "Il riconoscimento Neonato <=> Genitore è stato eseguito correttamente"
        );
      } else {
        Alert.alert(
          "RICONOSCIMENTO ERRATO",
          "ATENZIONE riconoscimento Neonato <=> Genitore ERRATO!"
        );
      }
    }
  }

  function VerificaLatteCulla() {
    const n = JSON.stringify(neonato);
    const l = JSON.stringify(latteculla);

    console.log("Neonato: ", n);
    console.log("LatteCulla: ", l);

    if (neonato === "") {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il neonato!");
    } else if (latteculla === "") {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il latte/culla!");
    } else {
      if (neonato === latteculla) {
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
    setUtente("");
    setNeonato("");
    setGenitore("");
    setLatteCulla("");
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.containerOuter}>
          <View style={styles.container}>
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
              <Text style={styles.text}>Neonato: {neonato}</Text>
              <NeonatoInput onSetNeonato={setNeonatoHandler} />
              <Text style={styles.text}>Genitore: {genitore}</Text>
              <GenitoreInput onSetGenitore={setGenitoreHandler} />
              <Text style={styles.text}>Latte/Culla: {latteculla}</Text>
              <LatteCullaInput onSetLatteCulla={setLatteCullaHandler} />
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <Button title="Genitore" onPress={VerificaGenitore}></Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Latte/Culla"
                  onPress={VerificaLatteCulla}
                ></Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Reset" onPress={Reset}></Button>
              </View>
            </View>

            <View style={styles.buttonsContainer3}>
              <Button
                title="Logout"
                onPress={authCtx.logout}
                color='#ff0000'
              />
            </View>

            <View style={styles.buttonsContainer2}>
              <Button
                title="Login Screen"
                onPress={() => navigation.navigate("Login")}
                color='#94941f'
              />
              <Button
                title="Scan Screen"
                onPress={() => navigation.navigate("Scan")}
                color='#94941f'
              />
            </View>
          </View>
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
    justifyContent: "center",
    backgroundColor: "#0000ff",
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
    backgroundColor: "#0000ff",
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
