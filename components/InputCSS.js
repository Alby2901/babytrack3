import {StyleSheet} from 'react-native';

/* CSS della Tastiera */

export default StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingBottom: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: "#cccccc",
      },
      textInput: {
        borderWidth: 1,
        borderColor: "#ff0000",
        width: "70%",
        marginRight: 8,
        padding: 8,
      },
})