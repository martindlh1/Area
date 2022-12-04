import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import BasicInput from "../components/BasicInput";
import { useFonts } from "expo-font";
import axios from "axios";
import BasicButton from "../components/BasicButton";

export default function AdressIPPage({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });
  const [adress, setAdress] = React.useState(axios.defaults.baseURL);

  const setAxiosAdress = () => {
    axios.defaults.baseURL = adress;
    if (route.params?.initialRoute) {
      navigation.navigate(route.params.initialRoute);
    } else {
      navigation.navigate("Login");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.img} />
      <Text style={styles.text}>Change the server adress</Text>
      <BasicInput
        value={adress}
        customStyle={{ textAlign: "center" }}
        onChangeText={(value) => setAdress(value)}
      />
      <BasicButton
        title="Save"
        onPress={setAxiosAdress}
        customStyle={{ margin: 20 }}
      />
      {route.params?.initialRoute && (
        <BasicButton
          title="Exit"
          onPress={() => navigation.navigate(route.params.initialRoute)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
  img: {
    width: 300,
    height: 105,
    marginBottom: 40,
  },
});
