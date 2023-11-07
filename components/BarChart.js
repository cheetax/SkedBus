import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, } from 'react-native';
import { Text as TextRN } from 'react-native-paper';
import { Canvas, Skia, useTouchHandler, Rect } from "@shopify/react-native-skia";
import * as d3 from 'd3'

const insideBounds = (rect, curX, curY) => {
    return (curX >= rect.x && curX <= rect.x + rect.width && curY <= rect.y && curY >= rect.y + rect.height);
}

const GraphPath = ({ data, selectColor, color }) => data.map((item) => {
    return <Rect
        key={item.label}
        rect={item.rect}
        color={item.isSelected ? selectColor : color}
    />
})

export const BarChart = ({
    data = [],
    selectColor = 'green',
    color = 'grey',
    onSelect,
    GRAPH_MARGIN = 8,
    GRAPH_BAR_WIDTH = 45,
    canvasHeight = 120,
}) => {

    if (data.length === 0) return <></>

    const paramsChart = () => {
        const canvasWidth = (data.length * (GRAPH_BAR_WIDTH + GRAPH_MARGIN))
        const graphWidth = canvasWidth + GRAPH_BAR_WIDTH + GRAPH_MARGIN
        const graphHeight = canvasHeight - 2 * GRAPH_MARGIN
        const xRange = [0, graphWidth]
        const xDomain = data.map(xDataPoint => xDataPoint.label)
        const yDomain = [
            0,
            d3.max(data, yDataPoint => yDataPoint.value)
        ];
        const yRange = [0, graphHeight];
        return {
            canvasWidth,
            graphWidth,
            graphHeight,
            x: d3.scalePoint().domain(xDomain).range(xRange).padding(1),
            y: d3.scaleLinear().domain(yDomain).range(yRange)
        }
    }

    const [{
        canvasWidth,
        graphWidth,
        graphHeight,
        x,
        y
    }, setParams] = useState(paramsChart())

    const dataRect = (data) => data.map((item) => {
        return {
            ...item,
            rect: Skia.XYWHRect(
                x(item.label) - GRAPH_BAR_WIDTH,
                graphHeight,
                GRAPH_BAR_WIDTH,
                y(item.value) * -1),
            isSeleted: false
        }
    })

    const [dataChart, setData] = useState(dataRect(data))

    const [selected, setSelected] = useState({ x: 0, y: 0 })

    const onTouch = useTouchHandler({
        onEnd: ({ x, y, type }) => {
            //console.log(onSelect)
            if (!onSelect) return
            if (type !== 2) return
            setData((data) => data.map((item) => {
                const result = insideBounds(item.rect, x, y)
                if (result) onSelect(item)
                return {
                    ...item,
                    isSelected: result
                }
            }))
            setSelected({ x, y })
        }
    })

    useEffect(() => {
        setParams(paramsChart())
    }, [data])

    useEffect(() => {
        setData(dataRect(data))
        setSelected({ x: 0, y: 0 })
    }, [
        canvasWidth,
        graphWidth,
        graphHeight,
        x,
        y
    ])

    return (
        <ScrollView style={{ ...Styles.container }} horizontal showsHorizontalScrollIndicator={false}>
            <View style={{
                width: canvasWidth,
            }} >
                <Canvas style={{ width: canvasWidth, height: canvasHeight }} onTouch={onTouch}>
                    <GraphPath data={dataChart} selected={selected} selectColor={selectColor} color={color} />
                </Canvas>
                <View style={{
                    marginLeft: GRAPH_MARGIN,
                    flexDirection: 'row',
                    width: graphWidth,
                }} >
                    {dataChart.map((dataPoint) => (
                        <TextRN
                            key={dataPoint.label}
                            style={{
                                width: GRAPH_BAR_WIDTH,
                                marginRight: 8,
                                textAlign: 'center',
                                fontSize: 12,
                                fontWeight: dataPoint.isSelected ? "bold" : 'normal'
                            }}
                        >{dataPoint.label}</TextRN>
                    ))}
                </View>
            </View>
        </ScrollView>)
}

const Styles = StyleSheet.create({

    main: {
        flexDirection: 'column',
        margin: 24
    },
    container: {
        marginTop: 12,
    },
})

