import React from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { IconButton, Text, useTheme, Drawer, TouchableRipple, Switch } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";


export default function DrawerItem({ route, navigation }) {
    const { colors } = useTheme();
    const { toggleTheme, isDarkTheme } = useAppContext();
    return (
        <DrawerContentScrollView
            style={{ backgroundColor: colors.surface }}
        >
            <Drawer.Section >
                <TouchableRipple
                    onPress={toggleTheme}
                >
                    <View style={Styles.stackRow} >
                        <Text variant='headlineMedium' >Темная тема</Text>
                        <Switch value={isDarkTheme}/>
                    </View>
                </TouchableRipple>
                <TouchableRipple
                    onPress={() =>{}}
                >
                    <View style={Styles.stackRow} >
                        <Text variant='headlineMedium' >О приложении</Text>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
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