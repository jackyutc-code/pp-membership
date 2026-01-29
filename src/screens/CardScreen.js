import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, ScrollView, Platform } from "react-native";
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
  const [expirationDate, setExpirationDate] = useState("—");
  const [verifiedAt, setVerifiedAt] = useState(new Date());

  const memberName = "Jack Yu";

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
        setExpirationDate("—");
      }
    })();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setVerifiedAt(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: THEME.bg }}>
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        padding: 24,
        paddingBottom: 48,
      }}
    >
      {/* CARD */}
      <View
        style={{
          backgroundColor: THEME.card,
          borderRadius: 20,
          padding: 20,
          marginBottom: 24,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
        }}
      >
        {/* your existing card content stays here */}
      </View>

      {/* BUTTONS */}
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
