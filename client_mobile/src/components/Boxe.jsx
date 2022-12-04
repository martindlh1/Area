import {
  Image,
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";

export default function Boxe(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#00FF00" }}
        thumbColor={isEnabled ? "white" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4461F2",
    borderRadius: 25,
    padding: 10,
    width: 300,
    height: 120,
  },
  text: {
    color: "white",
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
  },
});
