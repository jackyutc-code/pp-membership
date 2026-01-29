import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  const [expirationDate, setExpirationDate] = useState("");
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
        setExpirationDate("");
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
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        bounces={true}
        alwaysBounceVertical={true} // ✅ key for “scroll/bounce” even if content fits
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: Math.max(insets.bottom, 18) + 24,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "900", color: THEME.dark }}>
          Membership Card
        </Text>
        <Text style={{ marginTop: 6, fontSize: 14, color: THEME.muted }}>
          Show this screen to staff at participating locations.
        </Text>

        <View
          style={{
            marginTop: 18,
            backgroundColor: THEME.card,
            borderRadius: 26,
            borderWidth: 1,
            borderColor: THEME.border,
            padding: 22,
            overflow: "hidden",
          }}
        >
          {/* watermark (don’t capture touches) */}
          <Image
            pointerEvents="none"
            source={require("../../assets/icon.png")}
            style={{
              position: "absolute",
              right: -40,
              top: 10,
              width: 240,
              height: 240,
              opacity: 0.06,
              transform: [{ rotate: "-12deg" }],
            }}
            resizeMode="contain"
          />

          <View style={{ alignItems: "center", marginTop: 6 }}>
            <Image
              pointerEvents="none"
              source={require("../../assets/icon.png")}
              style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: THEME.border,
                backgroundColor: "white",
              }}
              resizeMode="contain"
            />

            <Text
              style={{
                fontSize: 26,
                fontWeight: "900",
                letterSpacing: 1.5,
                color: THEME.primary,
                textAlign: "center",
              }}
            >
              MEMBERS WELCOME
            </Text>

            <Text style={{ marginTop: 6, fontSize: 12, color: "#374151" }}>
              — P&amp;P APP —
            </Text>
          </View>

          <View style={{ marginTop: 18 }}>
            <Text style={{ fontSize: 13, color: THEME.muted, fontWeight: "700" }}>
              Name
            </Text>
            <Text style={{ fontSize: 22, color: THEME.dark, fontWeight: "900", marginTop: 4 }}>
              {memberName}
            </Text>

            <View style={{ height: 16 }} />

            <Text style={{ fontSize: 13, color: THEME.muted, fontWeight: "700" }}>
              Membership
            </Text>
            <Text style={{ fontSize: 18, color: THEME.dark, fontWeight: "900", marginTop: 4 }}>
              P&amp;P MEMBER
            </Text>

            <View style={{ height: 16 }} />

            <Text style={{ fontSize: 13, color: THEME.muted, fontWeight: "700" }}>
              Expiration
            </Text>
            <Text style={{ fontSize: 18, color: THEME.dark, fontWeight: "900", marginTop: 4 }}>
              {expirationDate || "—"}
            </Text>

            <View style={{ height: 16 }} />

            <Text style={{ fontSize: 13, color: THEME.muted, fontWeight: "700" }}>
              Status
            </Text>
            <View
              style={{
                alignSelf: "flex-start",
                marginTop: 8,
                backgroundColor: THEME.badgeBg,
                borderRadius: 999,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: THEME.badgeBorder,
              }}
            >
              <Text style={{ color: THEME.badgeText, fontWeight: "900", letterSpacing: 0.5 }}>
                ACTIVE
              </Text>
            </View>

            <Text style={{ marginTop: 12, fontSize: 12, color: THEME.muted }}>
              Verified: {verifiedAt.toLocaleTimeString()}
            </Text>

            <Text style={{ marginTop: 10, fontSize: 12, color: THEME.muted, lineHeight: 16 }}>
              Staff: Active memberships show a green status and expiration date.
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Locations")}
          style={{
            marginTop: 22,
            backgroundColor: THEME.primary,
            borderRadius: 22,
            paddingVertical: 18,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
            View Locations
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Join")}
          style={{
            marginTop: 12,
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

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
