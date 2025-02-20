import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Touchable } from 'react-native';;
import { FAB, Text, Divider, IconButton, useTheme, Appbar, Menu, TouchableRipple } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import TabsView from "./TabView";
import dayjs from 'dayjs';
import { BusStopsInRoute, Schedules } from "@/providers/models/Models";
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday);
const weekDay = dayjs().weekday()

export default function Review() {
    const {
        base,
        selectMarker,
        onSelectMarker
    } = useAppContext();

    const [schedulesStopBus, setSchedulesStopBus] = useState<BusStopsInRoute[]>([])

    useEffect(() => {
        if (selectMarker) {
            const busStop = base.BusStops[selectMarker]
            const stopBus = base.BusStopsInRoute.filter(rec => rec.busStop == busStop.id)
            const schedules = stopBus.map<BusStopsInRoute>((route, index) => ({
                ...route,
                schedules: route.schedules.filter(schedule => {
                    const time = schedule.time.split(':')
                    //console.log(+schedule.daysWork[weekDay - 1] && dayjs().isBefore(dayjs().set('h', +time[0]).set('minute', +time[1]).set('s', 0)))
                    return +schedule.daysWork[weekDay - 1] && dayjs().isBefore(dayjs().set('h', +time[0]).set('minute', +time[1]).set('s', 0))
                }).slice(0, 3)
            }))
            //console.log(schedules[0].schedules)
            setSchedulesStopBus(schedules)
        }
        //if (selectMarker) bottomSheetRef.current?.snapToIndex(2); else bottomSheetRef.current?.close();
    }, [selectMarker])

    //const bottomSheetRef = useRef<BottomSheet>(null);

    //const onClosePress = () => onSelectMarker(selectMarker)

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const theme = useTheme();
    //console.log(schedulesStopBus[0].schedules.flatMap(v => ' ' + v.time).toString())
    return <FlatList
        data={schedulesStopBus}
        renderItem={({ item }) => (<View style={Styles.itemContent} >

            <TouchableRipple onPress={() => { }}>
                <View style={Styles.stackRow} >
                    <Text variant="bodyLarge" >{item.route.name}</Text>
                    <View style={Styles.stackColumn} >
                        <Text variant="bodyLarge" >{item.schedules[0]?.time || 'нет рейсов'}</Text>
                        <Text variant="bodySmall" >{item.schedules.slice(1, 3).flatMap(a => ' ' + a.time).toString()}</Text>
                    </View>

                    {/* <View style={Styles.stackRow} >
                                    <Text variant="bodyMedium" >Спидометр: начало - {item.odometerStart};</Text>
                                    <Text variant="bodyMedium" > конец - {item.odometerFinish} </Text>
                                </View> */}
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
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    stackColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
})