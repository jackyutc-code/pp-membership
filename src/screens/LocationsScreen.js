import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, Alert, ScrollView, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "pp_locations_v1";

const DEFAULT_LOCATIONS = [
  { id: "a", name: "Coffee Shop A", address: "123 Main St", city: "Los Angeles", state: "CA", restrooms: 1 },
  { id: "b", name: "Restaurant B", address: "88 Market Ave", city: "Pasadena", state: "CA", restrooms: 2 },
  { id: "c", name: "Library C", address: "10 Park Blvd", city: "Santa Monica", state: "CA", restrooms: 4 },
];

const THEME = {
  bg: "#F9FAFB",
  card: "#FFFFFF",
  border: "#E5E7EB",
  dark: "#111827",
  muted: "#6B7280",
  primaryBtn: "#2563EB",
};

export default function LocationsScreen({ navigation }) {
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (Array.isArray(saved)) setLocations(saved);
        } else {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LOCATIONS));
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const saved = raw ? JSON.parse(raw) : null;
        if (Array.isArray(saved)) setLocations(saved);
      } catch (e) {}
    });

    return unsubscribe;
  }, [navigation]);

  const clearAll = async () => {
    Alert.alert("Reset locations?", "This will restore the default locations.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LOCATIONS));
          setLocations(DEFAULT_LOCATIONS);
          setQuery("");
        },
      },
    ]);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locations;

    return locations.filter((loc) => {
      const hay = `${loc.name} ${loc.address} ${loc.city} ${loc.state}`.toLowerCase();
      return hay.includes(q);
    });
  }, [locations, query]);

  return (
    <View style={{ flex: 1, backgroundColor: THEME.bg }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 28 }}>
        <Text style={{ fontSize: 32, fontWeight: "900", color: THEME.dark }}>
          Participating Locations
        </Text>

        <Text style={{ marginTop: 8, fontSize: 13, color: THEME.muted, lineHeight: 18 }}>
          Access requires an active P&amp;P Membership Card.{"\n"}
          Locations may refuse service at their discretion.
        </Text>

        {/* Search bar */}
        <View
          style={{
            marginTop: 14,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: THEME.border,
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>🔎</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name, city, address..."
            placeholderTextColor="#9CA3AF"
            style={{ flex: 1, fontSize: 16, color: THEME.dark }}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {!!query && (
            <Pressable
              onPress={() => setQuery("")}
              style={{
                backgroundColor: "#111827",
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>X</Text>
            </Pressable>
          )}
        </View>

        {/* Action buttons */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
          <Pressable
            onPress={() => navigation.navigate("AdminAddLocation")}
            style={{
              flex: 1,
              backgroundColor: THEME.primaryBtn,
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>+ Add</Text>
          </Pressable>

          <Pressable
            onPress={clearAll}
            style={{
              flex: 1,
              backgroundColor: THEME.dark,
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>Reset</Text>
          </Pressable>
        </View>

        {/* Results count */}
        <Text style={{ marginTop: 14, fontSize: 13, color: THEME.muted }}>
          Showing {filtered.length} of {locations.length}
        </Text>

        {/* Location list */}
        <View style={{ marginTop: 12, gap: 14 }}>
          {filtered.map((loc) => (
            <Pressable
              key={loc.id}
              onPress={() =>
                navigation.navigate("LocationDetail", {
                  name: loc.name,
                  address: loc.address,
                  city: loc.city,
                  state: loc.state,
                  restrooms: loc.restrooms,
                })
              }
              style={{
                backgroundColor: THEME.card,
                borderRadius: 18,
                padding: 18,
                borderWidth: 1,
                borderColor: THEME.border,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 6 },
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "900", color: THEME.dark }}>
                {loc.name}
              </Text>

              <Text style={{ marginTop: 6, fontSize: 15, color: THEME.muted }}>
                {loc.address}
              </Text>

              <Text style={{ marginTop: 4, fontSize: 13, color: THEME.muted }}>
                {loc.city}, {loc.state} · 🚻 {loc.restrooms}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Back */}
        <Pressable
          onPress={() => navigation.navigate("Card")}
          style={{
            marginTop: 22,
            backgroundColor: THEME.dark,
            borderRadius: 18,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>
            Back to Card
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
