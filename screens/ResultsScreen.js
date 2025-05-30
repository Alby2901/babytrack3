import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../UI/GlobalConstant";

function ResultsScreen({ route, navigation }) {
  // console.log("ResultsScreen navigation:", navigation);
  // console.log("ResultsScreen route.params:", route.params);

  const { titolo, testo1, testo2, testobottone, testo3, testo4, colore } = route.params;
  return (
    <View style={styles.centeredView}>
      <View style={[styles.modalView, {borderColor: colore}]}>
        <Text style={styles.modalTitle}>{JSON.stringify(titolo).slice(1,-1)}</Text>
        <Text style={styles.modalText}>{JSON.stringify(testo1).slice(1,-1)}</Text>
        <Text style={styles.modalText}>{JSON.stringify(testo2).slice(1,-1)}</Text>
        <Pressable
          style={[styles.button, {backgroundColor: colore}]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textStyle}>{JSON.stringify(testobottone).slice(1,-1)}</Text>
        </Pressable>
        <Text style={styles.msgText}>{JSON.stringify(testo3).slice(1,-1)}</Text>
        <Text style={styles.msgText}>{JSON.stringify(testo4).slice(1,-1)}</Text>
      </View>
    </View>
  );
}

export default ResultsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: GlobalStyles.colors.BG_App_Blue,
  },
  modalView: {
    marginBottom: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 10,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    marginBottom: 10
  },
  buttonClose: {
    backgroundColor: GlobalStyles.colors.BG_Blue,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  msgText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 8,
  },
});
