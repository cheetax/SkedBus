import React from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { Formik, useFormikContext, useField } from "formik";
import { Appbar, IconButton, TextInput, Text } from 'react-native-paper';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const ViewDataField = (props) => {
  const {
    values: {
      expenses,
      proceeds,
      profit,
      odometer,
      priceFuel,
      averageFuel,
      odometerFinish,
      odometerStart 
    },
    setFieldValue
  } = useFormikContext();

  const [field, meta] = useField(props);

  React.useEffect(() => {
    if (proceeds && expenses) {
      setFieldValue('profit', Math.round(proceeds - expenses));
    }
    if (odometerFinish && odometerStart) {
      setFieldValue('odometer', odometerFinish - odometerStart);
    }
    if (odometer && priceFuel && averageFuel) {
      setFieldValue('expenses', Math.round(odometer / 100 * averageFuel * priceFuel));
    }
  }, [
    proceeds,
    expenses,
    profit,
    odometerFinish,
    odometerStart,
    odometer,
    priceFuel,
    averageFuel,
    setFieldValue,
    props.name
  ]);

  return (
    <View style={Styles.main} >
      <View style={Styles.stackRow} >
        <Text {...props} {...field}>Пробег:</Text>
        <Text {...props} {...field}>{odometer}</Text>
      </View>

      <View style={Styles.stackRow} >
        <Text {...props} {...field}>Затраты:</Text>
        <Text {...props} {...field}>{expenses}</Text>
      </View>

      <View style={Styles.stackRow} >
        <Text {...props} {...field}>Доход:</Text>
        <Text {...props} {...field}>{profit}</Text>
      </View>

    </View>

  )
}

const DatePicer = (props) => {
  const {
    values: { date },
    setFieldValue
  } = useFormikContext();
  const onChange = (event, selected) => setFieldValue('date', dayjs(selected).format('DD.MM.YY'))

  const showDatePicer = () => {
    DateTimePickerAndroid.open({
      value: dayjs(date, 'DD.MM.YY').toDate(),
      mode: 'date',
      onChange
    });
  }
  return (
    <TextInput
      {...props}
      value={props.date}
      label='Дата'
      mode="outlined"
      editable={true}
      onFocus={() => showDatePicer()} />
  )
}
export default function Form({ route, navigation }) {
  const item = JSON.parse(route.params.item);
  //console.log(item)
  return (
    <View style={Styles.main} >
      <Formik
        initialValues={{ ...item }}
        onSubmit={(values) => {
          //console.log(values)
          values.date = dayjs(values.date, 'DD.MM.YY').format('DD.MM.YY');
          navigation.navigate({
            name: 'Main',
            params: { post: JSON.stringify(values) },
            merge: true,
          });
        }}
        onChange={(values) => { console.log(values) }}
      >
        {({ values, handleSubmit, handleChange, handleBlur, setFieldValue }) => (
          <View style={Styles.main} >

            <Appbar.Header
              elevated={true}
              dark={true}
              style={{
                backgroundColor: '#1976d2',
                height: 56
              }}
            >
              <Appbar.Action
                //style={{marginHorizontal: 16}}
                icon='close'
                onPress={() => navigation.goBack()}
                color='white' />
              <Appbar.Content
                title={
                  <Text
                    style={{
                      color: 'white',
                      //alignSelf: 'center'
                    }}
                    variant='titleLarge'>Новая смена</Text>}
              />
              <Appbar.Action icon='check' onPress={handleSubmit} color='white' />
            </Appbar.Header>
            <ScrollView style={Styles.forma} >
              <DatePicer date={values.date} style={Styles.inputField} />
              <TextInput
                style={Styles.inputField}
                value={values.priceFuel}
                //type="number"
                onChangeText={handleChange('priceFuel')}
                label='Стоимость топлива'
                mode="outlined" />
              <TextInput
                style={Styles.inputField}
                value={values.averageFuel}
                //type="number"
                onChangeText={handleChange('averageFuel')}
                label='Средний расход'
                mode="outlined" />
              <TextInput
                style={Styles.inputField}
                value={values.proceeds}
                //type="number"
                onChangeText={handleChange('proceeds')}
                label='Выручка'
                mode="outlined" />
              <TextInput
                style={Styles.inputField}
                value={values.odometerStart}
                //type="number"
                minRows={0}
                onChangeText={handleChange('odometerStart')}
                label='Спидометр на начало'
                mode="outlined" />
              <TextInput
                style={Styles.inputField}
                value={values.odometerFinish}
                //type="number"
                //minRows={0}
                onChangeText={handleChange('odometerFinish')}
                label='Спидометр на конец'
                mode="outlined" />

              <ViewDataField name='viewData' variant='headlineMedium' />

            </ScrollView>
          </View>)
        }
      </Formik >


    </View >

  );
}

const Styles = StyleSheet.create({

  main: {
    flex: 1,
    flexDirection: 'column',
  },
  forma: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 24
  },
  text: {
    paddingHorizontal: 0,
    paddingRight: 8,
  },
  inputField: {
    marginTop: 12,
    height: 56
  },
  stackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  }
})