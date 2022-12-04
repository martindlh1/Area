import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BasicInput from "./BasicInput";
import { useFonts } from "expo-font";

export default function BasicAlertPrompt({
  visible,
  title,
  onChangeText,
  textValue,
  onCancel,
  onConfirm,
}) {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>{title}</Text>
        <BasicInput
          customStyle={styles.input}
          placeholder={title}
          onChangeText={onChangeText}
          value={textValue}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#00000095",
  },
  content: {
    zIndex: 110,
    backgroundColor: "#4461f2",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    width: 350,
    height: 250,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 300,
  },
  input: {
    textAlign: "center",
  },
  titleText: {
    fontFamily: "Poppins-Medium",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    width: 300,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    width: 100,
    height: 50,
  },
});
