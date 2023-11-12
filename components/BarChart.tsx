import React, { useState, useEffect, useRef, FC } from "react";
import { View, StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Text as TextRN } from 'react-native-paper';
import { Canvas, Skia, useTouchHandler, Rect, SkRect } from "@shopify/react-native-skia";
import d3 from 'd3'

type MyRect = {
    x: number;
    width: number;
    y: number;
    height: number;
}

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

interface GraphPathProps {
    data: ItemChart[],
    selectColor?: string
    color?: string
}
interface InsideBoundsProps {
    rect: SkRect,
    curX: number,
    curY: number
}

interface DataRectProps {
    data: ItemChart[]
}

const insideBounds: FC<InsideBoundsProps> = ({ rect, curX, curY }) => (curX >= rect.x && curX <= rect.x + rect.width && curY <= rect.y && curY >= rect.y + rect.height);

const GraphPathView: FC<GraphPathProps> = ({ data, selectColor, color }) => data.map((item) => {

    return <Rect
        key={item.label}
        rect={item.rect}
        color={item.isSelected ? selectColor : color}
    />
})

export const BarChart = (
    data: ItemChart[] = [],
    selectColor: string = 'green',
    color: string = 'grey',
    onSelect?: FC,
    graph_span: number = 8,
    graph_bar_width: number = 45,
    canvasHeight: number = 120,
    style?: StyleProp<ViewStyle>,
    styleLabels?: StyleProp<ViewStyle>
) => {

    if (data.length === 0) return <></>

    const [selected, setSelected] = useState<Selected>({ x: 0, y: 0, selItem: undefined })
    const _myScroll = useRef(null)

    type Chart = {
        canvasWidth: number,
        graphWidth: number,
        graphHeight : number,
        x: FC //d3.scalePoint().domain(xDomain).range(xRange).padding(1),
        y: FC //d3.scaleLinear().domain(yDomain).range(yRange)
    }

    type ParamsChart = () => Chart

    const paramsChart  = () => {
        const canvasWidth = (data.length * (graph_bar_width + graph_span))
        const graphWidth = canvasWidth + graph_bar_width + graph_span
        const graphHeight = canvasHeight //- 2 * graph_span
        const xRange = [0, graphWidth]
        const xDomain = data.map((xDataPoint: ItemChart) => xDataPoint.label)
        const yDomain = [
            0,
            d3.max(data, (yDataPoint: ItemChart) => yDataPoint.value)
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

    const dataRect: DataRect = (data) => data.map((item) => {
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

    const [dataChart, setData] = useState<ItemChart[]>([])

    const onTouch = useTouchHandler({
        onEnd: ({ x, y, type }) => {
            if (!onSelect) return
            if (type !== 2) return
            setSelected({ x, y, selItem: null })
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
        setSelected({ x: 0, y: 0, selItem: null });
        _myScroll.current.scrollTo({ x: 0, y: 0, animated: true });
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
        <ScrollView
            style={{ ...style }}
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
                <View style={{
                    ...styleLabels,
                    flexDirection: 'row',
                    height: 30
                }} >
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
        </ScrollView>)
}

const Styles = StyleSheet.create({
    graph: {}
})

