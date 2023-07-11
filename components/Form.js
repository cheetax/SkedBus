import React from "react";
import { View, StyleSheet } from 'react-native';
import { Formik, useField, useFormikContext } from "formik";
//import { Close, Done } from '@mui/icons-material';
//import { TextField, Box, AppBar, Toolbar, IconButton, Stack, Typography, } from "@mui/material";
import { Appbar, TextInput } from 'react-native-paper';
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
    <Stack sx={{ p: 1 }} spacing={2}>
      <Stack direction='row' spacing={1}>
        <Typography {...props} {...field}>Пробег:</Typography>
        <Typography {...props} {...field}>{odometer}</Typography>
      </Stack>

      <Stack direction='row' spacing={1}>
        <Typography {...props} {...field}>Затраты:</Typography>
        <Typography {...props} {...field}>{expenses}</Typography>
      </Stack>

      <Stack direction='row' spacing={1}>
        <Typography {...props} {...field}>Доход:</Typography>
        <Typography {...props} {...field}>{profit}</Typography>
      </Stack>

    </Stack>

  )
}

export default function Form({ route, navigation }) {
  const item = JSON.parse(route.params.item);
  return (
    <Box bgcolor={'white'} sx={{ flexGrow: 1 }} >

      <Toolbar sx={{ pb: 1 }} />
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
          <Box >
            <AppBar position='fixed'>
              <Toolbar sx={{ justifyContent: 'space-between' }} >
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => { navigation.goBack() }} >
                  <Close />
                </IconButton>
                <Typography variant="h6" >Новая смена</Typography>
                <IconButton
                  edge='end'
                  color='inherit'
                  aria-label='done'
                  onClick={
                    handleSubmit
                  } >
                  <Done />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Stack sx={{ p: 1 }} spacing={2} >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='ru'
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
              >
                <DatePicker
                  value={dayjs(values.date, 'DD.MM.YY')}
                  label='Дата'
                  onChange={(value) => setFieldValue('date', value)}
                />
                <TextField
                  value={values.priceFuel}
                  type="number"
                  onChange={handleChange('priceFuel')}
                  label='Стоимость топлива'
                  variant="outlined" />
                <TextField
                  value={values.averageFuel}
                  type="number"
                  onChange={handleChange('averageFuel')}
                  label='Средний расход'
                  variant="outlined" />
                <TextField
                  value={values.proceeds}
                  type="number"
                  onChange={handleChange('proceeds')}
                  label='Выручка'
                  variant="outlined" />
                <TextField
                  value={values.odometerStart}
                  type="number"
                  minRows={0}
                  onChange={handleChange('odometerStart')}
                  label='Спидометр на начало'
                  variant="outlined" />
                <TextField
                  value={values.odometerFinish}
                  type="number"
                  minRows={0}
                  onChange={handleChange('odometerFinish')}
                  label='Спидометр на конец'
                  variant="outlined" />
                <ViewDataField name='viewData' variant='h6' />
              </LocalizationProvider>
            </Stack>
          </Box>
        )}
      </Formik>

    </Box>

  );
}