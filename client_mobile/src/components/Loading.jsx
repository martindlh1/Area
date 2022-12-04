import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size="large" color="#4461F2" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
});

export default Loading;