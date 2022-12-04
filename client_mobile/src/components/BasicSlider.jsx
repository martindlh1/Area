import { StyleSheet, Text } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

export default function BasicSlider(props) {
  return (
    <Slider
      style={styles.slider}
      minimumValue={5}
      maximumValue={500}
      step={1}
      minimumTrackTintColor="#4461F2"
      maximumTrackTintColor="#4461F215"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  slider: {
    width: 200,
    height: 30,
  },
});
