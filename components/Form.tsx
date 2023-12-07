import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from "formik";
import {
  Appbar,
  Text,
  useTheme,
  ActivityIndicator,
  Card,
  Chip,
  Divider
} from 'react-native-paper';
import { InputField } from "./InputField";
import { DatePickerInput, registerTranslation } from 'react-native-paper-dates';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppContext } from "../providers/AppContextProvider";
import { useItemContext } from "../providers/ItemContextProvider";
import { round, ZeroToString } from "../helpers";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";
import type { Item } from "../providers/models/Models";
import { insertBase } from "./DriveSaveProvider";


registerTranslation('ru', {
  save: 'Записать',
  selectSingle: 'Выбрать дату',
  selectMultiple: 'Выбрать даты',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) =>
    `Формат даты должен быть ${inputFormat}`,
  mustBeHigherThan: (date) => `Должно быть позже чем ${date}`,
  mustBeLowerThan: (date) => `Должно быть раньше чем ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Должно быть между ${startDate} - ${endDate}`,
  dateIsDisabled: 'День не разрешен',
  previous: 'Предыдущий',
  next: 'Слудующий',
  typeInDate: 'Тип даты',
  pickDateFromCalendar: 'Выберите дату из календаря',
  close: 'Закрыть'
})

type Props = DrawerScreenProps<RootStackParamList, 'Form'>

interface ViewDataProps {
  values: Item
}

interface OdometerViewProps extends Props {
  values: Item,
  color: string
}
const ViewDataField = (props: ViewDataProps) => {
  const {
    values: {
      expenses,
      profit,
      profitPerOdometer,
    },
  } = props;
  return (
    <View style={Styles.main} >
      <View style={Styles.stackRow} >
        <Card
          style={{
            ...Styles.card,
          }}
        >
          <Card.Title
            title={<Text style={Styles.text} variant='titleMedium'>Доход и затраты</Text>}
          />
          <Card.Content>
            <View style={Styles.stackRow} >
              <Text style={Styles.text} variant='bodyMedium'>Затраты:</Text>
              <Text style={Styles.text} variant='bodyMedium'>{ZeroToString(expenses)}</Text>
            </View>
            <Divider style={Styles.dividerCard} />
            <View style={Styles.stackRow} >
              <Text style={Styles.text} variant='bodyMedium'>Доход:</Text>
              <Text style={Styles.text} variant='bodyMedium'>{ZeroToString(profit)}</Text>
            </View>

            <Divider style={Styles.dividerCard} />
            <View style={Styles.stackRow} >
              <Text style={Styles.text} variant='bodyMedium'>Доход на пробег:</Text>
              <Text style={Styles.text} variant='bodyMedium'>{profitPerOdometer}</Text>
            </View>

          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const OdometerView = (props: OdometerViewProps) => {
  const {
    values,
    navigation,
    color
  } = props
  // console.log(props)

  return <Card
    style={{
      ...Styles.card,
    }}
    onPress={() => navigation.navigate('ListOdometer', {
      params: { key: values.key  }
    })}
  >
    <Card.Title
      title={<Text style={Styles.text} variant='titleMedium'>Пробег</Text>}
      subtitle={<Text style={Styles.text} variant='bodyMedium'>Общий пробег: {values.odometer.resultOdometer}</Text>}
      right={() => <MaterialCommunityIcons style={{ marginRight: 8 }} name={'chevron-right'} color={color} size={26} />}

    />

  </Card >
}

//const nanToString = (t) => t === NaN ? '' : t

export default function Form({ route, navigation }: Props) {

  const { item, getItem, appliedItem } = useItemContext();
  const { appliedListOfItems } = useAppContext();
  const [loaded, setLoaded] = useState(false);
  const key = route.params.key;
  const nameForma = key !== '' ? 'Редактирование смены' : 'Новая смена'
  //const theme = useTheme()
  
  useEffect(() => {
    setLoaded(false)
    getItem(key)
    setLoaded(true)
  }, [route])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...item },
    validateOnChange: false,
    onSubmit: values => {
      appliedListOfItems(values)
      insertBase(values)
      navigation.navigate({
        name: 'List', key: '',
      });
      setLoaded(false)
    }
  });

  useEffect(() => {
    if (loaded) appliedItem(formik.values)
  }, [formik.values])

  const theme = useTheme();

  return (
    <View style={{ ...Styles.main, backgroundColor: theme.colors.surface }} >
      <Appbar.Header
      >
        <Appbar.Action
          icon='close'
          onPress={() => {
            getItem('')
            setLoaded(false)
            navigation.goBack()            
          }}
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
            <Chip
              mode="outlined"
              closeIcon="pencil-outline"
              onClose={() => navigation.navigate({
                name: 'FormExpenses', key: ''
              })}
            >Расходы на километр пробега: {round(formik.values.priceFuel * formik.values.averageFuel / 100)}</Chip>
            <DatePickerInput
              style={{
                height: 56,
                marginTop: 8
              }}
              outlineStyle={{ backgroundColor: 'none' }}
              locale='ru'
              withDateFormatInLabel={false}
              label="Дата"
              value={formik.values.date}
              onChange={d => {
                formik.setFieldValue('date', d)
              }}
              inputMode="start"
              mode="outlined"
            />
            <InputField
              value={ZeroToString(formik.values.proceeds)}
              onChangeText={formik.handleChange('proceeds')}
              label='Выручка' />
            <OdometerView values={formik.values} navigation={navigation} route={route} color={theme.colors.onSurface} />

            <ViewDataField values={formik.values} />

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
    marginTop: 8,
    marginHorizontal: 2,
    marginBottom: 2,
    flex: 1
  },
  dividerCard: {
    marginBottom: 8,
    marginTop: 8
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
    marginTop: 8,
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