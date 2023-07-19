import React from "react";
import Main from "./components/List";
import Chart from "./components/Chart";
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createMaterialBottomTabNavigator();

export default function TabNavigate() {

    const { isV3 } = useTheme();    

   return (
        <Tab.Navigator
            initialRouteName="Main"
            shifting={false}
            sceneAnimationEnabled={false}
        >
            <Tab.Screen
                name="Main"
                component={Main}                
                options={{       
                    tabBarIcon : ({ focused, color }) => (
                        <MaterialCommunityIcons name={ focused ? "home" : 'home-outline'} color={color}  size={26}/>
                      ),             
                    tabBarLabel: 'Смены',
                }}
            />
            <Tab.Screen
                name="Chart"
                component={Chart}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons name={ focused ? 'equalizer' : 'equalizer-outline'} color={color}  size={26}/>
                      ), 
                    tabBarLabel: 'Статистика'                   
                }}
            />
        </Tab.Navigator>

    );
}