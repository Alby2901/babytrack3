import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { View, TextInput, Button, StyleSheet } from "react-native";
import styles from "./InputCSS";

function LatteCullaInput(proprieta) {
  const [enteredLatteCullaText, setEnteredLatteCullaText] = useState("");
  
  console.log('Comp.LatteInput: ', proprieta.val);

  // useEffect(() => {
  //   setEnteredLatteCullaText(proprieta.val)
  // })
  
  function goalInputHandler(enteredText) {
    // console.log(enteredText);
    setEnteredLatteCullaText(enteredText);
  }

  function addLatteCullaHandler() {
    // console.log(enteredLatteCullaText);
    // Alert.alert('LLL');
    if (proprieta.val != null){
      proprieta.onSetLatteCulla(proprieta.val);
    } else {
      proprieta.onSetLatteCulla(enteredLatteCullaText);
      // setEnteredLatteCullaText("");
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Scansiona culla o latte"
        placeholderTextColor='white'
        style={styles.textInput}
        onChangeText={goalInputHandler}
        onSubmitEditing={addLatteCullaHandler}
        value={enteredLatteCullaText}
      ></TextInput>
      {/* <Button title="Add Lat" onPress={addLatteCullaHandler}></Button> */}
    </View>
  );
}

export default LatteCullaInput;
