import React from "react";
import Main from "./components/List";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';


const Tab = createMaterialBottomTabNavigator();

export default function TabNavigate() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Смены"
                tabBarIcon='home-outline'
                
                component={Main}
            />
            {/* <Tab.Screen
                name="Stat"
                component={Stat}
                options={{ headerShown: false }}
            /> */}
        </Tab.Navigator>);
}