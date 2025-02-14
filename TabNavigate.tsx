import React from "react";
import Sheduler from "./components/Sheduler";
import Maps from "./components/Maps";
import { Appbar, Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useScrollContext } from "./providers/ScrollContextProvider";
import { RootStackParamList } from "./typesNavigation";

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();
type Props = DrawerScreenProps<RootStackParamList, 'Main'>

const TabNavigate = ({ navigation }: Props) => {
    const { isScrolling, setScreen } = useScrollContext()
    const theme = useTheme()
    //console.log(navigation)
    return (
        <View style={Styles.main} >
            <Appbar.Header
                //elevated={true}
                dark={theme.dark}
                mode="small"
                theme={theme}
                style={{
                    backgroundColor: isScrolling ? theme.colors.elevation.level2 : theme.colors.surface
                }}
            >
                <Appbar.Action
                    icon='menu'
                    onPress={() => navigation.openDrawer()} />
                <Appbar.Content title={
                    <Text
                        variant='titleLarge'>Автобусы Уралхим
                    </Text>}
                />
            </Appbar.Header>

            <Maps />
        </View>

    );
}

export default TabNavigate;

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
    }
})