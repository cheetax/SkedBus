import React from "react";
import { StatusBar } from 'react-native';
import { Drawer, Switch, Card } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";

const DrawerItem = () => {
    const { toggleTheme, isDarkTheme } = useAppContext();
    return (
        <Card
            style={{ height: '100%', paddingTop: StatusBar.currentHeight }}
        >
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