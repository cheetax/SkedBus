import React from "react";
import List from "./components/List";
import Chart from "./components/Chart";
import { useTheme, Appbar, Text } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createMaterialBottomTabNavigator();

export default function TabNavigate() {
    //console.log('навигация')
    const { isV3 } = useTheme();

    return (
        <View style={Styles.main} >
            <Appbar.Header
                elevated={true}
                dark={true}
                style={{
                    backgroundColor: '#1976d2',
                    height: 56
                }}
            >
                <Appbar.Action icon='menu' onPress={() => { }} color='white' />
                <Appbar.Content title={<Text style={{ color: 'white' }} variant='titleLarge'>Учет работы таксиста</Text>} color='white' />
            </Appbar.Header>
            <Tab.Navigator
                initialRouteName="List"
                shifting={false}
                sceneAnimationEnabled={false}
            >
                <Tab.Screen
                    name="List"
                    component={List}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <MaterialCommunityIcons name={focused ? "home" : 'home-outline'} color={color} size={26} />
                        ),
                        tabBarLabel: 'Смены',
                    }}
                />
                <Tab.Screen
                    name="Chart"
                    component={Chart}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <MaterialCommunityIcons name={focused ? 'equalizer' : 'equalizer-outline'} color={color} size={26} />
                        ),
                        tabBarLabel: 'Статистика'
                    }}
                />
            </Tab.Navigator>
        </View>


    );
}

const Styles = StyleSheet.create({    
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
    }
})