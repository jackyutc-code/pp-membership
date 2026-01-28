import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SIGNUP_DATE_KEY = "pp_signup_date_v1";

const THEME = {
  bg: "#F7F3EE",
  card: "#FBF8F3",
  border: "#E7E1D9",
  primary: "#0F766E",
  dark: "#111827",
  muted: "#6B7280",
  badgeBg: "#D1FAE5",
  badgeBorder: "#A7F3D0",
  badgeText: "#065F46",
};

function formatMMDDYYYY(date) {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export default function CardScreen({ navigation }) {
  const [expirationDate, setExpirationDate] = useState("");
  const [verifiedAt, setVerifiedAt] = useState(new Date());

  const memberName = "Jack Yu";

  const refreshVerified = useCallback(() => {
    setVerifiedAt(new Date());
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let signup = await AsyncStorage.getItem(SIGNUP_DATE_KEY);
        if (!signup) {
          signup = new Date().toISOString();
          await AsyncStorage.setItem(SIGNUP_DATE_KEY, signup);
        }

        const exp = new Date(signup);
        exp.setFullYear(exp.getFullYear() + 1);
        setExpirationDate(formatMMDDYYYY(exp));
      } catch {
        setExpirationDate("");
      }
    })();
  }, []);

  // Refresh “Verified” time when returning to this screen (no 1-second timer)
  useEffect(() => {
    const unsub = navigation.addListener("focus", refreshVerified);
    return unsub;
  }, [navigation, refreshVerified]);

 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: THEME.bg }}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={true}
    >

      {/* CARD */}
      <View
        style={{
          backgroundColor: THEME.card,
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "900", color: THEME.dark }}>
          Membership Card
        </Text>

        <Text style={{ marginTop: 8, color: THEME.muted }}>
          Active member since {expirationDate || "—"}
        </Text>
      </View>

      {/* BUTTON: VIEW LOCATIONS */}
      <Pressable
        onPress={() => navigation.navigate("Locations")}
        style={{
          backgroundColor: THEME.primary,
          borderRadius: 22,
          paddingVertical: 16,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          View Locations
        </Text>
      </Pressable>

      {/* BUTTON: JOIN */}
      <Pressable
        onPress={() => navigation.navigate("Join")}
        style={{
          backgroundColor: THEME.dark,
          borderRadius: 22,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
          Join / Enter Code
        </Text>
      </Pressable>

    </ScrollView>
  </SafeAreaView>
);
