// components/UI/ScreenContainer.js

import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet, TouchableWithoutFeedback,Keyboard } from "react-native";

function ScreenContainer({ children }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}  // puoi regolare se serve
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"  // 👈 importantissimo!!
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ScreenContainer;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "#CAF0F8", // o GlobalStyles se vuoi uniformare
  },
});
