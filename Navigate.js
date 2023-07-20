import React from "react";
//import { View, Text } from "react-native-web";
import Main from "./TabNavigate";
//import Main from './components/List'
import Form from "./components/Form";
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Navigate({ }) {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Main"
                        component={Main}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Form"
                        component={Form}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
                <StatusBar
                    style="auto"
                    translucent={true}
                    hidden={false}
                />
            </NavigationContainer>
        </PaperProvider>)

}
