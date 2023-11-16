import React, { useState, useEffect, } from "react";
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, useTheme, Text, Card, Divider } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { BarChart, ItemChart } from "./BarChart";
import { round } from "../helpers";
import type { Item, Modify } from "../providers/models/Models";

//import { DrawerScreenProps } from "@react-navigation/drawer";
//import { RootStackParamList } from "../typesNavigation";
import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import Ru from 'dayjs/locale/ru';

dayjs.locale(Ru);

const sum = (a: number | string, b: number | string) => (Number(a) + Number(b))//.toString()

type ItemChartData = Modify<Item, {
    odometer: number,
    label?: string,
    value?: number
}>


interface Format {
    [key: string]: (t: Dayjs) => string
}

export default function ChartView() {

    const { listOfItems } = useAppContext();
    const [mode, setMode] = useState('day');
    const [listChart, setListChart] = useState<ItemChartData[]>([])
    const [selectItem, setSelectItem] = useState<ItemChartData>()
    const format : Format = {
        day: (first: Dayjs) => first.startOf(mode as OpUnitType).format('DD MMM'),
        week: (first: Dayjs) => first.startOf(mode as OpUnitType).format('DD') + '-' + first.endOf(mode as OpUnitType).format('DD MMM'),
        month: (first: Dayjs) => first.startOf(mode as OpUnitType).format('MMM'),
    }
    const formatDate = {
        'day': (first: Dayjs) => 'За ' + first.startOf(mode as OpUnitType).format('DD MMMM YYYY'),
        week: (first: Dayjs) => 'С ' + first.startOf(mode as OpUnitType).format('DD MMMM YY') + ' по ' + first.endOf(mode as OpUnitType).format('DD MMMM YY'),
        month: (first: Dayjs) => 'За ' + first.startOf(mode as OpUnitType).format('MMMM YYYY')
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

    const onSelect = (item: ItemChart) => setSelectItem(item as ItemChartData)

    useEffect(() => {

        setListChart(_list => {

            const data: ItemChartData[] = listOfItems.reduce<ItemChartData[]>((acc, item) => {

                const result = acc.find(itemACC => dayjs(itemACC.date).isSame(dayjs(item.date), mode as OpUnitType))
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
                <BarChart
                    //mode={mode}
                    data={listChart as ItemChart[]}
                    onSelect={onSelect}
                    selectColor={theme.colors.onSurfaceVariant}
                    color={theme.colors.outlineVariant}
                    style={{ marginVertical: 10, marginHorizontal: 16, }}
                    styleLabels={{ marginTop: 4, }}

                />
                <Card.Title
                    title="Статистика"
                />
                <Card.Content>
                    <View></View>
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
