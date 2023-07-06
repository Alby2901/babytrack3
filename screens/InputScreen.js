import React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import UtenteInput from "../components/UtenteInput";
import NeonatoInput from "../components/NeonatoInput";
import GenitoreInput from "../components/GenitoreInput";
import LatteCullaInput from "../components/LatteCullaInput";

function InputScreen({ navigation }) {
  const [utente, setUtente] = useState("");
  const [neonato, setNeonato] = useState("");
  const [genitore, setGenitore] = useState("");
  const [latteculla, setLatteCulla] = useState("");

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
    console.log('Neonato: '+ {neonato})
    console.log('Genitore: '+ {genitore})
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

  function VerificaLatteCulla() {
    console.log('Neonato: '+ {neonato}.toString())
    console.log('LatteCulla: '+ {latteculla}.toString())
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

  function Reset(){
    setUtente('');
    setNeonato('');
    setGenitore('');
    setLatteCulla('');

  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Input Screen</Text>
        </View>
        <View style={styles.inputsContainer}>
          <UtenteInput onSetUtente={setUtenteHandler} />
          <Text style={styles.text}>Utente: {utente}</Text>
          <NeonatoInput onSetNeonato={setNeonatoHandler} />
          <Text style={styles.text}>Neonato: {neonato}</Text>
          <GenitoreInput onSetGenitore={setGenitoreHandler} />
          <Text style={styles.text}>Genitore: {genitore}</Text>
          <LatteCullaInput onSetLatteCulla={setLatteCullaHandler} />
          <Text style={styles.text}>Latte/Culla: {latteculla}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Genitore" onPress={VerificaGenitore}></Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Latte/Culla" onPress={VerificaLatteCulla}></Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={Reset}></Button>
          </View>
        </View>
      </View>
      <Button
        title="Login Screen"
        onPress={() => navigation.navigate("Login")}
      />
      <Button title="Scan Screen" onPress={() => navigation.navigate("Scan")} />
    </View>
  );
}

export default InputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputsContainer: {
    flex: 4,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#00ff00",
    // marginTop: 40,
    padding: 10,
    // height: 400,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0000ff",
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
    // fontSize: 10,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
