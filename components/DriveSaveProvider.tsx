import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button, Appbar, Text, useTheme, MD3Theme as Theme, Avatar, Switch } from 'react-native-paper';

import { User, GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from '../providers/Supabase';
import type { Item, WorkingShifts } from "../providers/models/Models";
import { useAppContext } from "../providers/AppContextProvider";
import { useUserContext } from '../providers/UserContexProvider';
import { userInfo } from 'os';
//console.log(supabase)



const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    //console.log(error)
}

const SyncBaseCloud = () => {
    //.log('SupaBase', isSyncOn)
    const { listOfItems } = useAppContext()
    const { userInfo, setUser, deleteUser, isSyncBaseOn, setIsSyncOn, signIn } = useUserContext()
    //console.log(listOfItems)
    const signInBase = async () => {
        await signIn()
        console.log(userInfo.idToken)
        if (userInfo.idToken) {
            try {                
                const { data: session, error } = await supabase.auth.signInWithIdToken({
                    provider: "google",
                    token: userInfo.idToken
                })
                if (!error) setIsSyncOn()
            } catch (error: any) {
                console.log('Ошибка:', error)
    
            }              
            
        } else console.log('Нет токена')
    }
    //isSyncBaseOn ? signIn(userInfo) : signOut()
    //const valueChange = () => signInBase()

    return <View style={Style.stackRow} >
        <Text variant="bodyMedium" >Синхронизация с облаком</Text>
        <Switch value={isSyncBaseOn} onValueChange={signInBase} />
    </View>
}

export const insertBase = async (item: Item) => {
    //console.log(item)
    //const {data, error} = await supabase.auth.getSession()
    //console.log(data, error)
    // const { data, error } = await supabase
    //     .from('workingShifts')
    //     .insert<WorkingShifts>(
    //         {
    //             averageFuel: item.averageFuel,
    //             date: item.date.toString(),
    //             expenses: item.expenses,
    //             key: item.key,
    //             priceFuel: item.priceFuel,
    //             proceeds: item.proceeds,
    //             profit: item.profit,
    //             profitPerOdometer: item.profitPerOdometer,
    //             //userID: 'b4b26c49-79fb-470a-b26e-5ae6cf2088c3'
    //             //id: '',
    //             // created_at: ''
    //         },
    //     )

    const { data, error } = await supabase
        .from('workingShifts')
        .select('*')
    console.log(data, error)
}

const Style = StyleSheet.create({
    stackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
        //flex: 1
    }
})

export default SyncBaseCloud