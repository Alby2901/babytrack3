import { StyleSheet } from 'react-native';
import { GlobalStyles } from "../UI/GlobalConstant";

/* CSS della Tastiera */

export default StyleSheet.create({
  inputContainer: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "center",
    alignItems: 'baseline',
    paddingBottom: 0,
    margin: 0,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'red',
    borderColor: GlobalStyles.colors.Button_Scan_Dark,
    borderRadius: 10,
    minWidth: 240,
    // width: "75%",
    margin: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: GlobalStyles.colors.Button_Scan,
    color: 'white',
  },
})