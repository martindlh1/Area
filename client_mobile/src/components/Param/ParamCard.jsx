import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import BasicInput from "../BasicInput";
import { TextInput } from "react-native-gesture-handler";

export default function ParamCard({
  service,
  param,
  setParam,
  paramValue,
  index,
}) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: service.color }]}>
      <Text style={styles.text}>{param.desc}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize={false}
        autoComplete="off"
        autoCorrect={false}
        onChangeText={(value) => setParam(value, index)}
        value={paramValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 150,
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#4f555a",
    backgroundColor: "#eaf0f7",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    width: 200,
    margin: 8,
  },
});
