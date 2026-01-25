import React from "react";
import { View, Text, Pressable, Linking, Platform, Alert } from "react-native";

const THEME = {
  bg: "#F9FAFB",
  card: "#FFFFFF",
  border: "#E5E7EB",
  dark: "#111827",
  muted: "#6B7280",
  primaryBtn: "#2563EB",
  safeGreen: "#16A34A",
};

export default function LocationDetailScreen({ route, navigation }) {
  const { name, address, city, state, restrooms } = route.params || {};

  const openDirections = async () => {
    if (!address) {
      Alert.alert("No address", "This location has no address.");
      return;
    }

    const encoded = encodeURIComponent(`${address} ${city || ""} ${state || ""}`.trim());

    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?daddr=${encoded}`
        : `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;

    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      Alert.alert("Cannot open maps", url);
      return;
    }

    Linking.openURL(url);
  };

  if (!name) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: THEME.bg }}>
        <Text style={{ fontSize: 18, fontWeight: "800", color: THEME.dark }}>
          No location data
        </Text>

        <Pressable
          onPress={() => navigation.navigate("Locations")}
          style={{
            marginTop: 16,
            backgroundColor: THEME.dark,
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: "white", fontWeight: "800" }}>Back to Locations</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: THEME.bg, padding: 24, paddingTop: 60 }}>
      <Text style={{ fontSize: 28, fontWeight: "900", color: THEME.dark }}>
        {name}
      </Text>

      <Text style={{ marginTop: 10, fontSize: 16, color: THEME.muted }}>
        {address}
        {city && state ? ` · ${city}, ${state}` : ""}
      </Text>

      <Text style={{ marginTop: 12, fontSize: 14, color: THEME.safeGreen, fontWeight: "700" }}>
        🚻 Show your P&amp;P Membership Card to staff
      </Text>

      <Text style={{ marginTop: 4, fontSize: 12, color: THEME.muted }}>
        Access is granted at the location’s discretion.
      </Text>

      {/* Info card */}
      <View
        style={{
          marginTop: 18,
          backgroundColor: THEME.card,
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: THEME.border,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "900", color: THEME.dark }}>
          Details
        </Text>

        <Text style={{ marginTop: 8, fontSize: 14, color: THEME.muted, lineHeight: 20 }}>
          • Restrooms available: {typeof restrooms === "number" ? restrooms : "—"}
          {"\n"}• Please be respectful and follow staff guidance.
        </Text>
      </View>

      {/* Directions */}
      <Pressable
        onPress={openDirections}
        style={{
          marginTop: 18,
          backgroundColor: THEME.primaryBtn,
          borderRadius: 18,
          paddingVertical: 16,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          Directions
        </Text>
      </Pressable>

      {/* Back */}
      <Pressable
        onPress={() => navigation.navigate("Locations")}
        style={{
          marginTop: 12,
          backgroundColor: THEME.dark,
          borderRadius: 18,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          Back to Locations
        </Text>
      </Pressable>
    </View>
  );
}
