import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTabDisplay } from "../hooks/useTabDisplay"
import MenuAdventure from "../Views/MenuAdventure"
import AdventureRanking from "../Views/AdventureRanking";

const Stack = createStackNavigator();

export default function StackNavChallenge({ navigation, route }) {

  useTabDisplay({ navigation, route, screens: ['MenuAdventure'] })

  return (
    <Stack.Navigator
      initialRouteName="MenuAdventure"
      screenOptions={{ headerShown: false }}
      >
      <Stack.Screen name="MenuAdventure" component={MenuAdventure} />
      <Stack.Screen name="AdventureRanking" component={AdventureRanking} />

    </Stack.Navigator>
  );
}