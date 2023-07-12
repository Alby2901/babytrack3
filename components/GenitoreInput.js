import { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import styles from "./InputCSS";

function GenitoreInput(proprieta) {
  const [enteredGenitoreText, setEnteredGenitoreText] = useState("");

  console.log('Comp.GenitInput: ', proprieta.val);

  // useEffect(() => {
  //   setEnteredGenitoreText(proprieta.val)
  // })

  function goalInputHandler(enteredText) {
    // console.log(enteredText);
    setEnteredGenitoreText(enteredText);
  }

  function addGenitoreHandler() {
    // console.log(enteredGenitoreText);
    // Alert.alert('GGG');
    proprieta.onSetGenitore(enteredGenitoreText);
    // setEnteredGenitoreText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Scansiona genitore"
        style={styles.textInput}
        onChangeText={goalInputHandler}
        onSubmitEditing={addGenitoreHandler}
        value={enteredGenitoreText}
      ></TextInput>
      {/* <Button title="Add Gen" onPress={addGenitoreHandler}></Button> */}
    </View>
  );
}

export default GenitoreInput;
