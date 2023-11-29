//import React, { useEffect } from 'react'
import { User, GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from './Supabase';

//console.log(supabase)

const signIn = async (user: User) => {
    //const user = await GoogleSignin.signIn();
    //console.log(user)
    //gDrive.accessToken = (await GoogleSignin.getTokens()).accessToken
    //console.log(await gDrive.files.list());
    //const userInfo = await GoogleSignin.signIn();
    //console.log(userInfo.idToken, "++", user.idToken)
    if (user.idToken) {
        const {data, error} = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: user.idToken
    })
    console.log(error, data)
} else console.log('Нет токена')
}

const GetFiles = (userInfo: User) => {
    //console.log('SupaBase', userInfo.idToken )
    signIn(userInfo)
}

//


export default GetFiles




