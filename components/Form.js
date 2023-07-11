import React from "react";
import { View, StyleSheet } from 'react-native';
import { Formik, useFormikContext, useField  } from "formik";
//import { Close, Done } from '@mui/icons-material';
//import { TextField, Box, AppBar, Toolbar, IconButton, Stack, Typography, } from "@mui/material";
import { Appbar, IconButton, TextInput, Text } from 'react-native-paper';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
//import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
//import { ruRU } from '@mui/x-date-pickers/locales';

const ViewDataField = (props) => {
  const {
    values: { expenses, proceeds, profit, odometer, priceFuel, averageFuel, odometerFinish, odometerStart },
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
    <View >
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

export default function Form({ route, navigation }) {
  const item = JSON.parse(route.params.item);
  console.log(item)
  return (
    <View >
      <Formik
        initialValues={{ ...item }}
        onSubmit={(values) => {
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
          <View >
            <Appbar.Header
              elevated={true}
              dark={true}
              style={{
                backgroundColor: '#1976d2',
              }}
            >
              <Appbar.Action icon='menu' onPress={() => { navigation.goBack() }} color='white' />
              <Appbar.Content title={<Text style={{ color: 'white' }} variant='headlineMedium'>Новая смена</Text>} color='white' />
              <Appbar.Action icon='menu' onPress={handleSubmit} color='white' />
            </Appbar.Header>
            <View  >

              {/* <DateTimePickerAndroid
                value={dayjs(values.date, 'DD.MM.YY')}
                mode={'date'}
                onChange={(event, value) => setFieldValue('date', value)}
              /> */}
              <TextInput
                value={values.priceFuel}
                //type="number"
                onChangeText={handleChange('priceFuel')}
                label='Стоимость топлива'
                mode="outlined" />
              <TextInput
                value={values.averageFuel}
                //type="number"
                onChangeText={handleChange('averageFuel')}
                label='Средний расход'
                mode="outlined" />
              <TextInput
                value={values.proceeds}
                //type="number"
                onChangeText={handleChange('proceeds')}
                label='Выручка'
                mode="outlined" />
              <TextInput
                value={values.odometerStart}
                //type="number"
                minRows={0}
                onChangeText={handleChange('odometerStart')}
                label='Спидометр на начало'
                mode="outlined" />
              <TextInput
                value={values.odometerFinish}
                //type="number"
                //minRows={0}
                onChangeText={handleChange('odometerFinish')}
                label='Спидометр на конец'
                mode="outlined" />
              <ViewDataField name='viewData' variant='headlineMedium' />

            </View>
          </View>
        )
        }
      </Formik >

    </View >

  );
}

const Styles = StyleSheet.create({

  main: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    paddingHorizontal: 0,
    paddingRight: 8,
  },

  stackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  }
})