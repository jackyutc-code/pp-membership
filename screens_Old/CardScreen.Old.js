import React from "react";
import { View, Text } from "react-native";

export default function CardScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Membership Card</Text>
      <Text style={{ marginTop: 12 }}>Jack Yu</Text>
      <Text style={{ marginTop: 8 }}>Member ID: PP-28A754</Text>
      <Text style={{ marginTop: 8 }}>Valid until: Dec 27, 2026</Text>
    </View>
  );
}
