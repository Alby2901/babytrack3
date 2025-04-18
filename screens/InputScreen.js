import React, { useEffect } from "react";
import { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable
} from "react-native";
import NeonatoInput from "../components/InputNeonato";
import GenitoreInput from "../components/InputGenitore";
import LatteCullaInput from "../components/InputLatteCulla";
import { AuthContext } from "../store/auth-context";
import { getChkBaby, getChkParent, checkSessionStatus } from "../components/http";
import { GlobalStyles } from "../UI/GlobalConstant";
import CountdownTimerAuto from "../components/CountdownTimerAuto";
import LoadingOverlay from "../UI/LoadingOverlay";

function InputScreen({ navigation }) {
  // console.log("InputScreen navigation:", navigation);
  // console.log("InputScreen route.params:", route.params);

  const [isloading, setIsloading] = useState(false);
  const [sessionActive, setSessionActive] = useState();

  const [neonato, setNeonato] = useState("");
  const [genitore, setGenitore] = useState("");
  const [latteculla, setLatteCulla] = useState("");

  const [resetNeonato, setResetNeonato] = useState(false);
  const [resetGenitore, setResetGenitore] = useState(false);
  const [resetLatteCulla, setResetLatteCulla] = useState(false);

  const [ret, setRet] = useState("");
  const [message, setMessage] = useState("");
  const [childN, setChildN] = useState("");
  const [motherN, setMotherN] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const authCtx = useContext(AuthContext);

  async function checkSession() {

    console.log('INPUT_SCR-CheckSession ----START----')
    console.log('INPUT_SCR-CheckSession ----SessionID: ', authCtx.sessionID)

    // setIsloading(true);
    const sessionState = await checkSessionStatus(
      authCtx.urlsetted,
      authCtx.sessionID,
    );
    // setIsloading(false);
    setSessionActive(sessionState ? 'Attiva' : 'Scaduta');

    console.log('INPUT_SCR-CheckSession ----Response: ', sessionState)
    console.log('INPUT_SCR-CheckSession ----THE END ----')

    return sessionState

  }

  // useEffect per il controllo della sessione 
  useEffect(() => {

    console.log('--------------- LOGIN SCR UseEffect START--------------------------------------');

    async function checkSession() {

      //   // setIsloading(true);
      const sessionState = await checkSessionStatus(
        authCtx.urlsetted,
        authCtx.sessionID,
      );
      // setIsloading(false);
      setSessionActive(sessionState ? 'Attiva' : 'Scaduta');
    }

    checkSession()

    console.log('--------------- LOGIN SCR UseEffect THE END --------------------------------------');

  }, [])

  // useEffect per il reset di NeonatoInput (nuovo)
  useEffect(() => {
    if (resetNeonato) {
      setResetNeonato(false); // Resetta lo stato dopo l'esecuzione
    }
    if (resetGenitore) {
      setResetGenitore(false); // Resetta lo stato dopo l'esecuzione
    }
    if (resetLatteCulla) {
      setResetLatteCulla(false); // Resetta lo stato dopo l'esecuzione
    }
  }, [resetNeonato, resetGenitore, resetLatteCulla]);

  if (isloading) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  console.log("Input Screen isAuth =>>", authCtx.isAuthenticated);
  console.log("Input Screen SessID =>>", authCtx.sessionID);
  console.log("Input Screen Timer =>>", authCtx.sessionTimer);
  console.log("Input Screen Ut.Cognome =>>", authCtx.cognome);
  console.log("Input Screen Ut.Nome =>>", authCtx.nome);

  console.log("Input Screen BC Neo =>>", authCtx.neonato);
  console.log("Input Screen BC Gen =>>", authCtx.genitore);
  console.log("Input Screen BC Lat =>>", authCtx.latte);

  const cognomeNome = authCtx.cognome + " " + authCtx.nome;

  function setNeonatoHandler(neonatoBack) {
    // console.log("Input Screen - NeonatoBack =>>", neonatoBack);
    setNeonato(neonatoBack);
    authCtx.readNeonato(neonatoBack)
  }
  function setGenitoreHandler(genitoreBack) {
    setGenitore(genitoreBack);
    authCtx.readGenitore(genitoreBack)
  }
  function setLatteCullaHandler(lattecullaBack) {
    setLatteCulla(lattecullaBack);
    authCtx.readLatte(lattecullaBack);
  }

  async function VerificaNeonato() {

    setIsloading(true);
    const sessionState = await checkSessionStatus(
      authCtx.urlsetted,
      authCtx.sessionID,
    );
    setIsloading(false);
    // setSessionActive(sessionState ? 'Attiva' : 'Scaduta');

    if (!sessionState) {
      Alert.alert(
        "Sessione Scaduta",
        "E' necessario effettuare nuovamente il login"
      );
    } else {

      if (authCtx.neonato === "" || authCtx.neonato == null) {
        Alert.alert("ASSENZA DATO", "Non è stato scansionato il neonato!");
      } else {
        setIsloading(true);
        const [ret, messageData, childName] = await getChkBaby(
          authCtx.urlsetted,
          authCtx.sessionID,
          authCtx.neonato,
        );
        setIsloading(false);

        setRet(ret);
        setMessage(messageData);
        setChildN(childName);

        if (ret === '0') {

          // setModalVisible(!modalVisible);
          navigation.navigate("ResultsScreen", {
            titolo: "RICONOSCIMENTO CORRETTO",
            testo1: "Neonato: " + childName,
            testo2: "",
            testo3: "Ret: " + ret,
            testo4: "Message: " + messageData,
            testobottone: "Chiudi",
            colore: 'green',
          });
        } else {
          navigation.navigate("ResultsScreen", {
            titolo: "RICONOSCIMENTO ERRATO",
            testo1: "Neonato non trovato!",
            testo2: "",
            testo3: "Ret: " + ret,
            testo4: "Message: " + messageData,
            testobottone: "Chiudi",
            colore: 'red',
          })
        };
        // Alert.alert(
        //   "RICONOSCIMENTO CORRETTO",
        //   // "Il riconoscimento Neonato <=> Genitore è stato eseguito correttamente"
        //   messageData +
        //   "\n\nBambino: " +
        //   childName
        // );
        Reset();
      }
    }
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

      setIsloading(true);
      const [ret, messageData, childName, motherName] = await getChkParent(
        authCtx.urlsetted,
        authCtx.sessionID,
        authCtx.neonato,
        authCtx.genitore
        // "2021025214",
        // "322857"
      );
      setIsloading(false);

      setRet(ret);
      setMessage(messageData);
      setChildN(childName);
      setMotherN(motherName);

      console.log("INPUT NAVIGATION authCtx.neonato =>>", authCtx.neonato);
      console.log("INPUT NAVIGATION authCtx.genitore =>>", authCtx.genitore);

      // if (ret === '0' && authCtx.neonato === authCtx.genitore) {
      if (ret === '0') {

        navigation.navigate("ResultsScreen", {
          titolo: "RICONOSCIMENTO CORRETTO",
          testo1: "Neonato: " + childName,
          testo2: "Genitore: " + motherName,
          testo3: "Ret: " + ret,
          testo4: "Message: " + messageData,
          testobottone: "Chiudi",
          colore: 'green',
        });
        // Alert.alert(
        //   "RICONOSCIMENTO CORRETTO",
        //   // "Il riconoscimento Neonato <=> Genitore è stato eseguito correttamente"
        //   messageData +
        //   "\n\nBambino: " +
        //   childName +
        //   "\n\nGenitore: " +
        //   motherName
        // );
      } else {
        navigation.navigate("ResultsScreen", {
          titolo: "RICONOSCIMENTO ERRATO",
          testo1: "Neonato  o genitore",
          testo2: "non trovati!",
          testo3: "Ret: " + ret,
          testo4: "Message: " + messageData,
          testobottone: "Chiudi",
          colore: 'red',
        })

        // Alert.alert(
        //   "RICONOSCIMENTO ERRATO",
        //   // "ATENZIONE riconoscimento Neonato <=> Genitore ERRATO! "
        //   messageData +
        //   "\n\nBambino: " +
        //   childName +
        //   "\n\nGenitore: " +
        //   motherName
        // );
      }
      Reset();
    }
  }

  async function VerificaLatteCulla() {
    const n = JSON.stringify(neonato);
    const l = JSON.stringify(latteculla);

    console.log("Neonato: ", n);
    console.log("LatteCulla: ", l);

    if (authCtx.neonato === "" || authCtx.neonato == null) {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il neonato!");
    } else if (authCtx.latte === "" || authCtx.latte == null) {
      Alert.alert("ASSENZA DATO", "Non è stato scansionato il latte/culla!");
    } else {
      if (authCtx.neonato === authCtx.latte) {
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
      Reset();
    }
  }

  async function scan(dataToScan) {
    const sessState = await checkSession();
    console.log('INPUT_SCR- SCAN Neonato - CheckSessio - Response: ', sessState);
    console.log('INPUT_SCR- SCAN - Parameter caller: ', dataToScan);
    let param = 0;
    if (dataToScan == 'baby') { param = 1 };
    if (dataToScan == 'parent') { param = 2 };
    if (dataToScan == 'milk') { param = 3 };

    if (sessState) {
      navigation.navigate("Scan", { scanElement: param, });
    } else {
      Alert.alert(
        "Sessione Scaduta!",
        "Premere \"LOGOUT\" ed effettuare nuovamente il LOGIN"
      )
    }
  }

  function Reset() {
    authCtx.readNeonato(null);
    authCtx.readGenitore(null);
    authCtx.readLatte(null);
    authCtx.readSessionTimer(null);

    setNeonato("");
    setGenitore("");
    setLatteCulla("");

    setResetNeonato(true);
    setResetGenitore(true);
    setResetLatteCulla(true);
    setTimeout(() => setResetNeonato(false), 100); // Resetta dopo un breve ritardo
  }
  function resetAndLogout() {
    Reset();
    authCtx.logout();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.containerOuter, { paddingBottom: (authCtx.mode.slice(0, 4) == 'Prod' ? 107 : 0) }]}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.centeredView1}>
                  <Text style={styles.modalTitle}>{JSON.stringify("RICONOSCIMENTO CORRETTO").slice(1, -1)}</Text>
                  <Text style={styles.modalText}>{JSON.stringify("Neonato: " + childN).slice(1, -1)}</Text>
                  <Text style={styles.modalText}>{JSON.stringify("").slice(1, -1)}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    // onPress={() => navigation.goBack()}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>{JSON.stringify("Chiudi").slice(1, -1)}</Text>
                  </Pressable>
                  <Text style={styles.msgText}>{JSON.stringify("Ret: " + ret).slice(1, -1)}</Text>
                  <Text style={styles.msgText}>{JSON.stringify("Message: " + message).slice(1, -1)}</Text>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.userContainer}>
            <Text style={styles.textUtenteSmall}>Buongiorno</Text>
            <Text style={styles.textUtente}>{cognomeNome}</Text>

            {(authCtx.mode.slice(0, 4) == 'Prod' ?
              <>
                <View style={styles.containerSessione}>
                  <Text style={styles.textSessione}>
                    La sessione scade tra </Text>
                  <CountdownTimerAuto style={styles.textSessione} />
                  <Text style={styles.textSessione}> minuti</Text>
                </View>
              </> :
              <>
                <View style={styles.containerSessione}>
                  <Text style={styles.textSessione}>
                    (Sessione: {authCtx.sessionID}) - </Text>
                  <CountdownTimerAuto style={styles.textSessione} />
                </View>
                <Text > --- {authCtx.urlsetted} --- </Text>
              </>
            )}
          </View>
          <View style={[styles.inputsContainer, { height: (authCtx.mode.slice(0, 4) == 'Prod' ? 250 : 350) }]}>

            <View style={styles.buttonsScanContainer}>
              {(authCtx.mode == 'Prod-Manual' ? null :
                <View style={styles.buttonScanContainer}>
                  <Button
                    title="Scan Neonato"
                    // onPress={scanNeonato.bind(this, 'baby')}
                    onPress={scan.bind(this, 'baby')}
                    color={GlobalStyles.colors.Button_Scan}
                  />
                </View>
              )}
              {(authCtx.mode == 'Prod-Manual' || authCtx.mode == 'Devel' ?
                (<NeonatoInput
                  style={styles.inputArea}
                  onSetNeonato={setNeonatoHandler}
                  reset={resetNeonato} // Passa la proprietà reset
                />)
                : null)}
              <Text style={styles.text}>Neonato: {authCtx.neonato}</Text>
            </View>


            <View style={styles.buttonsScanContainer}>
              {(authCtx.mode == 'Prod-Manual' ? null :
                <View style={styles.buttonScanContainer}>
                  <Button
                    title="Scan genitore"
                    // onPress={scanGenitore}
                    onPress={scan.bind(this, 'parent')}
                    color={GlobalStyles.colors.Button_Scan}
                  />
                </View>)}
              {(authCtx.mode == 'Prod-Manual' || authCtx.mode == 'Devel' ?
                <GenitoreInput
                  style={styles.inputArea}
                  onSetGenitore={setGenitoreHandler}
                  reset={resetGenitore}
                />
                : null)}
              <Text style={styles.text}>Genitore: {authCtx.genitore}</Text>
            </View>

            {(authCtx.mode.slice(0, 4) == 'Prod' ? null :
              <View style={styles.buttonsScanContainer}>
                {(authCtx.mode == 'Prod-Manual' ? null :
                  <View style={styles.buttonScanContainer}>
                    <Button
                      title="Scan Latte"
                      // onPress={scanLatte}
                      onPress={scan.bind(this, 'milk')}
                      color={GlobalStyles.colors.Button_Scan}
                    />
                  </View>)}
                {(authCtx.mode == 'Prod-Manual' || authCtx.mode == 'Devel' ?
                  <LatteCullaInput
                    style={styles.inputArea}
                    onSetLatteCulla={setLatteCullaHandler}
                    reset={resetLatteCulla}
                  />
                  : null)}
                <Text style={styles.text}>Latte/Culla: {authCtx.latte}</Text>
              </View>
            )}

            {/* {ret && <Text style={styles.text}>Ret: {ret}</Text>}
            {message && <Text style={styles.text}>Msg: {message}</Text>}
            {childN && <Text style={styles.text}>ChildN: {childN}</Text>}
            {motherN && <Text style={styles.text}>MotherN: {motherN}</Text>} */}
          </View>

          <View style={styles.buttonsContainer1}>
            <View style={styles.buttonContainer}>
              <Button
                title={"Chk \nNeonato"}
                onPress={VerificaNeonato}
                color={GlobalStyles.colors.BG_DarkBlue}
              ></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={"Chk \nGenitore"}
                onPress={VerificaGenitore}
                color={GlobalStyles.colors.BG_DarkBlue}
              ></Button>
            </View>

            {(authCtx.mode == 'Prod' ? null :
              <View style={styles.buttonContainer}>
                <Button
                  title={"Chk \nLatte"}
                  onPress={VerificaLatteCulla}
                  color={GlobalStyles.colors.BG_DarkBlue}
                ></Button>
              </View>
            )}
          </View>

          <View style={styles.buttonsContainer2}>
            <View style={styles.buttonResetContainer}>
              <Button
                title="Reset"
                onPress={Reset}
                color={GlobalStyles.colors.Button_Reset}
              ></Button>
            </View>
            <View style={styles.buttonLogoutContainer}>
              <Button
                title="Logout"
                onPress={resetAndLogout}
                color={GlobalStyles.colors.Button_Logout}
              />
            </View>
          </View>

          {(authCtx.mode.slice(0, 4) == 'Prod' ? null :
            <View style={styles.buttonsContainer2}>
              <View style={styles.buttonResetContainer}>
                <Button
                  title="Test Session"
                  onPress={checkSession}
                  color={GlobalStyles.colors.Button_Reset}
                ></Button>
              </View>
              <View >
                <Text>Sessione: {sessionActive}</Text>
              </View>
            </View>
          )}

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
    paddingBottom: 60,                     // OLD 200
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
    // height: 350,                          // OLD 350
    minWidth: 280,

    // borderColor: 'blue',
    // borderWidth: 1,
  },
  buttonsScanContainer: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 8,
    minWidth: 250,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  buttonScanContainer: {
    marginBottom: 2,
    // borderColor: 'Green',
    // borderWidth: 1,
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
    // borderColor: 'red',
    // borderWidth: 1,
    minWidth: 80,
    // minHeight: 80,
  },
  buttonResetContainer: {
    backgroundColor: GlobalStyles.colors.Button_Reset,
    minWidth: 120,
  },
  buttonLogoutContainer: {
    backgroundColor: GlobalStyles.colors.Button_Logout,
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
  containerSessione: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  textSessione: {
    fontSize: 10,
    fontWeight: "bold",
    color: "lightgray",
  },
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 186,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "yellow",
    backgroundColor: 'blue',
  },
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    minWidth: 280,
    // backgroundColor: 'red',
  },
  modalView: {
    margin: 0,
    height: 420,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  msgText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 8,
  },

  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    marginBottom: 10
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: GlobalStyles.colors.BG_Blue,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputArea: {
    minWidth: 100,
    // borderColor: 'Green',
    // borderWidth: 1,
    margin: 0,
    padding: 0,
  }
});
