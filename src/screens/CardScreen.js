import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function CardScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Membership Card</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>MEMBERS WELCOME</Text>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Join / Enter Code</Text>
        </Pressable>

        {/* Spacer to guarantee scroll */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    height: 220,
    borderRadius: 16,
    backgroundColor: '#0E7C7B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
