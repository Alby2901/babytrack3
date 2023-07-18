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
import { GlobalStyles } from "../UI/GlobalConstant";

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
          <View style={styles.userContainer}>
            <Text style={styles.textUtenteSmall}>Buongiorno</Text>
            <Text style={styles.textUtente}>{cognomeNome}</Text>
            <Text style={styles.textSessione}>
              (Sessione: {authCtx.sessionID})
            </Text>
            {/* <UtenteInput onSetUtente={setUtenteHandler} /> */}
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.buttonsScanContainer}>
              <View style={styles.buttonScanContainer}>
                <Button
                  title="Scan Neonato"
                  onPress={() => navigation.navigate("ScanNeo")}
                  color="#94941f"
                />
              </View>
              <Text style={styles.text}>Neonato: {authCtx.neonato}</Text>
            </View>
            <View style={styles.buttonsScanContainer}>
              <View style={styles.buttonScanContainer}>
                <Button
                  title="Scan Genitore"
                  onPress={() => navigation.navigate("ScanGen")}
                  color="#94941f"
                />
              </View>
              <Text style={styles.text}>Genitore: {authCtx.genitore}</Text>
            </View>
            <View style={styles.buttonsScanContainer}>
              <View style={styles.buttonScanContainer}>
                <Button
                  title="Scan Latte"
                  onPress={() => navigation.navigate("ScanLat")}
                  color="#94941f"
                />
              </View>
              <Text style={styles.text}>Latte/Culla: {authCtx.latte}</Text>
            </View>

            {ret && <Text style={styles.text}>Ret: {ret}</Text>}
            {message && <Text style={styles.text}>Msg: {message}</Text>}
            {childN && <Text style={styles.text}>ChildN: {childN}</Text>}
            {motherN && <Text style={styles.text}>MotherN: {motherN}</Text>}
          </View>

          <View style={styles.buttonsContainer1}>
            <View style={styles.buttonContainer}>
              <Button title="Chk Genitore" onPress={VerificaGenitore} color={GlobalStyles.colors.BG_DarkBlue}></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Chk Latte" onPress={VerificaLatteCulla} color={GlobalStyles.colors.BG_DarkBlue}></Button>
            </View>
          </View>

          <View style={styles.buttonsContainer2}>
            <View style={styles.buttonResetContainer}>
              <Button title="Reset" onPress={Reset} color={GlobalStyles.colors.Buton_Reset}></Button>
            </View>
            <View style={styles.buttonLogoutContainer}>
              <Button title="Logout" onPress={authCtx.logout} color={GlobalStyles.colors.Buton_Logout} />
            </View>
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
    // justifyContent: "center",
    paddingBottom: 200,
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
  },
  userContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: GlobalStyles.colors.BG_DarkBlue,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 50,
    minWidth: 280,
  },
  inputsContainer: {
    flex: 4,

    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 300,
    minWidth: 280,
  },
  buttonsScanContainer: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 8,
    minWidth: 250,
  },
  buttonScanContainer: {
    marginBottom: 10,
  },
  buttonsContainer1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 4,
    marginVertical: 2,
    width: 280,
  },
  buttonsContainer2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 4,
    width: 280,
  },
  buttonContainer: {
    minWidth: 120,
  },
  buttonResetContainer: {
    backgroundColor: GlobalStyles.colors.Buton_Reset,
    minWidth: 120,
  },
  buttonLogoutContainer: {
    backgroundColor: GlobalStyles.colors.Buton_Logout,
    minWidth: 120,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textUtente: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  textUtenteSmall: {
    fontSize: 18,
    // fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  textSessione: {
    fontSize: 10,
    fontWeight: "bold",
    color: "gray",
  },
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
