import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This app is "membership-only".
 *
 * For quick testing in Expo Go, we include TEST MODE membership activation.
 * For App Store submission, swap the purchase functions with Apple IAP (StoreKit)
 * and validate subscription status server-side.
 */

const KEY = "pp_membership_v1";

export async function loadMembership() {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) {
    return { status: "inactive", expiresAt: null, memberId: null, memberName: "Member" };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      status: parsed.status ?? "inactive",
      expiresAt: parsed.expiresAt ?? null,
      memberId: parsed.memberId ?? null,
      memberName: parsed.memberName ?? "Member",
    };
  } catch {
    return { status: "inactive", expiresAt: null, memberId: null, memberName: "Member" };
  }
}

export async function saveMembership(next) {
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export function makeMemberId() {
  return "PP-" + Math.random().toString(16).slice(2, 8).toUpperCase();
}

// TEST MODE: activate for 365 days
export async function activateTestMembership(memberName = "Member") {
  const now = new Date();
  const exp = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  const next = {
    status: "active",
    expiresAt: exp.toISOString(),
    memberId: makeMemberId(),
    memberName,
    lastRefreshedAt: new Date().toISOString(),
    mode: "test",
  };
  await saveMembership(next);
  return next;
}

export async function expireMembership() {
  const current = await loadMembership();
  const next = { ...current, status: "inactive", expiresAt: null, lastRefreshedAt: new Date().toISOString() };
  await saveMembership(next);
  return next;
}

// Server refresh hook (placeholder)
export async function refreshFromServer() {
  // In production:
  // - call your backend: GET /membership/status
  // - backend validates Apple subscription receipt and returns ACTIVE/EXPIRED + expiration
  // Here we simply update lastRefreshedAt to demonstrate "live" behavior.
  const current = await loadMembership();
  const next = { ...current, lastRefreshedAt: new Date().toISOString() };
  await saveMembership(next);
  return next;
}
