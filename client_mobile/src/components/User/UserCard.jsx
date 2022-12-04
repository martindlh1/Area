import { StyleSheet, Switch, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import DeleteButton from "../DeleteButton";

export default function AreaCard({ area, onDeleteClick, onToggle }) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button}>
      <DeleteButton onPress={() => onDeleteClick(area._id)} />
      <Text style={styles.text}>{area.name}</Text>
      <Switch
        ios_backgroundColor="black"
        trackColor="black"
        style={styles.switch}
        value={area.on}
        onValueChange={() => onToggle(area._id, area.on)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#4461f2",
    borderRadius: 10,
    padding: 16,
    width: 250,
    height: 75,
    margin: 14,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
  },
  switch: {},
});
