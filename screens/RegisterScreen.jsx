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
import { auth, db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleRegister() {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (confirmPassword !== password) {
      setError("Passwords do not match");
      return;
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          addUserDataToFirestore(user);
          console.log(user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage;
          switch (errorCode) {
            case "auth/email-already-in-use":
              errorMessage = "This email is already in use.";
              break;
            case "auth/invalid-email":
              errorMessage = "Please enter a valid email address.";
              break;
            case "auth/weak-password":
              errorMessage = "Password should be at least 6 characters.";
              break;
            default:
              errorMessage = "An unexpected error occurred. Please try again.";
          }
          setError(errorMessage);
          console.log(errorCode, error.message);
          setLoading(false);
        });
    }
  }

  async function addUserDataToFirestore(user) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });
      setError("");
      navigation.navigate("Login");
      console.log("User added to Firestore");
    } catch (firestoreError) {
      setLoading(false);
      console.error("Error adding user to Firestore:", firestoreError);
      setError("Failed to save user data. Please try again.");
      return;
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          editable={!loading}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}
        {loading ? (
          <View>
            <Text>Please wait...</Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <CustomButton title="Register" onPress={handleRegister} />
        )}
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text>Already a member? Login here</Text>
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
