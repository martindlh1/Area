import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import Profile from "../../assets/profileUser.png";
import Cross from "../../assets/cross.png";
import Arrow from "../../assets/arrow.png";
import Line from "../../assets/line.png";
import BackIcon from "../../assets/arrow.png";

export default function Header({
  navigation,
  title,
  direction,
  profile,
  back,
  getBack,
  onBackPress,
}) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (profile && back) {
    return (
      <View style={styles.user}>
        <TouchableOpacity onPress={() => navigation.navigate(getBack)}>
          <Image
            source={Arrow}
            style={{ width: 40, height: 40, tintColor: "#4461F2" }}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(direction)}>
          <Image source={Profile} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
    );
  } else if (back && !profile) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image source={BackIcon} style={styles.backButtonImg} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>{title}</Text>
          <Image source={Line} style={styles.lineLogo} />
        </View>
      </View>
    );
  } else if (profile) {
    return (
      <View style={styles.user}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(direction)}>
          <Image source={Profile} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", paddingTop: 30, paddingBottom: 10 }}>
        <Text style={styles.text}>{title}</Text>
        <Image source={Line} style={styles.lineLogo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#4461F2",
  },
  lineLogo: {
    alignItems: "center",
    width: 60,
    height: 5,
    borderRadius: 20,
  },
  container: {
    width: "100%",
    position: "relative",
    paddingTop: 30,
    paddingBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 0,
    marginHorizontal: 20,
    zIndex: 100,
    paddingTop: 30,
  },
  backButtonImg: {
    width: 40,
    height: 40,
  },
});
