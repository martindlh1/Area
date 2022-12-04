import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Close from "../../assets/close.png";
import HomePage from "../pages/HomePage";
import BasicButton from "./BasicButton";

const Error = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  <View style={styles.container}>
    <Image source={Close} />
    <Text style={styles.text}>Error</Text>
    <BasicButton
      title="Sign out"
      customStyle={{ margin: 10 }}
      onPress={HomePage}
    />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#4461F2",
  },
});

export default Error;
