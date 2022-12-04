import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function BasicButton(props) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={[styles.container, props.customStyle]} {...props}>
      <Text style={styles.button}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4461f2",
    borderRadius: 10,
    width: 280,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "white",
  },
});
