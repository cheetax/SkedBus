import React, { useCallback, useEffect, useRef } from "react";
import { View, StyleSheet} from 'react-native';;
import { Text, IconButton, useTheme} from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import TabsView from "./TabView";

export default function ViewBottomSheet() {
    const {
        base,
        selectMarker,
        onSelectMarker
    } = useAppContext();

    useEffect(() => {
        if (selectMarker != undefined) bottomSheetRef.current?.snapToIndex(1); else bottomSheetRef.current?.close();
    }, [selectMarker])

    const bottomSheetRef = useRef<BottomSheet>(null);

    const onClosePress = () => onSelectMarker(selectMarker)

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const theme = useTheme();
    //console.log((selectMarker), base.BusStops[selectMarker]?.name)
    return (
        <BottomSheet
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
                    {(selectMarker != undefined) && <Text theme={theme} variant="titleLarge" ellipsizeMode="tail" numberOfLines={1}>{base.BusStops[selectMarker]?.name}</Text>}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 8
    },

    contentContainer: {
    },
})