import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Formik } from "formik";
import { Close, Done } from '@mui/icons-material';
import { TextField, Box, AppBar, Toolbar, IconButton, } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ruRU } from '@mui/x-date-pickers/locales';

export default function Form({ setModalWindow, setListOfItems, item }) {
  //const item = {};
  const value = useState(dayjs(new Date()));
  console.log(item)


  return (
    <Box sx={{ flexGrow: 1 }} >

      <Toolbar sx={{ pb: 2 }} />
      <View>
        
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale='ru'

          localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
        >
          <DatePicker
            value={value}
            label='Дата'
          //format="DD/MM/YYYY"
          // onChange={handleChange('date')}
          />
          
        </LocalizationProvider>


      </View>

    </Box>

  );
}

const styles = StyleSheet.create({
  text: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    padding: 10,
    marginVertical: 30,
    marginHorizontal: '20%',
    width: '60%'
  },
  header: {
    fontSize: 22,
    color: 'white'
  },
});