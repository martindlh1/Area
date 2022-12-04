import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
export default function DeleteButton(props) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Image source={require("../../assets/delete.png")} style={styles.img} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#474554",
    borderRadius: 12,
    width: 40,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 25,
    height: 25,
  },
});
