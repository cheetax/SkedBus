import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';

export default function Chart({ navigation, route }) {


    return (
        <View style={Styles.main}>
            <Text>Статистика</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        zIndex: 1000,
        alignSelf: 'flex-end',
        bottom: 20,
        // borderRadius: 48,
        right: 20,
        backgroundColor: '#1976d2',
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
    }
})
