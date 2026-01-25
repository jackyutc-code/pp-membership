# P&P Membership (React Native / Expo)

This is a **membership-only** MVP for the P&P concept:
- Users see a **digital membership card** (ACTIVE/EXPIRED)
- A **TEST MODE** activation button exists for quick testing in Expo Go
- No scanning / no approval / no usage tracking

## Run locally
1) Install Node 18+ and Expo CLI
2) In this folder:
   ```bash
   npm install
   npm run start
   ```
3) Scan the QR code with the Expo Go app on your iPhone.

## Test Mode
On the Membership Card screen, tap:
- "Activate Membership (TEST MODE)" → sets ACTIVE for 365 days
- "Expire (Test)" → resets to inactive

## App Store submission
Apple requires **In-App Purchase (IAP)** for a paid digital membership.
To submit:
- Replace TEST MODE activation with Apple IAP
- Validate subscription status server-side (recommended)

If you want, ask: "Add Apple IAP (annual subscription)" and share your:
- iOS Bundle ID
- Subscription Product ID from App Store Connect
