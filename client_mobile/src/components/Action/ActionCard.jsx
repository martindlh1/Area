import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function ActionCard({ service, action, style, logo }) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (logo) {
    return (
      <View
        style={[
          styles.withLogoContainer,
          { backgroundColor: service.color },
          style,
        ]}
      >
        <Image source={{ uri: service.logo }} style={styles.img} />
        <Text style={styles.text}>{action.desc}</Text>
      </View>
    );
  } else {
    return (
      <View
        style={[styles.container, { backgroundColor: service.color }, style]}
      >
        <Text style={styles.text}>{action.desc}</Text>
      </View>
    );
  }
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
  withLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 270,
    height: 200,
    borderRadius: 10,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    width: 200,
  },
  img: {
    width: 30,
    height: 30,
  },
});
