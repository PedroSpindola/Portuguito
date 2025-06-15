import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTabDisplay } from "../hooks/useTabDisplay"
import MenuChallenge from "../Views/MenuChallenge";
import MenuAdventure from "../Views/MenuAdventure"
import ChallengeFases from "../Views/ChallengeFases";
import ChallengeQuestions from "../ListaDeListas/ChallengeQuestions";
import ChallengeRanking from "../Views/ChallengeRanking";
import UserProfile from "../Views/UserProfile";

const Stack = createStackNavigator();

export default function StackNavChallenge({ navigation, route }) {

  useTabDisplay({ navigation, route, screens: ['MenuAdventure'] })

  return (
    <Stack.Navigator
      initialRouteName="MenuAdventure"
      screenOptions={{ headerShown: false }}
      >
      <Stack.Screen name="MenuAdventure" component={MenuAdventure} />

    </Stack.Navigator>
  );
}