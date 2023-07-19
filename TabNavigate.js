import React from "react";
import List from "./components/List";
import Chart from "./components/Chart";
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createMaterialBottomTabNavigator();

export default function TabNavigate() {
    //console.log('навигация')
    const { isV3 } = useTheme();    

   return (
        <Tab.Navigator
            initialRouteName="List"
            shifting={false}
            sceneAnimationEnabled={false}
        >
            <Tab.Screen
                name="List"
                component={List}                
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