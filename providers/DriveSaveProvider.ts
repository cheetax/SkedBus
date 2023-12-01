//import React, { useEffect } from 'react'
import { User, GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from './Supabase';
import type { Item, WorkingShifts } from "./models/Models";
import { useAppContext } from "./AppContextProvider";
//console.log(supabase)

const signIn = async (user: User) => {
    if (user.idToken) {
        const { data: session, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: user.idToken
        })
        console.log(error, session)
    } else console.log('Нет токена')
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    //console.log(error)
}

const getFiles = (userInfo: User, isSyncOn?: boolean) => {
    //.log('SupaBase', isSyncOn)
    isSyncOn ? signIn(userInfo) : signOut()
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

export default getFiles