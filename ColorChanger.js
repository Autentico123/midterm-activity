import React, { useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

const ColorChanger = () => {
  const [bgColor, setBgColor] = useState("white");

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>Tap a button to change color!</Text>
      <Button title="Pink" onPress={() => setBgColor("pink")} />
      <Button title="lightgreen" onPress={() => setBgColor("lightgreen")} />
      <Button title="lightblue" onPress={() => setBgColor("skyblue")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default ColorChanger;
