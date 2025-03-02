import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTabDisplay } from "../hooks/useTabDisplay"
import MenuChallenge from "../Views/MenuChallenge";
import ChallengeFases from "../Views/ChallengeFases";
import ChallengeQuestions from "../ListaDeListas/ChallengeQuestions";
import ChallengeRanking from "../Views/ChallengeRanking";
import UserProfile from "../Views/UserProfile";

const Stack = createStackNavigator();

export default function StackNavChallenge({ navigation, route }) {

  useTabDisplay({ navigation, route, screens: ['MenuChallenge'] })

  return (
    <Stack.Navigator
      initialRouteName="MenuChallenge"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ChallengeFases" component={ChallengeFases} />
      <Stack.Screen name="MenuChallenge" component={MenuChallenge} />
      <Stack.Screen name="ChallengeQuestions" component={ChallengeQuestions} />
      <Stack.Screen name="ChallengeRanking" component={ChallengeRanking} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}