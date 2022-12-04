import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function ToggleButton({ value, onValueChange }) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { flexDirection: value ? "column" : "column-reverse" },
      ]}
      onPress={onValueChange}
    >
      <View style={styles.square} />
      <Text style={styles.text}>{value ? "ON" : "OFF"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#474554",
    borderRadius: 12,
    width: 40,
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
  },
  square: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
});
