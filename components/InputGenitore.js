import { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import styles from "./InputCSS";

function GenitoreInput(proprieta) {
  const [enteredGenitoreText, setEnteredGenitoreText] = useState("");

  // console.log('Comp.GenitInput: ', proprieta.val);

  // useEffect(() => {
  //   setEnteredGenitoreText(proprieta.val)
  // })

    // 1. Aggiunta della gestione della proprietà 'reset'
    useEffect(() => {
      if (proprieta.reset) {
        setEnteredGenitoreText(""); // Resetta il testo inserito
        proprieta.onSetGenitore(""); // Resetta il valore nel componente genitore
      }
    }, [proprieta.reset, proprieta.onSetGenitore]); // Aggiunte le dipendenze
  

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
        placeholderTextColor='white'
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
