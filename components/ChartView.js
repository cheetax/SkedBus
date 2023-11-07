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
    const [selectItem, setSelectItem] = useState({})
    const theme = useTheme();

    const onSelect = item => {
        setSelectItem(item)
        // console.log(e.label)
    }

    useEffect(() => {

        setListChart(list => {

            const data = listOfItems.reduce((acc, item) => {

                var result = acc.find(itemACC => dayjs(itemACC.date).isSame(dayjs(item.date), mode))
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
                return acc.splice(0)
            }, [])
            const labels = data.map(item => {
                const first = dayjs(item.date)
                switch (mode) {
                    case 'day':
                    case 'month':
                        // заполнить дни месяца со статистикой
                        // получаем первую запись базы
                        item.label = first.format(mode === 'day' ? 'DD MMM' : 'MMM')
                        break
                    case 'week':
                        item.label = first.startOf(mode).month() === first.endOf(mode).month() ?
                            first.startOf(mode).format('DD') + '-' + first.endOf(mode).format('DD MMM') :
                            first.startOf(mode).format('DD MMM') + '-' + first.endOf(mode).format('DD MMM')
                        break
                }
                return item
            })
            return labels.map((item) => ({
                ...item,
                value: Number(item.profit),
                label: item.label,
            }))
        })
    }, [mode, listOfItems])

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
            <Card
                style={{ ...Styles.card, }}
            >
                <BarChart
                    mode={mode}
                    data={listChart}
                    onSelect={onSelect}
                    selectColor={theme.colors.onSurfaceVariant}
                    color={theme.colors.outlineVariant}
                />

            </Card>

            {selectItem ? <View>
                <Text>{selectItem.value}</Text>
            </View> : <></>}
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
