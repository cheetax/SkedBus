import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from 'react-native';;
import { Text, Divider, useTheme, TouchableRipple } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import dayjs from 'dayjs';
import { BusStopsInRoute, Schedules } from "@/providers/models/Models";
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday);
const weekDay = dayjs().weekday()

export default function Review() {
    const {
        base,
        selectMarker,
    } = useAppContext();

    const [schedulesStopBus, setSchedulesStopBus] = useState<BusStopsInRoute[]>([])

    useEffect(() => {
        if (selectMarker != undefined) {
            const busStop = base.BusStops[selectMarker]
            const stopBus = base.BusStopsInRoute.filter(rec => rec.busStop == busStop.id)
            const schedules = stopBus.map<BusStopsInRoute>((route, index) => ({
                ...route,
                schedules: route.schedules.filter(schedule => {
                    const time = schedule.time.split(':')
                    return +schedule.daysWork[weekDay - 1] &&
                        dayjs().isBefore(dayjs().set('h', +time[0]).set('minute', +time[1]).set('s', 0))
                }).slice(0, 3)
            }))
            setSchedulesStopBus(schedules)
        }
    }, [selectMarker])

    const theme = useTheme();
    return <FlatList
        data={schedulesStopBus}
        renderItem={({ item }) => (<View style={Styles.itemContent} >
            <TouchableRipple onPress={() => { }}>
                <View style={Styles.stackRow} >
                    <View style={Styles.item} >
                        <Text variant="bodyLarge" >{item.routeName}</Text>
                        <View style={Styles.stackColumn} >
                            <Text variant="bodyLarge" >{item.schedules[0]?.time || 'нет рейсов'}</Text>
                            {(item.schedules.length > 1) && <Text variant="bodySmall" >{item.schedules.slice(1, 3).flatMap(a => ' ' + a.time).toString()}</Text>}
                        </View>
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
        justifyContent: 'center',
    },

    stackRow: {
        flex: 1,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24
    },

    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    stackColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
})