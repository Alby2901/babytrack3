import { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import styles from "./InputCSS";

function LatteCullaInput(proprieta) {
  const [enteredLatteCullaText, setEnteredLatteCullaText] = useState("");
  
 // console.log('Comp.LatteInput: ', proprieta.val);

  // useEffect(() => {
  //   setEnteredLatteCullaText(proprieta.val)
  // })

    // 1. Aggiunta della gestione della proprietà 'reset'
  useEffect(() => {
    if (proprieta.reset) {
      setEnteredLatteCullaText(""); // Resetta il testo inserito
      proprieta.onSetLatteCulla(""); // Resetta il valore nel componente genitore
    }
  }, [proprieta.reset, proprieta.onSetLatteCulla]); // Aggiunte le dipendenze

  
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
