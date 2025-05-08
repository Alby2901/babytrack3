import {
  Text, View, StyleSheet, Button, TextInput, ScrollView,
} from "react-native";

import { useContext, useState, useLayoutEffect, useEffect } from "react";
import ScreenContainer from "../UI/ScreenContainer";
import { AuthContext } from "../store/auth-context";
import { GlobalStyles } from "../UI/GlobalConstant";


function SettingAccessScreen({ navigation }) {
  // console.log("SettingAccessScreen navigation:", navigation);
  // console.log("SettingAccessScreen route.params:", route.params);


  const [message, setMessage] = useState();
  const [errorHTTP, setErrorHTTP] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [pwd, setPwd] = useState("");
  const [isAutorized, setIsAutorized] = useState(false);

  const authCtx = useContext(AuthContext);

  const message1 = <></>;

  function getSessionHandler() {
    console.log("Setting Access Screen +++++++++++++++++++++++++++++");
    console.log("Setting Access Screen - pwd: ", pwd);

    if (pwd) {

      if (pwd == '123456') {
        console.log('From Settin Access Screen => Open setting screen... ');
        setIsAutorized(true)
        navigation.navigate('Settings');
      } else {
        console.log('From Settin Access Screen - else...   ');

        const messageWrongPwd = (
          <>
            <Text style={styles.textAlert}>ATTENZIONE!</Text>
            <Text style={styles.textAlert}>Password errata!</Text>
          </>)

          ;
        setMessage(messageWrongPwd);
        console.log('From Settin Access Screen - message', message);
        setIsAutorized(false)
      }
    } else {
      const messageWrongPwd = <></>;
      setMessage(messageWrongPwd);
    }
  }

  function resetIsLogged() {
    setIsLogged(false);
  }

  function pwdInputHandler(enteredPwd) {
    if (!enteredPwd) {
      const messageWrongPwd = <></>;
      setMessage(messageWrongPwd);
    }
    setPwd(enteredPwd);
  }

  return (
    <ScreenContainer>
      {/* <ScrollView> */}
        <View style={[styles.containerOuter]}>

          <View style={styles.cardTitle}>
            <Text style={styles.cardText}>Accesso</Text>
            <Text style={styles.cardText}>Configurazione </Text>
            <Text style={[styles.cardText, styles.cardSmalltext]}>
              Inserire la passord per accedere alla configurazione
            </Text>
          </View>

          <View style={styles.containerInput}>
            <TextInput
              style={styles.inputText}
              onChangeText={pwdInputHandler}
              value={pwd}
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>

          {!isLogged && (
            <View style={styles.containerButton}>
              {/* <Text style={styles.text}>Test chiamate HTTP...</Text> */}
              <Button
                style={styles.button}
                title="Entra"
                color={GlobalStyles.colors.BG_DarkBlue}
                onPress={getSessionHandler}
              ></Button>
            </View>
          )}

          <View style={styles.containerMessage}>
            {message}
          </View>

        </View>
      {/* </ScrollView> */}
    </ScreenContainer>

  );
}

export default SettingAccessScreen;

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    // alignItems: '',
    // justifyContent: 'flex-start',
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 244,
    // paddingBottom: 203, //ZenPhone 203 - MotorolaEdge 420
  },
  hideButton: {
    alignItems: "center",

    height: 10,
    width: 10,
    paddingVertical: 0,
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
  },
  cardTitle: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: GlobalStyles.colors.BG_DarkBlue,
  },
  cardText: {
    fontSize: 30,
    color: GlobalStyles.colors.Text_Main,
    fontWeight: "bold",
  },
  cardSmalltext: {
    fontSize: 18,
    paddingLeft: 10,
    color: GlobalStyles.colors.Text_Main,
  },
  containerInput: {
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 0,
    marginBottom: 0,
  },
  containerButton: {
    alignItems: "center",
    paddingVertical: 4,
    marginBottom: 20,
  },
  containerMessage: {
    alignItems: "center",
    paddingVertical: 4,
    marginBottom: 10,
  },
  text: {
    margin: 5,
  },
  textAlert: {
    margin: 5,
    color: GlobalStyles.colors.TextAlert,
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    margin: 5,
  },

  inputText: {
    borderWidth: 2,
    borderColor: GlobalStyles.colors.BG_DarkBlue,
    backgroundColor: GlobalStyles.colors.BG_InputField,
    color: GlobalStyles.colors.Text_Input,
    textDecorationColor: GlobalStyles.colors.Text_Main,
    margin: 5,
    padding: 4,
    minWidth: 200,
  },
});
