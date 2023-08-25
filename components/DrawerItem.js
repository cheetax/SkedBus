import React from "react";
import {  StatusBar } from 'react-native';
import { useTheme, Drawer, Switch, Card } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";


export default function DrawerItem({ route, navigation }) {
    const { colors } = useTheme();
    const { toggleTheme, isDarkTheme } = useAppContext();
    return (
            <Card
                style={{ height: '100%', paddingTop: StatusBar.currentHeight }}
            >
                <Drawer.Item
                    onPress={toggleTheme}
                    label="Темная тема"
                    right={(props) => <Switch value={isDarkTheme} onChange={toggleTheme} />}
                >
                </Drawer.Item>
                <Drawer.Item
                    label="О приложении"
                />
            </Card >
    )
}