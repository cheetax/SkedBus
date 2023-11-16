import React from "react";
import List from "./components/List";
import ChartView from "./components/ChartView";
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
                        variant='titleLarge'>Учет работы таксиста
                    </Text>}
                />
            </Appbar.Header>

            <Tab.Navigator
                initialRouteName="List"
                shifting={false}
                sceneAnimationEnabled={true}
            >
                <Tab.Screen
                    name="List"
                    component={List}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <MaterialCommunityIcons name={focused ? "home" : 'home-outline'} color={color} size={26} />
                        ),
                        tabBarLabel: 'Смены',
                    }}
                    listeners={{
                        focus: () => setScreen('main')
                    }}
                />
                <Tab.Screen

                    name="Chart"
                    component={ChartView}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <MaterialCommunityIcons name={focused ? 'equalizer' : 'equalizer-outline'} color={color} size={26} />
                        ),
                        tabBarLabel: 'Статистика',
                    }}
                    listeners={{
                        focus: () => setScreen('chart')
                    }}
                />
            </Tab.Navigator>
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