import React from "react";
//import { View, Text } from "react-native-web";
import Main from "./TabNavigate";
//import Main from './components/List'
import Form from "./components/Form";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "./providers/AppContextProvider";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import DrawerItem from "./components/DrawerItem";

//const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigate({ }) {
    //const theme = useTheme()
    const { isDarkTheme } = useAppContext();
    const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;
    //const theme = useTheme();
    // theme.dark=true
    //console.log(isStartScroll)
    return (

        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme} >
                <StatusBar
                    style={isDarkTheme ? 'light' : 'dark'}
                    translucent={true}
                    hidden={false}

                />
                <Drawer.Navigator
                    screenOptions={{
                        drawerStyle: {
                            //backgroundColor: theme.colors.surface,
                            width: '90%',
                            flex: 1
                        },
                    }}
                    drawerContent={() => <DrawerItem />}>
                    <Drawer.Screen
                        name="Main"
                        component={Main}
                        options={{ headerShown: false }}
                    />
                    <Drawer.Screen
                        name="Form"
                        component={Form}
                        options={{ headerShown: false }}
                    />
                </Drawer.Navigator>

            </NavigationContainer>
        </PaperProvider>)

}
