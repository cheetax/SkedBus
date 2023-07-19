import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { Appbar, FAB, Text, Card, IconButton } from 'react-native-paper';

export default function Chart({ navigation, route }) {


    return (
        <View style={Styles.main}>
            <Appbar.Header
                elevated={true}
                dark={true}
                style={{
                    backgroundColor: '#1976d2',
                    shadowColor: '#D3D3D3',
                    //shadowOffset: {width: 0, height:4}, 
                    //shadowOpacity: 0.2,
                    elevation: 10
                }}
            >
                <Appbar.Action icon='menu' onPress={() => { }} color='white' />
                <Appbar.Content title={<Text style={{ color: 'white' }} variant='titleLarge'>Учет работы таксиста</Text>} color='white' />
            </Appbar.Header>
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
