import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CardScreen from "./src/screens/CardScreen";
import LocationsScreen from "./src/screens/LocationsScreen";
import LocationDetailScreen from "./src/screens/LocationDetailScreen";
import JoinScreen from "./src/screens/JoinScreen";
import AdminAddLocationScreen from "./src/screens/AdminAddLocationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: "P&P" }} />
        <Stack.Screen name="Join" component={JoinScreen} options={{ title: "Join" }} />

        <Stack.Screen name="Card" component={CardScreen} options={{ title: "Membership Card" }} />
        <Stack.Screen name="Locations" component={LocationsScreen} options={{ title: "Locations" }} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: "Location" }} />

        <Stack.Screen
          name="AdminAddLocation"
          component={AdminAddLocationScreen}
          options={{ title: "Add Location" }}
        />

        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


