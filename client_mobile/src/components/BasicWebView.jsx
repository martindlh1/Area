import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import axios from "axios";

export default function BasicWebView({ uri, onUrlChange, onExitClick }) {
  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onExitClick}>
          <Image
            source={require("../../assets/cancel.png")}
            style={styles.buttonImg}
          />
        </TouchableOpacity>
        <WebView
          source={{ uri: axios.defaults.baseURL + uri }}
          userAgent="iOS"
          onNavigationStateChange={(navState) => onUrlChange(navState.url)}
          style={{ borderRadius: 10 }}
          onHttpError={(syntheticEvent) => {
            return null;
          }}
          onError={(syntheticEvent) => {
            return null;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    position: "relative",
    height: "90%",
    width: "90%",
    borderWidth: 2,
  },
  buttonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  buttonImg: {
    width: 40,
    height: 40,
    margin: 10,
  },
});
