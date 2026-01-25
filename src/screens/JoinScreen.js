import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MEMBERSHIP_KEY = "pp_member_active_v1";
const SIGNUP_DATE_KEY = "pp_signup_date_v1";

// ✅ TEMP code(s) for beta testing
const VALID_CODES = ["PP2026", "P&P2026", "JACK25"];

export default function JoinScreen({ navigation }) {
  const [code, setCode] = useState("");

  const activate = async () => {
    const cleaned = code.trim().toUpperCase();

    const isValid = VALID_CODES.map((c) => c.toUpperCase()).includes(cleaned);
    if (!isValid) {
      Alert.alert("Invalid code", "Please check your membership code and try again.");
      return;
    }

    try {
      await AsyncStorage.setItem(MEMBERSHIP_KEY, "true");

      let signup = await AsyncStorage.getItem(SIGNUP_DATE_KEY);
      if (!signup) {
        signup = new Date().toISOString();
        await AsyncStorage.setItem(SIGNUP_DATE_KEY, signup);
      }

      Alert.alert("Welcome ✅", "Membership activated!");
      navigation.navigate("Card");
    } catch (e) {
      Alert.alert("Error", "Could not activate. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F3EE", padding: 24, paddingTop: 60 }}>
      <Text style={{ fontSize: 28, fontWeight: "900", color: "#111827" }}>Join P&amp;P</Text>
      <Text style={{ marginTop: 8, fontSize: 14, color: "#6B7280" }}>
        Enter your membership code to activate.
      </Text>

      <View
        style={{
          marginTop: 18,
          backgroundColor: "#FFFFFF",
          borderRadius: 18,
          borderWidth: 1,
          borderColor: "#E7E1D9",
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "700", color: "#6B7280" }}>
          Membership Code
        </Text>

        <TextInput
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
          placeholder="Example: PP2026"
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: 18,
            backgroundColor: "#FAFAFA",
          }}
        />
      </View>

      <Pressable
        onPress={activate}
        style={{
          marginTop: 18,
          backgroundColor: "#0F766E",
          borderRadius: 22,
          paddingVertical: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          Activate Membership
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Card")}
        style={{
          marginTop: 12,
          backgroundColor: "#111827",
          borderRadius: 22,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          Go to Card
        </Text>
      </Pressable>

      <Text style={{ marginTop: 16, fontSize: 12, color: "#6B7280" }}>
        Beta codes for testing: PP2026 / JACK25
      </Text>
    </View>
  );
}
