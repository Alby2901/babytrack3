import { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import styles from "./InputCSS";

function NeonatoInput(proprieta) {
  const [enteredNeonatoText, setEnteredNeonatoText] = useState("");

  console.log('Comp.NeonatInput: ', proprieta.val);

  // useEffect(() => {
  //   setEnteredNeonatoText(proprieta.val)
  // })

  function goalInputHandler(enteredText) {
    // console.log(enteredText);
    setEnteredNeonatoText(enteredText);
  }

  function addNeonatoHandler() {
    // console.log(enteredNeonatoText);
    // Alert.alert('NNN');
    proprieta.onSetNeonato(enteredNeonatoText);
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
