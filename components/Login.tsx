//android: '784049700606-2rrj0q80uap40353e6m203mubl2m7vj2.apps.googleusercontent.com'

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from "formik";
import { Appbar, Text, useTheme, ActivityIndicator,} from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { InputField } from "./InputField";
import {  useItemContext } from "../providers/ItemContextProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";

type Props = DrawerScreenProps<RootStackParamList, 'FormLogin'>

const FormLogin = ({ navigation } : Props) => {

    return (
        <View>
            <Text>Логин форма</Text>
        </View>
    )
}

export default FormLogin