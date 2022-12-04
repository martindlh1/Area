import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import DeleteButton from "../DeleteButton";
import ToggleButton from "../ToggleButton";

export default function AreaCard({ area, onDeleteClick, onToggle }) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DeleteButton
        onPress={() => {
          onDeleteClick(area._id);
        }}
      />
      <Text style={styles.text}>{area.name}</Text>
      <ToggleButton
        value={area.on}
        onValueChange={() => onToggle(area._id, area.on)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#4461f2",
    borderRadius: 10,
    padding: 16,
    width: 325,
    height: 100,
    margin: 14,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    width: 200,
  },
});
