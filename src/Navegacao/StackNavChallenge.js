import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {useTabDisplay} from "../hooks/useTabDisplay"
import MenuChallenge from "../Views/MenuChallenge";

const Stack = createStackNavigator();

export default function StackNavChallenge({navigation, route}) {

  useTabDisplay({navigation, route, screens: ['MenuTrilha','StackNavAluno','PerfilAluno','MenuAluno']})

  return (
    <Stack.Navigator
      initialRouteName="MenuChallenge"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MenuChallenge" component={MenuChallenge} />
      
    </Stack.Navigator>
  );
}