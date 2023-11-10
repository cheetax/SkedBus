import React, { useState, useEffect, } from "react";
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, useTheme, Text, Card, Divider } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { useScrollContext } from "../providers/ScrollContextProvider";
import { BarChart } from "./BarChart";
import dayjs from 'dayjs'
import Ru from 'dayjs/locale/ru';

dayjs.locale(Ru);

const sum = (a, b) => (Number(a) + Number(b))//.toString()

export default function ChartView({ navigation, route }) {

    const { listOfItems, round } = useAppContext();
    const { setScreen } = useScrollContext();
    const [mode, setMode] = useState('day');
    const [listChart, setListChart] = useState([])
    const [selectItem, setSelectItem] = useState(null)
    const format = {
        day: (first) => first.startOf(mode).format('DD MMM'),
        week: (first) => first.startOf(mode).format('DD') + '-' + first.endOf(mode).format('DD MMM'),
        month: (first) => first.startOf(mode).format('MMM')
    }
    const formatDate = {
        day: (first) => 'За ' + first.startOf(mode).format('DD MMMM YYYY'),
        week: (first) => 'С ' + first.startOf(mode).format('DD MMMM YY') + ' по ' + first.endOf(mode).format('DD MMMM YY'),
        month: (first) => 'За ' + first.startOf(mode).format('MMMM YYYY')
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
                // console.log(result)
                if (result) {
                    result.proceeds = sum(result.proceeds, item.proceeds);
                    result.profit = sum(result.profit, item.profit);
                    result.odometer = sum(result.odometer, item.odometer.resultOdometer);
                    result.expenses = sum(result.expenses, item.expenses);
                    //result.profitPerOdometer = round(sum(result.profitPerOdometer, item.profitPerOdometer));
                    result.profitPerOdometer = round(Number(result.profit) / Number(result.odometer)).toString()
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

   // console.log(route)
    return (
        <View style={[Styles.main, { backgroundColor: theme.colors.surface }]}>
            <SegmentedButtons
                style={Styles.surface}
                value={mode}
                onValueChange={setMode}
                buttons={buttons}
            />
            <Card
                style={{ ...Styles.card, ...Styles.surface }}

            >
                {/*   <BarChart
                    mode={mode}
                    data={listChart}
                    onSelect={onSelect}
                    selectColor={theme.colors.onSurfaceVariant}
                    color={theme.colors.outlineVariant}
                    style={{ marginVertical: 10, marginHorizontal: 16 }}
                    styleLabels={{ marginTop: 4 }}

                /> */}
                <Card.Title
                    title="Статистика"
                />
                <Card.Content>
                    <View style={Styles.stackRow} >
                        <Text style={Styles.text} variant='bodyMedium'>Выручка:</Text>
                        <Text style={Styles.text} variant='bodyMedium'>{selectItem ? selectItem.proceeds : '-'}</Text>
                    </View>
                    <View style={Styles.stackRow} >
                        <Text style={Styles.text} variant='bodyMedium'>Затраты:</Text>
                        <Text style={Styles.text} variant='bodyMedium'>{selectItem ? selectItem.expenses : '-'}</Text>
                    </View>
                    <Divider style={Styles.dividerCard} />
                    <View style={Styles.stackRow} >
                        <Text style={Styles.text} variant='bodyMedium'>Доход:</Text>
                        <Text style={Styles.text} variant='bodyMedium'>{selectItem ? selectItem.profit : '-'}</Text>
                    </View>
                    <Divider style={Styles.dividerCard} />
                    <View style={Styles.stackRow} >
                        <Text style={Styles.text} variant='bodyMedium'>Пробег:</Text>
                        <Text style={Styles.text} variant='bodyMedium'>{selectItem ? selectItem.odometer : '-'}</Text>
                    </View>
                    <View style={Styles.stackRow} >
                        <Text style={Styles.text} variant='bodyMedium'>Доход на пробег:</Text>
                        <Text style={Styles.text} variant='bodyMedium'>{selectItem ? selectItem.profitPerOdometer : '-'}</Text>
                    </View>
                </Card.Content>
            </Card>


        </View>
    )
}

const Styles = StyleSheet.create({

    main: {
        flex: 1,
        flexDirection: 'column',
        //  margin: 24,
    },
    surface: {
        marginHorizontal: 22
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
    dividerCard: {
        marginBottom: 8,
        marginTop: 8
    },
    text: {
        paddingHorizontal: 0,
        paddingRight: 8,
    },
    stackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flex: 1
    }
})
