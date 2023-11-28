//import React, { useEffect } from 'react'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
    GDrive,
    MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
//import { useUserContext } from "./UserContexProvider";

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




