import 'react-native-gesture-handler'
import React from "react";
import { Platform } from "react-native";
import Main from "./TabNavigate";
import Form from "./components/Form";
import ListOdometer from "./components/ListOdometer";
import FormOdometer from "./components/FormOdometer";
import FormExpenses from './components/FormExpenses';
import FormProfile from './components/Profile';
import DrawerItem from "./components/DrawerItem";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';
import { useAppContext } from "./providers/AppContextProvider";
import { ItemContextProvider } from "./providers/ItemContextProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { enableLayoutAnimations } from 'react-native-reanimated';
import { RootStackParamList } from './typesNavigation';


const Stack = createDrawerNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();
enableLayoutAnimations(false);


const Navigator = () => Platform.OS === 'web' ? <Stack.Navigator

    drawerContent={(props) => <DrawerItem {...props} />}
>

    <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="FormNavigate"
        component={FormNavigate}
        options={{ headerShown: false }}
    />

    <Stack.Screen
        name="FormProfile"
        component={FormProfile}
        options={{ headerShown: false }}
    />
</Stack.Navigator> : <Drawer.Navigator
    screenOptions={{
        drawerStyle: {
            backgroundColor: 'transparent',
            width: '85%',
            flex: 1
        },
    }}
    drawerContent={(props) => <DrawerItem {...props} />}>
    <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="FormProfile"
        component={FormProfile}
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="FormNavigate"
        component={FormNavigate}
        options={{ headerShown: false }}
    />
</Drawer.Navigator>

const FormNavigate = () => <ItemContextProvider>
    <Stack.Navigator>
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
            name="FormExpenses"
            component={FormExpenses}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ListOdometer"
            component={ListOdometer}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
</ItemContextProvider>

export default function Navigate({ }) {
    enableLayoutAnimations(false)
    const { isDarkTheme } = useAppContext();
    const theme = isDarkTheme ? MD3DarkTheme : {
        ...MD3LightTheme,
        colors: { ...MD3LightTheme.colors, surface: "rgba(254, 247, 255, 1)" }
    };
    NavigationBar.setBackgroundColorAsync(theme.colors.background)
    NavigationBar.setButtonStyleAsync(isDarkTheme ? 'light' : 'dark')
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <StatusBar
                    style={isDarkTheme ? 'light' : 'dark'}
                    translucent={true}
                    hidden={false}
                />
                <Navigator />

            </NavigationContainer>
        </PaperProvider>)
}
