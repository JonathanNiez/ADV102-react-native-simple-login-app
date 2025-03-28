import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

export default function TableScreen() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  async function addItem() {
    if (!itemName.trim()) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Item name cannot be empty",
      });
      return;
    }

    try {
      const newItem = {
        name: itemName,
        description: `Desription: ${itemName}`,
      };

      const docRef = doc(collection(db, "items"));
      await setDoc(docRef, newItem);
      console.log("Document written with ID: ", docRef.id);

      setItems((prevItems) => [...prevItems, { id: docRef.id, ...newItem }]);
      setItemName("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function fetchItems() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />
      <CustomButton title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.emptyMessage}>Loading...</Text>
          ) : (
            <Text style={styles.emptyMessage}>
              No items available. Add some!
            </Text>
          )
        }
        contentContainerStyle={items.length === 0 && styles.emptyContainer}
      />
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
  list: {
    width: "100%",
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
