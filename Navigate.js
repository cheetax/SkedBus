import React from "react";
import Main from "./components/List";
import Form from "./components/Form";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

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
