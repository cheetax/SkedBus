import React from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { IconButton, Text, useTheme, Drawer } from 'react-native-paper';


export default function DrawerItem({ route, navigation }) {

    return (
        <DrawerContentScrollView>
            <Drawer.Item 
                label="Тема"
            />
            <Drawer.Item 
                label="О приложении"
            />
        </DrawerContentScrollView>
    )
}