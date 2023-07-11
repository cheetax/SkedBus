import React from "react";
//import { View, Text } from "react-native-web";
import Main from "./components/List";
import Form from "./components/Form";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Navigate({}) {    
    return <NavigationContainer>         
            <Stack.Navigator>
                <Stack.Screen
                   name="Main"
                    component={Main} 
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Form"
                    component={Form}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
    </NavigationContainer>
}
