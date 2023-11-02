import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, } from 'react-native';
import { useTheme, Text as TextRN } from 'react-native-paper';
import { Canvas, Skia, useTouchHandler, Rect } from "@shopify/react-native-skia";
import * as d3 from 'd3'

const GRAPH_MARGIN = 8
const GRAPH_BAR_WIDTH = 45

const CanvasHeight = 150
const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;

const insideBounds = (rect, curX, curY) => {
    return (curX >= rect.x && curX <= rect.x + rect.width && curY <= rect.y && curY >= rect.y + rect.height);
}

const GraphPath = ({ data, selected, selectColor, color }) => data.map((item) => {
    return <Rect
        key={item.label}
        rect={item.rect}
        //color={color}
        color={insideBounds(item.rect, selected.x, selected.y) && selected.isSelected ? selectColor : color}
    /> 
})

export const BarChart = (props) => {

    if (props.data.length === 0) return <></>

    const CanvasWidth = (props.data.length * (GRAPH_BAR_WIDTH + GRAPH_MARGIN));
    const graphWidth = CanvasWidth + GRAPH_BAR_WIDTH + GRAPH_MARGIN
    const xDomain = props.data.map(xDataPoint => xDataPoint.label)
    const xRange = [0, graphWidth]
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1)

    const yDomain = [
        0,
        d3.max(props.data, yDataPoint => yDataPoint.value)
    ]

    const yRange = [0, graphHeight]
    const y = d3.scaleLinear().domain(yDomain).range(yRange)

    const dataRect = (data) => data.map((item) => {
        return {
            ...item,
            rect: Skia.XYWHRect(
            x(item.label) - GRAPH_BAR_WIDTH,
            graphHeight,
            GRAPH_BAR_WIDTH,
            y(item.value) * -1)}
    })

    const theme = useTheme()

    const { selectColor = 'red', color = theme.colors.outline } = props

    const [data, setData] = useState(dataRect(props.data))

    const [selected, setSelected] = useState({ x: 0, y: 0, isSelected: false })
    //const onT = props.onTouch('Тест')
    const onTouch = useTouchHandler({
        onEnd: ({ x, y, type }) => {
            if (type !== 2) return
            setSelected({
                x, y, isSelected: true

            })
            props.onTouch(data.find((item) => insideBounds(item.rect, x , y)))
        }
    })

    useEffect(() => {
        setData(dataRect(props.data))
        setSelected({ x: 0, y: 0, isSelected: false })
    }, [props.data])

    return (
        <ScrollView style={Styles.container} horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, width: CanvasWidth, }} >
                <Canvas style={{ width: CanvasWidth, height: CanvasHeight }} onTouch={onTouch}>
                    <GraphPath data={data} selected={selected} selectColor={selectColor} color={color} />
                </Canvas>
                <View style={{ marginLeft: GRAPH_MARGIN, flex: 1, flexDirection: 'row', width: graphWidth, }} >
                    {data.map((dataPoint) => (
                        <TextRN
                            key={dataPoint.label}
                            style={{ width: GRAPH_BAR_WIDTH, marginRight: 8, textAlign: 'center', fontSize: 12, }}
                        >{dataPoint.label}</TextRN>
                    ))}
                </View>
            </View>
        </ScrollView>)
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
})

