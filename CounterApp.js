import React, { useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  const deCount = () => {
    setCount(count - 1);
  };
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="add" onPress={addCount} />
      <Button title="dec" onPress={deCount} />
    </View>
  );
};

export default CounterApp;
