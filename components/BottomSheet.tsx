import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Touchable } from 'react-native';;
import { FAB, Text, Divider, IconButton, useTheme, Appbar, Menu, TouchableRipple } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function ViewBottomSheet() {
    const {
        base,
        selectMarker
    } = useAppContext();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const theme = useTheme();

    return (
        <View style={Styles.main} >
            <GestureHandlerRootView style={Styles.container}>
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={Styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
            {/* <FlatList
                //onScroll={(e) => startScroll(e.nativeEvent.contentOffset.y)}
                data={base.Schedules}

                renderItem={({ item }) => (
                    <View>
                        <TouchableRipple onPress={() => { }}>
                            <View style={Styles.item} >
                                <View style={Styles.itemContent} >
                                    <Text variant="bodyLarge" >Пробег: {item.odometerFinish - item.odometerStart}</Text>
                                    <View style={Styles.stackRow} >
                                        <Text variant="bodyMedium" >Спидометр: начало - {item.odometerStart};</Text>
                                        <Text variant="bodyMedium" > конец - {item.odometerFinish} </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableRipple>
                        <Divider />
                    </View>)
                }
            >
            </FlatList > */}
        </View >
    );
}

const Styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        zIndex: 1000,
        alignSelf: 'flex-end',
        bottom: 16,
        right: 16,
    },
    main: {
        // flex: 1,
        flexDirection: 'column',
    },
    itemContent: {
        height: 72,
        justifyContent: 'center',
    },

    item: {
        flexDirection: 'row',
        margin: 0,
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    },
    iconButton: {
        margin: 0,
    },
    stackRow: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        // backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
})