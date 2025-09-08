import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Greeting = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const sayHello = () => {
    if (name.trim()) {
      setGreeting(`Hello, ${name}!`);
    }
  };

  const clearGreeting = () => {
    setGreeting("");
    setName("");
  };
  return (
    <View style={styles.con}>
      <Text style={styles.title}>Greeting App</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Button title="Say Hello" onPress={sayHello} />

      {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}
      <Button title="Clear" onPress={clearGreeting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  greeting: {
    fontSize: 20,
    color: "blue",
    margin: 20,
    fontWeight: "bold",
  },
});

export default Greeting;
