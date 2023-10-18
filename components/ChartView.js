import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
//import { BarChart } from "react-native-charts-wrapper";
import { Canvas } from "@shopify/react-native-skia";
import dayjs from 'dayjs'
import Ru from 'dayjs/locale/ru';
dayjs.locale(Ru);

const BarChart = (props) => {

    const widthData = (data.length * 40) + 40
    console.log(data)
    return (
        <View>
            <ScrollView horizontal>


            </ScrollView>

        </View>)
}

const sum = (a, b) => (Number(a) + Number(b)).toString()

export default function ChartView({ navigation, route }) {

    const { listOfItems } = useAppContext();
    const [mode, setMode] = React.useState('day');

    const [listChart, setListChart] = useState([])
    //const [data, setData] = useState([])

    useEffect(() => {
        // const data = JSON.parse(JSON.stringify(listOfItems));
        setListChart(list => {

            const data = listOfItems.reduce((acc, item) => {

                var result = acc.find(itemACC => dayjs(itemACC.date).isSame(dayjs(item.date), mode)
                )
                //console.log(dayjs(item.date).startOf(mode))
                if (result) {
                    result.proceeds = sum(result.proceeds, item.proceeds);
                    result.profit = sum(result.profit, item.profit);
                    result.odometer = sum(result.odometer, item.odometer.resultOdometer);
                    result.expenses = sum(result.expenses, item.expenses);
                    result.profitPerOdometer = (Number(result.profit) / Number(result.odometer)).toString()
                }
                else {
                    acc.push({
                        ...item,
                        key: dayjs(item.date).startOf(mode),
                        odometer: item.odometer.resultOdometer
                    })
                }
                //console.log(listOfItems)
                return acc.splice(0)
            }, [])
            //console.log(listChart)

            console.log(props.list)
            const list = props.list
            const widthScreen = Dimensions.get('window').width
            const labels = list.map(item => {
                const first = dayjs(item.date)
                switch (props.mode) {
                    case 'day':
                    case 'month':
                        // заполнить дни месяца со статистикой
                        // получаем первую запись базы
                        item.label = first.format(props.mode === 'day' ? 'DD MMM' : 'MMM')
                        //console.log(item)
                        return item
                    case 'week':
                        item.label = first.startOf(props.mode).month() === first.endOf(props.mode).month() ?
                            first.startOf(props.mode).format('DD') + '-' + first.endOf(props.mode).format('DD MMM') :
                            first.startOf(props.mode).format('DD MMM') + '-' + first.endOf(props.mode).format('DD MMM')
                        //console.log(item)
                        return item
                }
            })
            console.log(labels)
            return {
                dataSets:
                    [{
                        values: labels.map((item, index) => {
                            return {

                                y: item.profit,
                                x: index + 1,
                                marker: item.label
                            }
                        })
                    }]
            }
        })

    }, [mode])
    console.log(data)
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
            <BarChart mode={mode} list={listChart} />
        </View>
    )
}

const Styles = StyleSheet.create({

    main: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: '#f2f2f2',
        margin: 24
    }
})
