import { useEffect, useState } from "react";
import { View, TextInput} from "react-native";
import styles from "./InputCSS";

function NeonatoInput(proprieta) {
  const [enteredNeonatoText, setEnteredNeonatoText] = useState("");

  // console.log('NEONATOINPUT Component - propietà.val: ', proprieta.val);

  // useEffect(() => {
  //   setEnteredNeonatoText(proprieta.val)
  // })

  // 1. Aggiunta della gestione della proprietà 'reset'
  useEffect(() => {
    if (proprieta.reset) {
      setEnteredNeonatoText(""); // Resetta il testo inserito
      proprieta.onSetNeonato(""); // Resetta il valore nel componente genitore
    }
  }, [proprieta.reset, proprieta.onSetNeonato]); // Aggiunte le dipendenze

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
