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
        borderWidth: 2,
        borderColor: "#ff0000",
        borderRadius: 10,
        width: "90%",
        marginRight: 8,
        padding: 8,
      },
})