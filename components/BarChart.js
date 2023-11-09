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
    graph_span = 8,
    graph_bar_width = 45,
    canvasHeight = 120,
    style = Styles.graph,
    styleLabels
}) => {

    if (data.length === 0) return <></>


    const [selected, setSelected] = useState({ x: 0, y: 0, selItem: undefined })

    const paramsChart = () => {
        const canvasWidth = (data.length * (graph_bar_width + graph_span))
        const graphWidth = canvasWidth + graph_bar_width + graph_span
        const graphHeight = canvasHeight//- 2 * graph_span
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
        const rect = Skia.XYWHRect(
            x(item.label) - graph_bar_width - graph_span,
            graphHeight,
            graph_bar_width,
            y(item.value) * -1);
        return {
            ...item,
            rect,
           // isSelected: insideBounds(rect, selected.x, selected.y)
        }
    })

    const [dataChart, setData] = useState([])

    const onTouch = useTouchHandler({
        onEnd: ({ x, y, type }) => {
            if (!onSelect) return
            if (type !== 2) return
            setSelected({ x, y, selItem: undefined })
            setData((data) => data.map((item) => {
                const result = insideBounds(item.rect, x, y)
                if (result) setSelected({ x, y, selItem: item })
                return {
                    ...item,
                    isSelected: result
                }
            }))         
        }
    })

    useEffect(() => {
        setParams(paramsChart())
        setSelected({ x: 0, y: 0, selItem: undefined })
    }, [data])

    useEffect(() => {
       if (!onSelect) return 
       onSelect(selected.selItem)
    }, [selected.selItem])

    useEffect(() => {
        setData(dataRect(data))
    }, [
        canvasWidth,
        graphWidth,
        graphHeight,
        x,
        y,
      //  selected
    ])

    return (
        <ScrollView style={{ ...style }} horizontal showsHorizontalScrollIndicator={false}>
            <View style={{
                width: canvasWidth - graph_span,
            }} >
                <Canvas style={{ width: canvasWidth, height: canvasHeight, marginLeft: 0 }} onTouch={onTouch}>
                    <GraphPath data={dataChart} selected={selected} selectColor={selectColor} color={color} />
                </Canvas>
                <View style={{
                    ...styleLabels,
                    flexDirection: 'row',
                    height: 30
                }} >
                    {dataChart.map((dataPoint) => (
                        <TextRN
                            key={dataPoint.label}
                            style={{
                                width: graph_bar_width ,
                                marginRight: graph_span,
                                textAlign: 'center',
                                fontSize: 12,
                                fontWeight: dataPoint.isSelected ? "bold" : 'normal',
                               // borderWidth: 1
                            }}
                        >{dataPoint.label}</TextRN>
                    ))}
                </View>
            </View>
        </ScrollView>)
}

const Styles = StyleSheet.create({
    graph: {}
})

