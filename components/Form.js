import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from "formik";
import {
  Appbar,
  TextInput,
  Text,
  useTheme,
  ActivityIndicator,
  Card,
  Chip,
} from 'react-native-paper';
import { DatePickerInput, registerTranslation } from 'react-native-paper-dates';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppContext } from "../providers/AppContextProvider";

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

const ViewDataField = props => {
  const {
    values: {
      expenses,
      proceeds,
      profit,
      profitPerOdometer,
      odometer,
      priceFuel,
      averageFuel,
      key
    },
    setFieldValue
  } = props;

  React.useEffect(() => {
    if (proceeds && expenses) {
      setFieldValue('profit', Math.round(proceeds - expenses));
    }
  }, [
    proceeds,
    expenses,
    profit,
    profitPerOdometer,
    odometer,
    props.name,
  ]);
  console.log(props.values)
  return (
    <View style={Styles.main} >
      <View style={Styles.stackRow} >
        <Card
          style={{
            ...Styles.card,
            // backgroundColor: theme.colors.surfaceVariant
          }}
        >
          <Card.Title
            title={<Text style={Styles.text} variant='titleMedium'>Затраты</Text>}
          />
          <Card.Content>
            <Text style={Styles.text} variant='bodyMedium'>{expenses}</Text>
          </Card.Content>
        </Card>

        <Card
          style={{
            ...Styles.card,
            // backgroundColor: theme.colors.surfaceVariant
          }}
        >
          <Card.Title
            title={<Text style={Styles.text} variant='titleMedium'>Доход</Text>}
          />
          <Card.Content>
            <View>
              <Text style={Styles.text} variant='bodyMedium'>{profit}</Text>
              <Text style={Styles.text} variant='bodyMedium'>На пробег: {profitPerOdometer}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const InputField = (props) => <TextInput
  keyboardType="numeric"
  style={{ marginTop: 12, marginHorizontal: 2 }}
  contentStyle={{ height: 56 }}
  outlineStyle={{ backgroundColor: 'none' }}
  mode="outlined"
  {...props}
/>

const OdometerView = props => {
  const {
    values,
    navigation,
    theme
  } = props
  // console.log(props)

  return <Card
    style={{
      ...Styles.card,
      // backgroundColor: theme.colors.surfaceVariant
    }}
    onPress={() => navigation.navigate({
      name: 'ListOdometer',
      params: { key: values.key }
    })}
  >
    <Card.Title
      title={<Text style={Styles.text} variant='titleMedium'>Пробег</Text>}
      subtitle={<Text style={Styles.text} variant='bodyMedium'>Общий пробег: {values.odometer.resultOdometer}</Text>}
      right={() => <MaterialCommunityIcons name={'chevron-right'} color={theme.colors.onSurface} size={26} />}

    />

  </Card >
}

export default function Form({ route, navigation }) {

  const { item, getItem, appliedListOfItems } = useAppContext();
  const [loaded, setLoaded] = useState(false);
  const nameForma = route.params.key !== '' ? 'Редактирование смены' : 'Новая смена'
  //const theme = useTheme()

  useEffect(() => {
    getItem(route.params.key)
    setLoaded(!loaded)
    // console.log(route.params.key, item  )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...item },
    validateOnChange: false,
    onSubmit: values => {
      appliedListOfItems(values)
      navigation.navigate({
        name: 'List',
      });
    }
  });

  // console.log(item)
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
        <Appbar.Action icon='check' onPress={formik.handleSubmit} />
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
                name: 'FormExpenses'
              })}
            >Расходы на километр пробега: {formik.values.priceFuel * formik.values.averageFuel / 100}</Chip>
            <DatePickerInput
              style={{
                height: 56,
                marginTop: 12,
                // backgroundColor: theme.colors.surface
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
              presentationStyle="formSheet"
            />
            <InputField
              value={formik.values.proceeds}
              onChangeText={formik.handleChange('proceeds')}
              label='Выручка' />
            <OdometerView values={formik.values} navigation={navigation} theme={theme} />

            <ViewDataField values={formik.values} setFieldValue={formik.setFieldValue} name='viewData' variant='headlineMedium' />

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