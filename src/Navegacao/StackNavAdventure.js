import { createStackNavigator } from "@react-navigation/stack";
import { useTabDisplay } from "../hooks/useTabDisplay"
import MenuAdventure from "../Views/MenuAdventure"
import AdventureRanking from "../Views/AdventureRanking";
import AdventureFases from "../Views/AdventureFases";
import Battle from "../Views/Battle";

const Stack = createStackNavigator();

export default function StackNavAdventure({ navigation, route }) {

  useTabDisplay({ navigation, route, screens: ['MenuAdventure'] })

  return (
    <Stack.Navigator
      initialRouteName="MenuAdventure"
      screenOptions={{ headerShown: false }}
      >
      <Stack.Screen name="MenuAdventure" component={MenuAdventure} />
      <Stack.Screen name="AdventureRanking" component={AdventureRanking} />
      <Stack.Screen name="AdventureFases" component={AdventureFases} />
      <Stack.Screen name="Battle" component={Battle} />
    </Stack.Navigator>
  );
}