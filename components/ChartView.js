import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions, ScrollView, } from 'react-native';
import { SegmentedButtons, } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
//import { BarChart } from "react-native-charts-wrapper";
//import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { Canvas, Path, Skia, useComputedValue, Text, useFont } from "@shopify/react-native-skia";
import * as d3 from 'd3'
import dayjs from 'dayjs'
import Ru from 'dayjs/locale/ru';

dayjs.locale(Ru);

const GRAPH_MARGIN = 8
const GRAPH_BAR_WIDTH = 45

const CanvasHeight = 100
const CanvasWidth = 200
const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
const graphWidth = CanvasWidth - 2;




const BarChart = (props) => {
    //console.log(props.data.length, 'длинна')

    if (props.data.length === 0) return <></>
    const font = useFont(require('../font/Roboto-Bold.ttf'))
    const data = props.data
    //const widthData = (data.length * 40) + 40
    //console.log(data, '0')
    const xDomain = data.map(xDataPoint => xDataPoint.label)
    const xRange = [0, graphWidth]
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1)

    const yDomain = [
        0,
        d3.max(data, yDataPoint => {
            //console.log(yDataPoint)
            return yDataPoint.value
        })
    ]

    const yRange = [0, graphHeight]
    const y = d3.scaleLinear().domain(yDomain).range(yRange)

    //console.log(data, '1')
    const graphPath = useComputedValue(() => {
        const newPath = Skia.Path.Make()
        //console.log(data, 2)

        data.forEach((dataPoint) => {

            const rect = Skia.XYWHRect(
                x(dataPoint.label) - GRAPH_BAR_WIDTH,
                graphHeight,
                GRAPH_BAR_WIDTH,
                y(dataPoint.value) * -1,

            )

            const roundedRect = Skia.RRectXY(rect, 0, 0)
            //console.log(roundedRect)
            newPath.addRRect(roundedRect)
        })

        return newPath
    }, [data])

    //console.log(graphPath)
    return (
        <View style={Styles.container}>

            <ScrollView horizontal>
                <Canvas style={Styles.canvas} >
                    <Path path={graphPath} color="purple" />
                    {data.map((dataPoint) => (
                        <Text
                            key={dataPoint.label}
                            font={font}
                            x={x(dataPoint.label) - 42}
                            y={CanvasHeight - 2}
                            text={dataPoint.label}
                        />
                    ))}
                </Canvas>

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
                //console.log(listOfItems)
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
                        //console.log(item)
                        return item
                    case 'week':
                        item.label = first.startOf(mode).month() === first.endOf(mode).month() ?
                            first.startOf(mode).format('DD') + '-' + first.endOf(mode).format('DD MMM') :
                            first.startOf(mode).format('DD MMM') + '-' + first.endOf(mode).format('DD MMM')
                        //console.log(item)
                        return item
                }
            })
            //console.log(labels)
            return labels.map((item, index) => ({
                value: Number(item.profit),
                label: item.label
            }))
        })
    }, [mode])
    //console.log(mode)
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
            <BarChart mode={mode} data={listChart} />
        </View>
    )
}

const Styles = StyleSheet.create({

    main: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: '#f2f2f2',
        margin: 24
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10
    },
    canvas: {
        height: CanvasHeight,
        width: CanvasWidth,
        //backgroundColor: 'green'
    }
})
