import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from "formik";
import { Appbar, Text, useTheme, ActivityIndicator, } from 'react-native-paper';
import { useItemContext } from "../providers/ItemContextProvider";
import { InputField } from "./InputField";
import { ZeroToString } from "../helpers";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";

type Props = DrawerScreenProps<RootStackParamList, 'FormOdometer'>

export default function FormOdometer({ route, navigation }: Props) {

  const { itemOdometer, getItemOdometer, appliedOdometer } = useItemContext();
  const [loaded, setLoaded] = useState(false);
  const key = route.params.key;
  const nameForma = key !== '' ? 'Редактирование пробега' : 'Новый пробег'

  useEffect(() => {
    setLoaded(false)
    //console.log('use effect', key)
    getItemOdometer(key)
    setLoaded(true)
  }, [route])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...itemOdometer },
    validateOnChange: false,
    onSubmit: values => {
      appliedOdometer(values)
      goBack();
    }
  });

  const goBack = () => {
    setLoaded(false)
    navigation.navigate('ListOdometer', {});
  }

  //console.log('Обновление формы', key)
  const theme = useTheme();
  return (
    <View style={{ ...Styles.main, backgroundColor: theme.colors.surface }} >
      <Appbar.Header
      >
        <Appbar.Action
          icon='close'
          onPress={() => goBack()}
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
              value={ZeroToString(formik.values.odometerStart)}
              onChangeText={formik.handleChange('odometerStart')}

              label='Спидометр на начало' />
            <InputField
              value={ZeroToString(formik.values.odometerFinish)}
              onChangeText={formik.handleChange('odometerFinish')}
              label='Спидометр на конец' />
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