import { StyleSheet, View } from "react-native";
import React from "react";
import ServicesList from "../components/Services/ServicesList";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServicesPage({ route, navigation }) {
  const { type } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        navigation={navigation}
        title={"Services"}
        back
        profile={false}
        onBackPress={() => navigation.navigate("CreateForm")}
      />
      <View style={{ flex: 1 }}>
        <ServicesList type={type} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
