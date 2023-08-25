import React from "react";
import { View, StyleSheet, StatusBar } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { IconButton, Text, useTheme, Drawer, TouchableRipple, Switch, Surface, Card } from 'react-native-paper';
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

const Styles = StyleSheet.create({

    main: {
        flex: 1,
        flexDirection: 'column',
    },
    forma: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 24
    },
    text: {
        paddingHorizontal: 0,
        paddingRight: 8,
    },
    inputField: {
        marginTop: 12,
        height: 56
    },
    stackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    }
})