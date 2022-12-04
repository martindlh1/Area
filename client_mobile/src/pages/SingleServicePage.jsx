import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "../components/Services/ServiceCard";
import ActionsList from "../components/Action/ActionsList";
import { getData, removeData } from "../api/handleToken";
import { useFonts } from "expo-font";
import Header from "../components/Header";
import BasicWebView from "../components/BasicWebView";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function SingleServicePage({ route, navigation }) {
  const { service, type } = route.params;
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("");
  const [webView, setWebView] = useState(false);
  const [reload, setReload] = useState(false);
  const [apiService, setApiService] = useState({});
  const [errorPress, setErrorPress] = useState(false);
  const [uri, setUri] = useState("");

  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    axios
      .get(`/service/${service.name}/${type}`)
      .then((res) => {
        setActions(res.data);
        axios
          .get(`/service/${service.name}`)
          .then((res) => {
            setApiService(res.data);
            setLoading(false);
          })
          .catch((err) => {
            if (err.response.data === "Unauthorized") {
              removeData();
              navigation.navigate("Login");
            }
            setLoading(false);
            setError(true);
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          removeData();
          navigation.navigate("Login");
        }
        setLoading(false);
        setError(true);
        console.log(err);
      });
    setReload(false);
  }, [reload]);

  const handleErrorPress = () => {
    setErrorPress(true);
    setTimeout(() => {
      setErrorPress(false);
    }, 1000);
  };

  const handleServiceLogin = async (serviceName) => {
    const token = await getData();
    setUri(`/service/${serviceName}/auth?jwt=${token}&callback=rnsuccess`);
    setWebView(true);
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

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    if (apiService.loged) {
      return (
        <SafeAreaView style={styles.container}>
          <Header
            navigation={navigation}
            title={service.title}
            back
            onBackPress={() =>
              navigation.navigate("Services", {
                service: service,
                type: type,
              })
            }
          />
          {webView && (
            <BasicWebView
              uri={uri}
              onExitClick={() => setWebView(false)}
              onUrlChange={(value) => setUrl(value)}
            />
          )}
          <ServiceCard
            service={apiService}
            login
            handleReload={() => setReload(true)}
          />
          <ActionsList
            navigation={navigation}
            type={type}
            service={apiService}
            actions={actions}
            clickable
          />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={[styles.container, { flex: 1 }]}>
          <Header
            navigation={navigation}
            title={service.title}
            back
            onBackPress={() =>
              navigation.navigate("Services", { service: service, type: type })
            }
          />
          {webView && (
            <BasicWebView
              uri={uri}
              onExitClick={() => setWebView(false)}
              onUrlChange={(value) => setUrl(value)}
            />
          )}
          <View style={[styles.needConnectContainer]}>
            <Text
              style={[
                styles.needConnectText,
                { color: errorPress ? "red" : "black" },
              ]}
            >
              Veuillez vous connecter pour accéder à la liste des {type}
            </Text>
          </View>
          <ServiceCard
            service={apiService}
            login
            onServiceLogin={handleServiceLogin}
          />
          <ActionsList
            navigation={navigation}
            type={type}
            service={apiService}
            actions={actions}
            clickable={false}
            onErrorPress={handleErrorPress}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  needConnectContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    padding: 20,
  },
  needConnectText: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
});
