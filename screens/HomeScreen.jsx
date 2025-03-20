import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Switch
        style={{ marginBottom: 10 }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={() => {
          setIsEnabled((previousState) => !previousState);
        }}
      />
      <View style={styles.container}>
        {isEnabled ? (
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text>Go to Profile</Text>
          </Pressable>
        ) : (
          <Text>Navigation is disabled</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: 400,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 0.5,
  },
});
