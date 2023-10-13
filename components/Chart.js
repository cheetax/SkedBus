import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { BarChart } from "react-native-chart-kit";
import dayjs from 'dayjs'
import Ru from 'dayjs/locale/ru';
dayjs.locale(Ru);

const ViewChart = (props) => {
    //console.log(props.list)
    const list = props.list

    const labels = (() => {
        if (list.length === 0) return []
        var dates = []
        const last = new Date(list[0].date)
        let first = dayjs(list[list.length - 1].date).startOf('month')
        console.log(list)
        switch (props.mode) {
            case 'day':
            case 'month':
                // заполнить дни месяца со статистикой
                // получаем первую запись базы
                while (+first.toDate() < +last) {
                    dates.push(first.format(props.mode === 'day' ? 'DD.MMM' : 'MMMM'));
                    first = first.add(1, props.mode)
                    //console.log(first)
                }
            case 'week':
                while (+first.toDate() < +last) {
                    dates.push(first.startOf(props.mode).format('DD.MMM') & '-' & first.endOf(props.mode).format('DD.MMM'));
                    first = first.add(1, props.mode)
                    console.log(first.startOf(props.mode).format('DD.MMM'))
                    console.log(first.endOf(props.mode).format('DD.MMM'))
                }
        }
        return dates.slice(0)

    })()
    console.log(labels)
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29]
            },
        ],
    };
    return (
        <View>
            <BarChart
                data={data}
                width={Dimensions.get('window').width}
                height={200}
                yAxisSuffix={''}
                //yAxisLabel={'$'}
                chartConfig={{
                    //backgroundGradientFrom: 'darkblue',
                    //backgroundGradientTo: 'blue',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}
            />
        </View>)
}

const sum = (a, b) => (Number(a) + Number(b)).toString()

export default function Chart({ navigation, route }) {

    const { listOfItems } = useAppContext();
    const [mode, setMode] = React.useState('day');

    const [listChart, setListChart] = useState([])

    useEffect(() => {
        const data = JSON.parse(JSON.stringify(listOfItems));
        setListChart(data.reduce((acc, item) => {

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
                    period: dayjs(item.date).startOf(mode).toString() + '-' + dayjs(item.date).endOf(mode).toString(),
                    ...item,
                    odometer: item.odometer.resultOdometer
                })
            }
            //console.log(listOfItems)
            return acc

        }, []))
        console.log(listChart)
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
        //backgroundColor: '#f2f2f2',
        margin: 24
    }
})
