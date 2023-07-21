import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import dayjs from 'dayjs'

const ViewChart = (props) => {
    // console.log(props.list)
    return (
        <View>
            <FlatList
                data={props.list}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.date}</Text>
                        <Text>{item.proceeds}</Text>
                    </View>)}
            >
            </FlatList>
        </View>)
}

export default function Chart({ navigation, route }) {

    const { listOfItems } = useAppContext();
    const [mode, setMode] = React.useState('day');

    const [listChart, setListChart] = useState([])

    useEffect(() => {
        const data = JSON.parse(JSON.stringify(listOfItems));
        setListChart(data.reduce((acc, item) => {

            var result = acc.find(itemACC => {
                //console.log(dayjs(itemACC.date).isSame(dayjs(item.date), mode))
                return dayjs(itemACC.date).isSame(dayjs(item.date), mode)
            })
            //console.log(result)
            if (result) {

                //console.log(result)

                result.proceeds = (Number(result.proceeds) + Number(item.proceeds)).toString();
                //console.log(result)
                acc = acc.filter(list => list.key != result.key)
                acc.push(result)


            }
            else {
                //console.log(JSON.stringify(acc))

                acc.push(item)
                //console.log(JSON.stringify(acc))
            }
            //console.log(listOfItems)
            return acc

        }, []))
    }, [mode])

    return (
        <View style={Styles.main}>
            <SegmentedButtons
                value={mode}
                onValueChange={setMode}
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
            <ViewChart mode={mode} list={listChart} />
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
