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

    // const signIn = async () => {
    //     const user = await GoogleSignin.signIn();
    //     console.log(user)
    // }

    useEffect(() => {
       // signIn()
    }, [])

}
//const { userInfo } = useUserContext()
//console.log(userInfo)

//gDrive.accessToken = (await GoogleSignin.getTokens()).accessToken


export default GetFiles




