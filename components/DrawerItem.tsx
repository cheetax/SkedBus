import React from "react";
import { StatusBar, View, StyleSheet } from 'react-native';
import { Drawer, Switch, Card, Avatar, useTheme, Text, Button } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { useUserContext } from "../providers/UserContexProvider";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const DrawerItem = ({ navigation }: DrawerContentComponentProps) => {
    const { toggleTheme, isDarkTheme } = useAppContext();
    const { user } = useUserContext();
    const theme = useTheme()
    
    const avatar = require(user.avatar)
    console.log(avatar)
    return (
        <Card
            style={{ height: '100%', paddingTop: StatusBar.currentHeight }}
        >
            <View style={{padding: 24, backgroundColor: theme.colors.surfaceVariant, }} >
                <View style={Styles.stackRow} >
                    <Avatar.Image source={require('../assets/UserAvatar.png')} style={{  backgroundColor: theme.colors.surfaceVariant}} />
                    <Button mode="contained" onPress={() => navigation.navigate('FormLogin')} >Войти </Button>
                </View>  
                <Text variant="bodyMedium" >Дмитрий Гребенев{user.name}</Text>
                <Text variant="bodyMedium" >dmitriy.grebenev@gmail.com{user.email}</Text>
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
        alignItems: 'center'
        //flex: 1
      }
})