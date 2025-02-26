import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Touchable } from 'react-native';;
import { FAB, Text, Divider, IconButton, useTheme, Appbar, Menu, TouchableRipple } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import dayjs from 'dayjs';
import { BusStopsInRoute, Schedules } from "@/providers/models/Models";
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday);
const weekDay = dayjs().weekday()

export default function SchedulesView() {
    const {
        base,
        selectMarker
    } = useAppContext();

    const [schedulesStopBus, setSchedulesStopBus] = useState<Schedules[]>([])

    useEffect(() => {
        if (selectMarker != undefined) {
            const busStop = base.BusStops[selectMarker]
            
            const schedulesStopBus = base.Schedules.filter(schedule => {
                const time = schedule.time.split(':')

                return schedule.BusStop.busStopId == busStop.id &&
                    +schedule.daysWork[weekDay - 1] &&
                    dayjs().isBefore(dayjs().set('h', +time[0]).set('minute', +time[1]).set('s', 0))
            })            
            //console.log(schedules[0].schedules)
            setSchedulesStopBus(schedulesStopBus)
        }
        //if (selectMarker) bottomSheetRef.current?.snapToIndex(2); else bottomSheetRef.current?.close();
    }, [selectMarker])

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const theme = useTheme();
    //console.log(schedulesStopBus)
    return <FlatList
        data={schedulesStopBus}
        renderItem={({ item }) => (<View style={Styles.itemContent} >
            <TouchableRipple onPress={() => { }}>
                <View style={Styles.stackRow} >
                    <Text variant="bodyLarge" >{item.BusStop.routeName}</Text>
                    <View style={Styles.stackColumn} >
                        <Text variant="bodyLarge" >{item?.time}</Text>
                    </View>
                </View>
            </TouchableRipple>
            <Divider />
        </View>
        )}>
    </FlatList>
}

const Styles = StyleSheet.create({

    itemContent: {
        //flex: 1,
        //height: 26,
        justifyContent: 'center',
        //alignItems: 'center'
    },

    stackRow: {
        flex: 1,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24
    },

    stackColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
})