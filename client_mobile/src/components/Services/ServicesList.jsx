import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { removeData } from "../../api/handleToken";
import ServiceCard from "./ServiceCard";
import { FlatList } from "react-native-gesture-handler";

export default function ServicesList({
  type,
  navigation,
  onServiceLogin,
  parentReload,
}) {
  const [services, setLocalServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const handleServiceLogin = (serviceName) => {
    onServiceLogin(serviceName);
  };

  useEffect(() => {
    axios
      .get("/service")
      .then((res) => {
        setLocalServices(res.data);
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
    setReload(false);
  }, [reload, parentReload]);

  if (loading) {
    return <Text>Loading</Text>;
  } else if (error) {
    return <Text>Error</Text>;
  } else {
    return (
      <View style={styles.container}>
        {navigation ? (
          <FlatList
            data={services}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("SingleService", {
                    service: item,
                    type: type,
                  })
                }
              >
                <ServiceCard
                  service={item}
                  onServiceLogin={handleServiceLogin}
                  handleReload={() => setReload(true)}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <ServiceCard
                service={item}
                login
                onServiceLogin={handleServiceLogin}
                handleReload={() => setReload(true)}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
