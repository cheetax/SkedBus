//import React, { useEffect } from 'react'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
    GDrive,
    MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
//import { useUserContext } from "./UserContexProvider";
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabase = createClient("https://xyzcompany.supabase.co", "public-anon-key", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const gDrive = new GDrive()
GoogleSignin.configure();

const signIn = async () => {
    const user = await GoogleSignin.signIn();
    //console.log(user)
    gDrive.accessToken = (await GoogleSignin.getTokens()).accessToken
    console.log(await gDrive.files.list());
}

const GetFiles = () => {
    console.log('Files')
    //onst { userInfo } = useUserContext()

    //console.log(userInfo)

    //useEffect(() => {
    signIn()
   // }, [])



}

//


export default GetFiles




