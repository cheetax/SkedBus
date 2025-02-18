import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { TabView, SceneMap, TabBar, TabBarProps, SceneRendererProps, NavigationState } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

type RenderTabBarProps = SceneRendererProps & { navigationState: NavigationState<{ key: string; title: string; }> }

const renderTabBar = (props: RenderTabBarProps) => {
    console.log(props)
    return <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
    //style={{ backgroundColor: 'pink' }}
    />
};

const routes = [
    { key: 'first', title: 'Обзор' },
    { key: 'second', title: 'Расписание' },
];

export default function TabsView() {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0)

    console.log(index)
    return (
        <View style={Styles.tab} >
            <TabView

                //style={{height:' 100%', margin: 8}}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            //initialLayout={{ width: layout.width }}
            />
        </View>

    )
}

const Styles = StyleSheet.create({
    tab: {
        //flex: 1,
        height: '100%'
        //justifyContent: 'flex-start',
        //alignItems: 'flex-start',
        //backgroundColor: 'green',
        // flexGrow: 0

    },
})
