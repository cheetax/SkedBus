//android: '784049700606-2rrj0q80uap40353e6m203mubl2m7vj2.apps.googleusercontent.com'

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from "formik";
import { Appbar, Text, useTheme, ActivityIndicator, Button } from 'react-native-paper';
import { InputField } from "./InputField";
import { useUserContext } from "../providers/UserContexProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"

//import { GoogleSignin, } from "@react-native-google-signin/google-signin";

type Props = DrawerScreenProps<RootStackParamList, 'FormLogin'>

WebBrowser.maybeCompleteAuthSession();


const FormLogin = ({ navigation }: Props) => {

    const { user, setUser } = useUserContext()
    const [userInfo, setUserInfo] = useState(null)
    const [request, response, promtAsync] = Google.useAuthRequest({
        webClientId: "972891890305-2jf1bn92gqhg84nqq517otlscsrj29mu.apps.googleusercontent.com",
        androidClientId: "972891890305-652plr3j3rnb4r8bl7eiu8pfaup5j4s3.apps.googleusercontent.com"
    })

    useEffect(() => {
        handleSingInWithGoogle()
    }, [response])

    const handleSingInWithGoogle = async () => {
        if (!userInfo) {
            if (response?.type === 'success') {
                await getUserInfo(response.authentication?.accessToken)
            }
        } else {

        }
    }

    const getUserInfo = async (token: string | undefined) => {
        setUser({ name: 'Дмитрий Гребенев', email: 'dmitriy.grebenev@gmail.com', avatar: 'https://photo-pict.com/wp-content/uploads/2019/05/kartinki-dlya-stima-12.jpg' })
        if (!token) return
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: 'Bearer ' + token }
                })

            const user = await response.json()
            setUserInfo(user)
            // await GoogleSignin.hasPlayServices()
            //  const userInfo = await GoogleSignin.signIn()
            // console.log(userInfo)
        } catch (error) {

        }
    }
    console.log(userInfo)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            {/* <Text>{userInfo}</Text> */}
            <Button onPress={() => promtAsync()} >Войти </Button>
        </View>
    )
}

export default FormLogin