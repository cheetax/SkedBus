import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
const ViewChart = ( props ) => {
    
    return (
        <View>
            <Text>{props.mode}</Text>
        </View>)
}

export default function Chart({ navigation, route }) {
    const [value, setValue] = React.useState('day');
    const {listsOfItems} = useAppContext();
    console.log(listsOfItems)
    return (
        <View style={Styles.main}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'day',
                        label: 'День',
                    },
                    {
                        value: 'week',
                        label: 'Неделя',
                    },
                    {
                        value: 'month',
                        label: 'Месяц'
                    },
                ]}
            />
            <ViewChart mode={value} />
        </View>
    )
}

const Styles = StyleSheet.create({

    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        margin: 24
    }
})
