import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Divider, shadow, Text, useTheme } from "react-native-paper";
import { MD3Colors, MD3Theme, ThemeProp } from "react-native-paper/lib/typescript/types";
import { TabView, SceneMap, TabBar, TabBarProps, SceneRendererProps, NavigationState, TabDescriptor, TabBarItemProps } from 'react-native-tab-view';
import Review from "./Review";

const FirstRoute = () => <View>
    <Review />
</View>

const SecondRoute = () => (
    <Text variant="bodyLarge" >Test</Text>
);

const TabBarItem = (props: TabBarItemProps) => {
    console.log(props)
    return <Text variant="bodyLarge">{props.labelText}</Text>
}

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

type RenderTabBarProps = SceneRendererProps & { navigationState: NavigationState<{ key: string; title: string; }>, theme: MD3Theme }

const renderTabBar = (props: RenderTabBarProps) => {
    //console.log(props)
    const { theme } = props
    return <View>
        <TabBar
            {...props}
            //enderIndicator={}
            
            activeColor={theme.colors?.primary}
            inactiveColor={theme.colors?.onSurfaceVariant}
            indicatorStyle={{
                backgroundColor: theme.colors?.primary,
                height: 2,
            }}
            //style={Styles.shadow}
            style={{ backgroundColor: theme.colors?.surface, elevation: 0, shadowColor: 'red', }}
             />
        <Divider />
    </View>

};

const routes = [
    { key: 'first', title: 'Обзор' },
    { key: 'second', title: 'Расписание' }
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
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={e => renderTabBar({ ...e, theme: theme })}
                initialLayout={{ width: layout.width }}
                pagerStyle={{
                    paddingHorizontal: 24
                }}
            />
        </View>

    )
}

const Styles = StyleSheet.create({
    tab: {
        height: '100%',
        //backgroundColor: 'green',
    },
    shadow: {
        fontWeight: '700'
    }
})
