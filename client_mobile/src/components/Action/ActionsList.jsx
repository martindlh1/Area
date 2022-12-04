import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import ActionCard from "./ActionCard";

export default function ActionsList({
  navigation,
  type,
  service,
  actions,
  clickable,
  onErrorPress,
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={actions}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            {...(clickable
              ? {
                  onPress: () =>
                    navigation.navigate("SingleAction", {
                      action: item,
                      service: service,
                      type: type,
                    }),
                }
              : {
                  onPress: () => onErrorPress(),
                })}
          >
            <ActionCard service={service} action={item} />
          </TouchableOpacity>
        )}
      />
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
