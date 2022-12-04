import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function BasicInput(props) {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TextInput
      style={[styles.input, props.customStyle]}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "#4f555a",
    backgroundColor: "#eaf0f7",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 60,
    width: 280,
    margin: 8,
  },
});
