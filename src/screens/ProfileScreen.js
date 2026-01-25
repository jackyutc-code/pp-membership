import React from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { COLORS } from "../theme";
import * as Application from "expo-application";
import * as Device from "expo-device";

export default function ProfileScreen() {
  const version = Application.nativeApplicationVersion || "1.0.0";
  const build = Application.nativeBuildVersion || "—";

  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Support</Text>
        <Pressable onPress={() => Linking.openURL("mailto:support@yourdomain.com")}>
          <Text style={styles.link}>support@yourdomain.com</Text>
        </Pressable>

        <Text style={[styles.label, { marginTop: 12 }]}>Terms</Text>
        <Text style={styles.value}>Access is a courtesy and not guaranteed. Restaurants may refuse if unavailable.</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Privacy</Text>
        <Text style={styles.value}>No restroom usage tracking.</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>App</Text>
        <Text style={styles.value}>Version {version} (Build {build})</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Device</Text>
        <Text style={styles.value}>{Device.modelName || "—"}</Text>
      </View>

      <Text style={styles.small}>
        For App Store submission, add Privacy Policy & Terms URLs to App Store Connect.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 18, backgroundColor: COLORS.bg, gap: 12 },
  h1: { fontSize: 20, fontWeight: "900", color: COLORS.text },
  card: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 14 },
  label: { color: COLORS.muted, fontWeight: "900" },
  value: { color: COLORS.text, marginTop: 4, lineHeight: 20 },
  link: { color: COLORS.primary, fontWeight: "900", marginTop: 4 },
  small: { color: COLORS.muted, fontSize: 12 },
});
