import { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import styles from "./InputCSS";

function NeonatoInput(proprieta) {
  const [enteredNeonatoText, setEnteredNeonatoText] = useState("");

  // console.log('NEONATOINPUT Component - propietà.val: ', proprieta.val);

  // useEffect(() => {
  //   setEnteredNeonatoText(proprieta.val)
  // })

  function goalInputHandler(enteredText) {
    // console.log(enteredText);
    setEnteredNeonatoText(enteredText);
  }

  function addNeonatoHandler() {
    console.log('NEONATOINPUT Component - enteredNeonatoText', enteredNeonatoText);
    // Alert.alert('NNN', enteredNeonatoText );
    proprieta.onSetNeonato(enteredNeonatoText);
    // setEnteredNeonatoText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Scansiona neonato"
        placeholderTextColor='white'
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
