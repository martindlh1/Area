import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import Home from "../../assets/home.png";
import Add from "../../assets/add.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Lock from "../../assets/padlock.png";

export default function TabBoottom({
  navigation,
  direction,
  getBack,
  adminRoute,
}) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.bar}>
      <TouchableOpacity onPress={() => navigation.navigate(getBack)}>
        <Image
          source={Home}
          style={{ width: 40, height: 40, tintColor: "#4461F2" }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(direction)}>
        <Image
          source={Add}
          style={{ width: 40, height: 40, tintColor: "#4461F2" }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(adminRoute)}>
        <Image
          source={Lock}
          style={{ width: 40, height: 40, tintColor: "black" }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#4461F2",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 50,
    paddingVertical: -30,
    position: "absolute",
    bottom: 20,
  },
});
