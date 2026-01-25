import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "pp_locations_v1";

export default function AdminAddLocationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [restrooms, setRestrooms] = useState("1");

  const saveLocation = async () => {
    if (!name.trim() || !address.trim() || !city.trim() || !state.trim()) {
      Alert.alert("Missing info", "Please fill in Name, Address, City, and State.");
      return;
    }

    const num = parseInt(restrooms, 10);
    if (Number.isNaN(num) || num < 0) {
      Alert.alert("Restrooms invalid", "Restrooms must be a number (0 or more).");
      return;
    }

    const newLoc = {
      id: String(Date.now()),
      name: name.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      restrooms: num,
    };

    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      const updated = [newLoc, ...existing];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      Alert.alert("Saved ✅", `${newLoc.name} added.`);
      // safer than goBack (prevents GO_BACK warning)
      navigation.navigate("Locations");
    } catch (e) {
      Alert.alert("Save failed", "Please try again.");
    }
  };

  const cancel = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Locations");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      contentContainerStyle={{ padding: 24, paddingTop: 60 }}
    >
      <Text style={{ fontSize: 26, fontWeight: "900", marginBottom: 14 }}>
        Add Location
      </Text>

      {[
        ["Name", name, setName, "Coffee Shop D"],
        ["Address", address, setAddress, "500 Sunset Blvd"],
        ["City", city, setCity, "Burbank"],
        ["State", state, setState, "CA"],
        ["# Restrooms", restrooms, setRestrooms, "2"],
      ].map(([label, val, setter, placeholder]) => (
        <View key={label} style={{ marginBottom: 14 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#374151", marginBottom: 6 }}>
            {label}
          </Text>

          <TextInput
            value={val}
            onChangeText={setter}
            placeholder={placeholder}
            keyboardType={label === "# Restrooms" ? "number-pad" : "default"}
            autoCapitalize={label === "State" ? "characters" : "words"}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 12,
              fontSize: 16,
            }}
          />
        </View>
      ))}

      <Pressable
        onPress={saveLocation}
        style={{
          marginTop: 10,
          backgroundColor: "#2563EB",
          borderRadius: 18,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          Save Location
        </Text>
      </Pressable>

      <Pressable
        onPress={cancel}
        style={{
          marginTop: 12,
          backgroundColor: "#111827",
          borderRadius: 18,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          Cancel
        </Text>
      </Pressable>
    </ScrollView>
  );
}
