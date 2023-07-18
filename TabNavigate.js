import React from "react";
import Main from "./components/List";
import { Easing } from "react-native";
import { BottomNavigation, useTheme } from 'react-native-paper';



export default function TabNavigate({ navigation, route }) {

    const [index, setIndex] = React.useState(0);
    const { isV3 } = useTheme();
    //const [sceneAnimation, setSceneAnimation] = React.useState('shifting');
    const [routes] = React.useState([
        {
            key: 'home',
            title: 'Смены',
            focusedIcon: 'home',
            ...(isV3
                ? { unfocusedIcon: 'home-outline' }
                : {
                    color: '#2962ff',
                }),
        },
        {
            key: 'statistic',
            title: 'Статистика',
            focusedIcon: 'chart-bar',
            ...(isV3
                ? {  }
                : {
                    color: '#2962ff',
                }),
        },

    ]);

    return (
        <BottomNavigation
            style={{backgroundColor: 'f2f2f2'}}
            //safeAreaInsets={{ bottom: insets.bottom }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            labelMaxFontSizeMultiplier={2}
            renderScene={BottomNavigation.SceneMap({
                home: Main,
                statistic: Main,
            })}
        //sceneAnimationEnabled={sceneAnimation !== undefined}
        //sceneAnimationType={sceneAnimation}
        //sceneAnimationEasing={Easing.bounce}
        />
    );
}