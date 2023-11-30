//import React, { useEffect } from 'react'
import { User, GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from './Supabase';
import type { Item, WorkingShifts } from "./models/Models";
import { useAppContext } from "./AppContextProvider";
//console.log(supabase)

const signIn = async (user: User) => {
    //const user = await GoogleSignin.signIn();
    //console.log(user)
    //gDrive.accessToken = (await GoogleSignin.getTokens()).accessToken
    //console.log(await gDrive.files.list());
    //const userInfo = await GoogleSignin.signIn();
    //console.log(user.idToken)
    if (user.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: user.idToken
        })
        //console.log(error, data)
    } else console.log('Нет токена')
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
}

const getFiles = (userInfo: User, isSyncOn?: boolean) => {
    //console.log('SupaBase', userInfo.idToken )
    isSyncOn ? signIn(userInfo) : signOut
}

export const insertBase = async (item: Item) => {

    const { data, error } = await supabase
        .from('workingShifts')
        .insert<WorkingShifts>(
            {
                averageFuel: item.averageFuel,
                date: item.date.toString(),
                expenses: item.expenses,
                key: item.key,
                odometer: '',
                priceFuel: item.priceFuel,
                proceeds: item.proceeds,
                profit: item.profit,
                profitPerOdometer: item.profitPerOdometer

            },
        ).select()

}

export default getFiles




