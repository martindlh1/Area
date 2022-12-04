import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { getData } from "../../api/handleToken";
import BasicWebView from "../BasicWebView";
import axios from "axios";

export default function ServiceCard({
  service,
  login,
  onServiceLogin,
  handleReload,
}) {
  const [fontsLoaded] = useFonts({
    "Poppins-ExtraBold": require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const logoutService = () => {
    console.log(`/service/${service.name}/logout`);
    axios
      .get(`/service/${service.name}/logout`)
      .then((res) => {
        handleReload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: service.color }]}>
      <Image source={{ uri: service.logo }} style={styles.img} />
      <Text style={styles.text}>{service.title}</Text>
      {login && (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            if (service.loged) {
              logoutService();
            } else {
              onServiceLogin(service.name);
            }
          }}
        >
          <Text style={styles.loginText}>
            {service.loged ? "Log out" : " Log in"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    margin: 14,
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  text: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 24,
    color: "white",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
    width: 100,
    height: 40,
    borderColor: "white",
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 20,
  },
});
