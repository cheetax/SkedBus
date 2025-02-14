import React from "react";
import { StatusBar, View, StyleSheet, Image } from 'react-native';
import { Drawer, Switch, Card, Avatar, useTheme, Text, Button } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
//import { useUserContext } from "../providers/UserContexProvider";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const DrawerItem = ({ navigation }: DrawerContentComponentProps) => {
    const { toggleTheme, isDarkTheme } = useAppContext();
    const theme = useTheme()

    return (
        <Card
            style={{ height: '100%', paddingTop: StatusBar.currentHeight }}
        >
            <View style={{
                marginBottom: 10,
                paddingHorizontal: 24,
                paddingVertical: 16,
                backgroundColor: theme.colors.surfaceVariant,
            }}
            >
                
                <Text variant="bodyMedium" >Кирово-Чепецк</Text>
            </View>

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

const Styles = StyleSheet.create({
    stackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
        //flex: 1
    }
})