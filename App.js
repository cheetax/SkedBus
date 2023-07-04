import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from 'react-native';
//import Main from './Navigate';
import { AppBar, Box, Toolbar, IconButton, Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import Main from './components/Main';
import Form from './components/Form';
import { Style } from "@mui/icons-material";



export default function App() {
  const [settings, setSettings] = useState(
    {
      priceFuel: 46,
      averageFuel: 9.5
    }
  )
  const [modalWindow, setModalWindow] = useState(false);

  //const settings = settings;
  const [listOfItems, setListOfItems] = useState([
    {
      date: '15.06.23',
      proceeds: 150, //выручка
      profit: 100,    //доход
      odometerStart: 102, //спидометр старт
      odometerFinish: 150, //спидометр финиш
      odometer: 48,     //пробег
      expenses: 50,     //затраты
      key: '1'
    },
    { date: '16.06.23', proceeds: 500, profit: 400, odometerStart: 170, odometerFinish: 200, odometer: 48, key: '2' },
    { date: '17.06.23', proceeds: 300, profit: 200, odometerStart: 210, odometerFinish: 260, odometer: 48, key: '3' },
    { date: '18.06.23', proceeds: 400, profit: 300, odometerStart: 300, odometerFinish: 344, odometer: 48, key: '4' }
  ]);
  return (
    <Box >
      <Fab style={styles.iconAdd} color="primary" aria-label="add" onClick={() => setModalWindow(true)}>
        <AddIcon />
      </Fab>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Text style={styles.header} >Учет работы таксиста</Text>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Main param={{ settings, listOfItems }} />
      <Modal visible={modalWindow} >
        <Form setModalWindow={setModalWindow} setListOfItems={setListOfItems} item={{
          date: '26.06.2023',
          priceFuel: settings.priceFuel,
          averageFuel: settings.averageFuel,
          proceeds: 0,
          profit: 0,
          odometerStart: 0,
          odometerFinish: 0,
          odometer: 0,
          expenses: 0
        }} />
      </Modal>

    </Box>

  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    //height: 100,
    //backgroundColor: 'silver',
  },
  header: {
    fontSize: 22,
    color: 'white'
  },
  item: {
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: '1%',
    width: '98%'
  },
  iconAdd: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    //textAlign: 'center',
    //marginVertical: 15
  }
});