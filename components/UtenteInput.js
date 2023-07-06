import { useState } from "react";
import { Alert } from "react-native";
import { View, TextInput, Button, StyleSheet } from "react-native";
import styles from "./InputCSS";

function UtenteInput(proprieta) {
  const [enteredUtenteText, setEnteredUtenteText] = useState("");

  function goalInputHandler(enteredText) {
    // console.log(enteredText);
    setEnteredUtenteText(enteredText);
  }

  function addUtenteHandler() {
    // console.log(enteredUtenteText);
    // Alert.alert('UUU');
    proprieta.onSetUtente(enteredUtenteText);
    // setEnteredUtenteText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Scansiona utente"
        style={styles.textInput}
        onChangeText={goalInputHandler}
        onSubmitEditing={addUtenteHandler}
        value={enteredUtenteText}
      ></TextInput>
      {/* <Button title="Add Ute" onPress={addUtenteHandler}></Button> */}
    </View>
  );
}

export default UtenteInput;

// const styles = StyleSheet.create({
//   inputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingBottom: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: "#cccccc",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#ff0000",
//     width: "80%",
//     marginRight: 8,
//     padding: 8,
//   },
// });
