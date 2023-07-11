import { useState } from "react";
import { Alert } from "react-native";
import { View, TextInput, Button, StyleSheet } from "react-native";
import styles from "./InputCSS";

function NeonatoInput({valore, funzione}) {
  const [enteredNeonatoText, setEnteredNeonatoText] = useState("");

  console.log('INPUT-NEONATO: ', valore);

  function goalInputHandler(enteredText) {
    // console.log(enteredText);
    setEnteredNeonatoText(enteredText);
  }

  function addNeonatoHandler() {
    // console.log(enteredNeonatoText);
    // Alert.alert('NNN');
    funzione.onSetNeonato(enteredNeonatoText);
    // setEnteredNeonatoText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Scansiona neonato"
        style={styles.textInput}
        onChangeText={goalInputHandler}
        onSubmitEditing={addNeonatoHandler}
        value={enteredNeonatoText}
      ></TextInput>
      {/* <Button title="Add Neo" onPress={addNeonatoHandler}></Button> */}
    </View>
  );
}

export default NeonatoInput;

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
