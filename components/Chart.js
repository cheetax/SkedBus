import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions  } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { BarChart } from "react-native-chart-kit";
import dayjs from 'dayjs'

const ViewChart = (props) => {

    const {
        listOfItems
      } = useAppContext();

    // console.log(props.list)
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
                result.odometer = sum(result.odometer, item.odometer);
                result.expenses = sum(result.expenses, item.expenses);
                result.profitPerOdometer = (Number(result.profit)/Number(result.odometer)).toString()
            }
            else {

                acc.push({
                    period: dayjs(item.date).startOf(mode).toString() + '-' + dayjs(item.date).endOf(mode).toString(),
                    ...item})
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
        //backgroundColor: '#f2f2f2',
        margin: 24
    }
})
