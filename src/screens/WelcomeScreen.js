import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../theme";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>P&P Membership</Text>
      <Text style={styles.p}>
        A simple annual membership card you can show at participating restaurants for courtesy restroom access.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>$25 / year</Text>
        <Text style={styles.cardBody}>Support local businesses. No tracking. No scanning.</Text>
      </View>

      <Pressable style={styles.primary} onPress={() => navigation.replace("Card")}>
        <Text style={styles.primaryText}>Continue</Text>
      </Pressable>

      <Text style={styles.small}>
        Access is a courtesy and not guaranteed. Restaurants may refuse if restroom is unavailable.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 18, gap: 14, backgroundColor: COLORS.bg },
  h1: { fontSize: 28, fontWeight: "900", color: COLORS.text, marginTop: 12 },
  p: { color: COLORS.muted, fontSize: 16, lineHeight: 22 },
  card: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: "900", fontSize: 18, color: COLORS.text },
  cardBody: { color: COLORS.muted, marginTop: 6 },
  primary: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 16, alignItems: "center", marginTop: 6 },
  primaryText: { color: "white", fontWeight: "900" },
  small: { color: COLORS.muted, fontSize: 12, marginTop: 6 },
});
