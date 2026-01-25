import JoinScreen from "./src/screens/JoinScreen";

import AdminAddLocationScreen from "./src/screens/AdminAddLocationScreen";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CardScreen from "./src/screens/CardScreen";
import LocationsScreen from "./src/screens/LocationsScreen";
import LocationDetailScreen from "./src/screens/LocationDetailScreen";

const Stack = createNativeStackNavigator();
{
  "expo": {
    "name": "P&P",
    "slug": "pp-membership",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.jackyu.pp",
      "supportsTablet": true
    }
  }
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
<Stack.Screen name="Join" component={JoinScreen} options={{ title: "Join" }} />

<Stack.Screen
  name="AdminAddLocation"
  component={AdminAddLocationScreen}
  options={{ title: "Add Location" }}
/> 

        <Stack.Screen
          name="Card"
          component={CardScreen}
          options={{ title: "Membership Card" }}
        />
        <Stack.Screen
          name="Locations"
          component={LocationsScreen}
          options={{ title: "Locations" }}
        />
        <Stack.Screen
          name="LocationDetail"
          component={LocationDetailScreen}
          options={{ title: "Location" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
<Stack.Screen name="Join" component={JoinScreen} options={{ title: "Join" }} />

