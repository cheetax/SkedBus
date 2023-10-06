import 'react-native-gesture-handler'
import React from "react";
import { Platform } from "react-native";
import Main from "./TabNavigate";
//import Main from './components/List'
import Form from "./components/Form";
import ListOdometer from "./components/ListOdometer";
import FormOdometer from "./components/FormOdometer";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "./providers/AppContextProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { enableLayoutAnimations } from 'react-native-reanimated';
import DrawerItem from "./components/DrawerItem";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
enableLayoutAnimations(false);


const Navigator = () => Platform == 'Web' ? <Stack.Navigator
    screenOptions={{
        drawerStyle: {
            //backgroundColor: theme.colors.surface,
            width: '85%',
            flex: 1
        },
    }}
    drawerContent={() => <DrawerItem />}>
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
    <Stack.Screen
        name="FormOdometer"
        component={FormOdometer}
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="ListOdometer"
        component={ListOdometer}
        options={{ headerShown: false }}
    />
</Stack.Navigator> : <Drawer.Navigator
    screenOptions={{
        drawerStyle: {
            //backgroundColor: theme.colors.surface,
            width: '85%',
            flex: 1
        },
    }}
    drawerContent={() => <DrawerItem />}>
    <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
    />
</Drawer.Navigator>

const Home = () => <Stack.Navigator>
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
    <Stack.Screen
        name="FormOdometer"
        component={FormOdometer}
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="ListOdometer"
        component={ListOdometer}
        options={{ headerShown: false }}
    />
</Stack.Navigator>

export default function Navigate({ }) {
    enableLayoutAnimations(false)
    const { isDarkTheme } = useAppContext();
    //console.log(MD3LightTheme)
    const theme = isDarkTheme ? MD3DarkTheme : {
        ...MD3LightTheme,
        colors: { ...MD3LightTheme.colors, surface: "rgba(254, 247, 255, 1)" }
    };
    //theme = {...theme, colors: {surface: "rgba(254, 247, 255, 1)"}}
    //console.log(theme)
    return (

        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme} >
                <StatusBar
                    style={isDarkTheme ? 'light' : 'dark'}
                    translucent={true}
                    hidden={false}
                />
                <Navigator />

            </NavigationContainer>
        </PaperProvider>)

}
