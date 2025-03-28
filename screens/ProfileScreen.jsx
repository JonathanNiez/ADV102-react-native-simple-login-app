import { StyleSheet, View, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { auth } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

export default function ProfileScreen({ navigation }) {
  function logoutUser() {
    Swal.fire({
      title: "Log out",
      icon: "question",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut().then(() => {
          navigation.navigate("Login");
        });
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {auth.currentUser.email}</Text>
      <CustomButton title="Logout" onPress={logoutUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
});
