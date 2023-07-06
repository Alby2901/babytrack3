import { useState } from "react";
import { Alert } from "react-native";
import { View, TextInput, Button, StyleSheet } from "react-native";
import styles from "./InputCSS";

function GenitoreInput(proprieta) {
  const [enteredGenitoreText, setEnteredGenitoreText] = useState("");

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

// const styles = StyleSheet.create({
//   inputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingBottom: 24,
//     // borderBottomWidth: 1,
//     // borderBottomColor: "#cccccc",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#ff0000",
//     width: "80%",
//     marginRight: 8,
//     padding: 8,
//   },
// });
