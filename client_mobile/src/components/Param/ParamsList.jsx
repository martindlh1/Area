import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import ActionCard from "./ParamCard";
import ParamCard from "./ParamCard";

export default function ParamsList({
  navigation,
  service,
  params,
  setParam,
  paramValue,
}) {
  return (
    <View style={styles.container}>
      {params.map((param, index) => (
        <ParamCard
          key={index}
          service={service}
          param={param}
          setParam={setParam}
          paramValue={paramValue}
          index={index}
        />
      ))}
      {/* <FlatList
        data={params}
        renderItem={({ item, index }) => (
          <ParamCard
            key={index}
            service={service}
            param={item}
            setParam={setParam}
            paramValue={paramValue}
            index={index}
          />
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
