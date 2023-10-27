import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, } from 'react-native';
import { SegmentedButtons, useTheme } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
//import { BarChart } from "react-native-charts-wrapper";
//import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { Canvas, Path, Skia, useComputedValue, useFont, Text, Glyphs, vec } from "@shopify/react-native-skia";
import * as d3 from 'd3'
import dayjs from 'dayjs'
import Ru from 'dayjs/locale/ru';

dayjs.locale(Ru);

const GRAPH_MARGIN = 8
const GRAPH_BAR_WIDTH = 45

const CanvasHeight = 150
const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
const FONT = require('../font/Roboto-Bold.ttf')
console.log(FONT, '1')

const BarChart = (props) => {

    if (props.data.length === 0) return <></>

    const theme = useTheme();  
    
    const data = props.data
    const font = props.font
    console.log(font)
    console.log(data)
    const CanvasWidth = (data.length * (GRAPH_BAR_WIDTH + GRAPH_MARGIN));
    const graphWidth = CanvasWidth + GRAPH_BAR_WIDTH
    //console.log(data, '0')
    const xDomain = data.map(xDataPoint => {
        console.log(font)
        //console.log(font.getGlyphIDs('Hello'))
        //const glyphs = font.getGlyphIDs(xDataPoint.label)
        return xDataPoint.label
    })
    const xRange = [0, graphWidth]
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1)

    const yDomain = [
        0,
        d3.max(data, yDataPoint => yDataPoint.value)
    ]

    const yRange = [0, graphHeight]
    const y = d3.scaleLinear().domain(yDomain).range(yRange)
    const graphPath = useComputedValue(() => {
        const newPath = Skia.Path.Make()

        data.forEach((dataPoint) => {

            const rect = Skia.XYWHRect(
                x(dataPoint.label) - GRAPH_BAR_WIDTH,
                graphHeight,
                GRAPH_BAR_WIDTH,
                y(dataPoint.value) * -1,

            )
            const roundedRect = Skia.RRectXY(rect, 0, 0)
            newPath.addRRect(roundedRect)
        })

        return newPath
    }, [data])

    return (
        <ScrollView style={Styles.container} horizontal showsHorizontalScrollIndicator={false}>
            <Canvas style={{ width: CanvasWidth, height: CanvasHeight }} >
                <Path path={graphPath} color={theme.colors.outline} />
                {data.map((dataPoint) => (
                    <Text
                        key={dataPoint.label}
                        font={font}
                        color={theme.colors.onSurface}
                        x={x(dataPoint.label) - 42}
                        y={CanvasHeight - 2}
                        text={dataPoint.label}
                    />

                ))}
            </Canvas>
        </ScrollView>)
}

const sum = (a, b) => (Number(a) + Number(b)).toString()

export default function ChartView({ navigation, route }) {

    const { listOfItems } = useAppContext();
    const [mode, setMode] = React.useState('day');
    const [listChart, setListChart] = useState([])
    const font = useFont(FONT)
    console.log(font)
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
                        return item
                    case 'week':
                        item.label = first.startOf(mode).month() === first.endOf(mode).month() ?
                            first.startOf(mode).format('DD') + '-' + first.endOf(mode).format('DD MMM') :
                            first.startOf(mode).format('DD MMM') + '-' + first.endOf(mode).format('DD MMM')
                        return item
                }
            })
            return labels.map((item,) => ({
                value: Number(item.profit),
                label: item.label
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
            <BarChart mode={mode} data={listChart} font={font} />
            <View>

            </View>
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
        marginTop: 12
    },
})
