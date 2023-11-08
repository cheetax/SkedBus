import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, useTheme, Text, Card } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { BarChart } from "./BarChart";
import dayjs from 'dayjs'
import Ru from 'dayjs/locale/ru';

dayjs.locale(Ru);

const sum = (a, b) => (Number(a) + Number(b)).toString()

export default function ChartView({ navigation, route }) {

    const { listOfItems } = useAppContext();
    const [mode, setMode] = useState('day');
    const [listChart, setListChart] = useState([])
    const [selectItem, setSelectItem] = useState()
    const format = {
        day: (first) => first.startOf(mode).format('DD MMM'),
        week: (first) => first.startOf(mode).format('DD') + '-' + first.endOf(mode).format('DD MMM'),
        month: (first) => first.startOf(mode).format('MMM')
    }
    const formatDate = {
        day: (first) => first.startOf(mode).format('DD MMMM YYYY'),
        week: (first) => first.startOf(mode).format('DD MMMM') + '-' + first.endOf(mode).format('DD MMMM'),
        month: (first) => first.startOf(mode).format('MMMM YYYY')
    }
    const buttons = [
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
    ]

    const theme = useTheme();

    const onSelect = item => setSelectItem(item)

    useEffect(() => {

        setListChart(list => {

            const data = listOfItems.reduce((acc, item) => {

                const result = acc.find(itemACC => dayjs(itemACC.date).isSame(dayjs(item.date), mode))
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
                        odometer: item.odometer.resultOdometer
                    })
                }
                return acc.splice(0)
            }, [])
            return data.map(item => ({
                ...item,
                value: Number(item.profit),
                label: format[mode](dayjs(item.date))
            }))
        })
    }, [mode, listOfItems])
    console.log(selectItem)
    return (
        <View style={Styles.main}>
            <SegmentedButtons
                value={mode}
                onValueChange={setMode}
                buttons={buttons}
            />
            <Card
                style={{ ...Styles.card, }}

            >
                <BarChart
                    mode={mode}
                    data={listChart}
                    onSelect={onSelect}
                    selectColor={theme.colors.onSurfaceVariant}
                    color={theme.colors.outlineVariant}
                    style={{ marginVertical: 10, marginHorizontal: 16 }}
                    styleLabels={{ marginTop: 4 }}

                />
                <Card.Title
                    title="Статистика"
                    subtitle={selectItem.date ? <View>
                        <Text>Информация за {formatDate[mode](dayjs(selectItem.date))}</Text>
                    </View> : <></>}
                ></Card.Title>
            </Card>


        </View>
    )
}

const Styles = StyleSheet.create({

    main: {
        flex: 1,
        flexDirection: 'column',
        margin: 24
    },
    container: {
        flex: 1,
        marginTop: 12,
    },
    card: {
        marginTop: 8,
        marginHorizontal: 2,
        marginBottom: 2,
        // flex: 1
    },
})
