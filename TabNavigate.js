import React, { useState, useEffect } from "react";
import List from "./components/List";
import Chart from "./components/Chart";
import { Appbar, Text, Surface, Card, useTheme } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigate({ navigation, route }) {
    //const {listOfItems} = useAppContext()
    const theme = useTheme()
    console.log(theme)
    React.useEffect(() => {
        //console.log(listOfItems)
    })

    return (
        <View style={Styles.main} >

            <Card
                elevation={5}
                mode="elevated"
            >
                <Appbar.Header
                    elevated={true}
                    //dark={true}
                    theme={theme}

                    style={{
                        backgroundColor: theme.colors.onSurface,
                        height: 56
                    }}
                >
                    <Appbar.Action icon='menu' onPress={() => { }} color='white' />
                    <Appbar.Content title={
                        <Text
                            //style={{ color: 'white' }}
                            variant='titleLarge'>Учет работы таксиста {theme.dark.toString()}
                        </Text>}
                    //color='white'
                    />
                </Appbar.Header>
            </Card>

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