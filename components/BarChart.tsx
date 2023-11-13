import React, { useState, useEffect, useRef, FC, } from "react";
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Text as TextRN } from 'react-native-paper';
import { Canvas, Skia, useTouchHandler, Rect, SkRect } from "@shopify/react-native-skia";
import { scalePoint, scaleLinear, ScalePoint, ScaleLinear } from 'd3-scale'
import { max } from "d3-array";

type ItemChart = {
    label: string,
    value: number,
    rect: SkRect,
    isSelected?: boolean
}

type DataRect = (data: ItemChart[]) => ItemChart[]

type Selected = {
    x: number,
    y: number,
    selItem: ItemChart | undefined
}

type Params = {
    canvasWidth: number,
    graphWidth: number,
    graphHeight: number,
    x: ScalePoint<string>
    y: ScaleLinear<number, number>
}

type ParamsChart = () => Params

interface GraphPathProps {
    data: ItemChart[],
    selectColor?: string
    color?: string
}

interface BarCharProps {
    data: ItemChart[],
    selectColor: string,
    color: string,
    onSelect?: FC,
    graph_span: number,
    graph_bar_width: number,
    canvasHeight: number,
    style?: StyleProp<ViewStyle>,
    styleLabels?: StyleProp<ViewStyle>
}

const insideBounds = (rect: SkRect, curX: number, curY: number) => (curX >= rect.x && curX <= rect.x + rect.width && curY <= rect.y && curY >= rect.y + rect.height);

const GraphPathView: FC<GraphPathProps> = ({ data, selectColor, color }) => data.map((item) => {

    return <Rect
        key={item.label}
        rect={item.rect}
        color={item.isSelected ? selectColor : color}
    />
})

export const BarChart: FC<BarCharProps> = (
    { data = [],
        selectColor = 'green',
        color = 'grey',
        onSelect,
        graph_span = 8,
        graph_bar_width = 45,
        canvasHeight = 120,
        style,
        styleLabels }
) => {

    if (data.length === 0) return <></>

    const [selected, setSelected] = useState<Selected>({ x: 0, y: 0, selItem: undefined })
    const _myScroll = useRef<ScrollView>(null)

    const paramsChart: ParamsChart = () => {
        const canvasWidth = (data.length * (graph_bar_width + graph_span))
        const graphWidth = canvasWidth + graph_bar_width + graph_span
        const graphHeight = canvasHeight //- 2 * graph_span
        const xRange = [0, graphWidth]
        const xDomain = data.map((xDataPoint: ItemChart) => xDataPoint.label)
        const yDomain: (number | any)[] = [
            0,
            max(data, (yDataPoint: ItemChart) => yDataPoint.value)
        ];
        const yRange = [0, graphHeight];
        return {
            canvasWidth,
            graphWidth,
            graphHeight,
            x: scalePoint().domain(xDomain).range(xRange).padding(1),
            y: scaleLinear().domain(yDomain).range(yRange)
        }
    }

    const [{
        canvasWidth,
        graphWidth,
        graphHeight,
        x,
        y
    }, setParams] = useState<Params>(paramsChart())

    const dataRect: DataRect = data => data.map((item) => ({
        ...item,
        rect: Skia.XYWHRect(
            x(item.label)! - graph_bar_width - graph_span,
            graphHeight,
            graph_bar_width,
            y(item.value) * -1),
        isSelected: false
    }))

    const [dataChart, setData] = useState<ItemChart[]>([])

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
        setSelected({ x: 0, y: 0, selItem: undefined });
        _myScroll.current?.scrollTo({ x: 0, y: 0, animated: true });
    }, [data])

    useEffect(() => {
        if (!onSelect || !selected.selItem) return
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
    ])

    return (
        <ScrollView
            style={[style]}
            ref={_myScroll}
            contentOffset={{ x: 0, y: 0 }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={{
                width: canvasWidth - graph_span,
            }} >
                <Canvas style={{ width: canvasWidth, height: canvasHeight, marginLeft: 0 }} onTouch={onTouch}>
                    <GraphPathView data={dataChart} selectColor={selectColor} color={color} />
                </Canvas>
                <View style={
                    [styleLabels,
                        {
                            flexDirection: 'row',
                            height: 30
                        }
                    ]} >
                    {dataChart.map((dataPoint) => (
                        <TextRN
                            key={dataPoint.label}
                            style={{
                                width: graph_bar_width,
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
        </ScrollView >)
}

