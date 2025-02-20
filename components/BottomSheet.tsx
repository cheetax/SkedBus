import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Touchable } from 'react-native';;
import { FAB, Text, Divider, IconButton, useTheme, Appbar, Menu, TouchableRipple } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import TabsView from "./TabView";

export default function ViewBottomSheet() {
    const {
        base,
        selectMarker,
        onSelectMarker
    } = useAppContext();

    useEffect(() => {
        if (selectMarker) bottomSheetRef.current?.snapToIndex(1); else bottomSheetRef.current?.close();
    }, [selectMarker])

    const bottomSheetRef = useRef<BottomSheet>(null);

    const onClosePress = () => onSelectMarker(selectMarker)

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const theme = useTheme();
    //console.log((!!selectMarker) && base.BusStops[selectMarker].name)
    return (
        <BottomSheet
            //handleStyle
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['10%', '50%', '100%']}
            onChange={handleSheetChanges}
            overDragResistanceFactor={0}
            enableDynamicSizing={false}
            backgroundStyle={{ backgroundColor: theme.colors.surface }}
        >
            <BottomSheetView style={[Styles.contentContainer]}>
                <View style={Styles.header}>
                    {/* {(!!selectMarker) && <Text>{base.BusStops[selectMarker].name}</Text>} */}
                    {(selectMarker) && <Text theme={theme} variant="titleLarge" ellipsizeMode="tail" numberOfLines={1}>{base.BusStops[selectMarker].name}</Text>}
                    <IconButton
                        mode="contained"
                        icon={'close'}
                        theme={theme}
                        size={16}
                        onPress={onClosePress}
                    />
                </View>
                <TabsView />
            </BottomSheetView>
        </BottomSheet>
    )
}

const Styles = StyleSheet.create({
    
    header: {
        //flex: 1,
        //flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //marginBottom: 0,
        //marginHorizontal: 16,
        //backgroundColor: 'green'
    },

    contentContainer: {
        //flex: 1,
        paddingLeft: 16,
        paddingRight: 8,
        //justifyContent: 'flex-start',
        //backgroundColor: 'red'
    },
})