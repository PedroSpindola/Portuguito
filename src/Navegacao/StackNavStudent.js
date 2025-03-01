import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PerfilAluno from "../Views/PerfilAluno";
import ProfileImage from "../Views/ProfileImage";

import { useTabDisplay } from "../hooks/useTabDisplay"

const Stack = createStackNavigator();

export default function StackNavStudent({ navigation, route }) {

    useTabDisplay({ navigation, route, screens: ['MenuTrilha', 'StackNavAluno', 'PerfilAluno', 'MenuAluno'] })

    return (
        <Stack.Navigator
            initialRouteName="PerfilAluno"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="PerfilAluno" component={PerfilAluno} />
            <Stack.Screen name="ProfileImage" component={ProfileImage} />
        </Stack.Navigator>
    );
}
