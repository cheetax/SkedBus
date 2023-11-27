import React, { useEffect } from 'react'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
    GDrive,
    MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
import { useUserContext } from "./UserContexProvider";

const gDrive = new GDrive()
GoogleSignin.configure();

const GetFiles = () => {

    const { userInfo } = useUserContext()
    console.log(userInfo)


     const signIn = async () => {
        const user = await GoogleSignin.signIn();
         console.log(user)
    gDrive.accessToken = (await GoogleSignin.getTokens()).accessToken
     }

    useEffect(() => {
        signIn()
    }, [])

    

}

//


export default GetFiles




