import React from "react";
//import { View, Text } from "react-native-web";
import Main from "./TabNavigate";
//import Main from './components/List'
import Form from "./components/Form";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "./providers/AppContextProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import DrawerContent from "./components/drawerItem";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigate({ }) {
    //const theme = useTheme()
    const { isDarkTheme } = useAppContext();
    const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;
    // theme.dark=true
    //console.log(isStartScroll)
    return (

        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme} >
                <Drawer.Navigator
                    // screenOptions={{
                    //     drawerStyle: collapsed && {
                    //         width: collapsedDrawerWidth,
                    //     },
                    // }}
                    drawerContent={() => <DrawerContent />}>
                </Drawer.Navigator>
                <Stack.Navigator  >
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
