import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from "formik";
import { Appbar, Text, useTheme, ActivityIndicator,} from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { InputField } from "./InputField";
import {  useItemContext } from "../providers/ItemContextProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";

type RootStackParamList = {
  Home: undefined;
  FormExpenses: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = DrawerScreenProps<RootStackParamList, 'FormExpenses'>

const FormExpenses = ({ navigation } : Props) => {

  const { settings } = useAppContext();
  const { appliedSettings } = useItemContext();
  const [loaded, setLoaded] = useState<boolean>(false);
  const nameForma = 'Редактирование затрат' 
  //const theme = useTheme()

  useEffect(() => {
    setLoaded(!loaded)
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...settings},
    validateOnChange: false,
    onSubmit: values => {
      appliedSettings(values)
      navigation.goBack();
    }
  });

  const theme = useTheme();
  
  return (
    <View style={{ ...Styles.main, backgroundColor: theme.colors.surface }} >
      <Appbar.Header
      >
        <Appbar.Action
          icon='close'
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={
            <Text
              variant='titleLarge'>{nameForma} </Text>}
        />
        <Appbar.Action icon='check' onPress={() => formik.handleSubmit()} />
      </Appbar.Header>
      {loaded ?
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="height"
          keyboardVerticalOffset={10}
        >
          <ScrollView
            style={Styles.forma}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='handled'
            contentInsetAdjustmentBehavior='always'
          >
            <InputField
              value={String(formik.values.averageFuel)}
              onChangeText={formik.handleChange('averageFuel')}
              
              label='Средний расход' />
            <InputField
              value={String(formik.values.priceFuel)}
              onChangeText={formik.handleChange('priceFuel')}
              label='Стоимость литра' />
          </ScrollView>
        </KeyboardAvoidingView> :
        <ActivityIndicator
          animating={true}
          size={"large"}
          style={Styles.activitiIndicator}
        />}
    </View >
  );
}

export default FormExpenses

const Styles = StyleSheet.create({

  main: {
    flex: 1,
    flexDirection: 'column',

  },
  activitiIndicator: {
    flex: 1,
    marginVertical: 'auto',
  },
  card: {
    marginTop: 12,
    marginHorizontal: 2,
    paddingRight: 16
  },

  forma: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 22
  },
  text: {
    paddingHorizontal: 0,
    paddingRight: 8,
  },
  inputField: {
    marginTop: 12,
  },
  inputFieldContent: {
    height: 56
  },
  stackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  }
})