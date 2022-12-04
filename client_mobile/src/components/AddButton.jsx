import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AddIcon from "../../assets/add.png";
import { useFonts } from "expo-font";

export default function AddButton(props) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Image style={styles.icon} source={AddIcon} />
      <Text style={styles.text}>
        Add {props.type === "action" ? "Action" : "REAction"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4461f2",
    width: 220,
    height: 75,
    borderRadius: 10,
    margin: 10,
  },
  icon: {
    margin: 10,
    width: 30,
    height: 30,
  },
  text: {
    margin: 10,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "white",
  },
});
