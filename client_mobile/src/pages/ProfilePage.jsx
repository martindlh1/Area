import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import ServicesList from "../components/Services/ServicesList";
import BasicWebView from "../components/BasicWebView";
import { getData } from "../api/handleToken";
import Header from "../components/Header";
import BasicButton from "../components/BasicButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ProfilePage({ navigation }) {
  const [uri, setUri] = useState("");
  const [url, setUrl] = useState("");
  const [webView, setWebView] = useState(false);
  const [reload, setReload] = useState(false);
  const [localServiceName, setLocalServiceName] = useState("");

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  const handleServiceLogin = async (serviceName) => {
    const token = await getData();
    setUri(`/service/${serviceName}/auth?jwt=${token}&callback=rnsuccess`);
    setWebView(true);
    setLocalServiceName(serviceName);
  };

  useEffect(() => {
    if (url.includes("http://localhost:8080")) {
      setWebView(false);
      axios
        .get(url.split("http://localhost:8080")[1])
        .then((res) => {
          setReload(true);
        })
        .catch((err) => {
          setReload(true);
        });
    }
  }, [url]);

  useEffect(() => setReload(false), [reload]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Profile"} profile={false} back={false} />
      <BasicButton
        title="Sign out"
        customStyle={{ margin: 10 }}
        onPress={signOut}
      />
      <BasicButton
        title="Change server adress"
        customStyle={{ margin: 10, backgroundColor: "black" }}
        onPress={() => navigation.navigate("Adress", { initialRoute: "App" })}
      />
      {webView && (
        <BasicWebView
          uri={uri}
          onExitClick={() => setWebView(false)}
          onUrlChange={(value) => setUrl(value)}
        />
      )}
      <View style={{ flex: 1 }}>
        <ServicesList
          onServiceLogin={handleServiceLogin}
          parentReload={reload}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
