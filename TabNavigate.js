import React, { useState, useEffect } from "react";
import List from "./components/List";
import Chart from "./components/Chart";
import { Appbar, Text, Surface } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppContextProvider } from "./providers/AppContextProvider";
const Tab = createMaterialBottomTabNavigator();

export default function TabNavigate({ navigation, route }) {
    React.useEffect(() => {
        console.log(route)
    })


    return (
        <View style={Styles.main} >
            <Surface elevation={5} >
                <Appbar.Header
                    //elevated={true}
                    //dark={true}
                    style={{
                        backgroundColor: '#1976d2',
                        height: 56
                    }}
                >
                    <Appbar.Action icon='menu' onPress={() => { }} color='white' />
                    <Appbar.Content title={<Text style={{ color: 'white' }} variant='titleLarge'>Учет работы таксиста</Text>} color='white' />
                </Appbar.Header>
            </Surface>
            <AppContextProvider>
                <Tab.Navigator
                    initialRouteName="List"
                    shifting={false}
                    sceneAnimationEnabled={true}
                >
                    <Tab.Screen
                        name="List"
                        component={List}
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <MaterialCommunityIcons name={focused ? "home" : 'home-outline'} color={color} size={26} />
                            ),
                            tabBarLabel: 'Смены',
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name="Chart"
                        component={Chart}
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <MaterialCommunityIcons name={focused ? 'equalizer' : 'equalizer-outline'} color={color} size={26} />
                            ),
                            tabBarLabel: 'Статистика',
                            headerShown: false
                        }}
                    />
                </Tab.Navigator>
            </AppContextProvider>

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