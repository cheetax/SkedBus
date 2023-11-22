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
    const [request, response, promtAsync] = Google.useAuthRequest({
        androidClientId: '784049700606-2rrj0q80uap40353e6m203mubl2m7vj2.apps.googleusercontent.com'
    })

    useEffect(() => {
     //   GoogleSignin.configure()
    }, [])

    const signIn = async () => {
        setUser({name: 'Дмитрий Гребенев', email: 'dmitriy.grebenev@gmail.com', avatar: 'https://photo-pict.com/wp-content/uploads/2019/05/kartinki-dlya-stima-12.jpg'})
        try {
           // await GoogleSignin.hasPlayServices()
          //  const userInfo = await GoogleSignin.signIn()
           // console.log(userInfo)
        } catch {

        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>Логин форма</Text>
            <Button onPress={() => promtAsync()} >Войти </Button>
        </View>
    )
}

export default FormLogin