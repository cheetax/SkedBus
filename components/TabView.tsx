import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors, MD3Theme, ThemeProp } from "react-native-paper/lib/typescript/types";
import { TabView, SceneMap, TabBar, TabBarProps, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import Review from "./Review";

const FirstRoute = () => <View>
    <Review />
</View>

const SecondRoute = () => (
    <Text variant="bodyLarge" >Test</Text>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

type RenderTabBarProps = SceneRendererProps & { navigationState: NavigationState<{ key: string; title: string; }>, theme: MD3Theme }

const renderTabBar = (props: RenderTabBarProps) => {
    //console.log(props)
    const { theme } = props
    return <TabBar
        {...props}
        activeColor={theme.colors?.primary}
        inactiveColor={theme.colors?.onSurfaceVariant}
        indicatorStyle={{
            backgroundColor: theme.colors?.primary,
            height: 3
        }}
        style={{ backgroundColor: theme.colors?.surface }}
    />
};

const routes = [
    { key: 'first', title: 'Обзор' },
    { key: 'second', title: 'Расписание' },
];

export default function TabsView() {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0)

    const theme = useTheme()

    console.log(index)
    return (
        <View style={Styles.tab} >
            {/* <Review/> */}
            <TabView
                style={{backgroundColor: 'green', }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={e => renderTabBar({ ...e, theme: theme })}
                initialLayout={{ width: layout.width }}
            />
        </View>

    )
}

const Styles = StyleSheet.create({
    tab: {
        height: '100%',
        //backgroundColor: 'green',
    },
})
