import React from "react";
import { StatusBar, View } from 'react-native';
import { Drawer, Switch, Card } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const DrawerItem = ( {navigation}: DrawerContentComponentProps) => {
    const { toggleTheme, isDarkTheme } = useAppContext();
    console.log(navigation)
    return (
        <Card
            style={{ height: '100%', paddingTop: StatusBar.currentHeight }}
        >
            <Drawer.Item
                onPress={() => navigation.navigate('FormLogin')}
                label="Войти "
            />
            <Drawer.Item
                onPress={toggleTheme}
                label="Темная тема"
                right={() => <Switch value={isDarkTheme} onChange={toggleTheme} />}
            >
            </Drawer.Item>
            
            <Drawer.Item
                label="О приложении"
            />
        </Card >
    )
}
export default DrawerItem