import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomCard from "../components/CustomCard";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    if (!email || !password) {
      setError("Please enter username and password");
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoading(false);
          const user = userCredential.user;
          navigation.navigate("Home");
          console.log(user.uid);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          console.log(errorCode, errorMessage);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase App</Text>
      <CustomCard>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          editable={!loading}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          editable={!loading}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}
        {loading ? (
          <View>
            <ActivityIndicator size="large" />
            <Text>Please wait...</Text>
          </View>
        ) : (
          <CustomButton title="Login" onPress={handleLogin} />
        )}
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text>Not a member? Register here</Text>
        </Pressable>
      </CustomCard>
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
    fontWeight: "bold",
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
    backgroundColor: "#00a2ff",
    padding: 10,
    borderRadius: 5,
    cursor: "pointer",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
