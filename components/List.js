import React, { useState, useEffect, StyleSheet } from "react";
import { FlatList } from 'react-native';
import { Accordion, AccordionSummary, AccordionDetails, Stack, IconButton, Box, Typography } from "@mui/material";
import { AppBar, Toolbar, Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Edit, Delete } from '@mui/icons-material';
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';

const keyGenerator = () => (Math.random() * 10000000000000000).toString();
var red = 0;

export default function Main({ navigation, route }) {

  useEffect(() => {
    if (listOfItems.length !== 0) {
      setData({ listOfItems, settings });
    }
  }, [red, listOfItems]);

  useEffect(() => {
    if (route.params?.post) {
      const post = JSON.parse(route.params.post);
      (async () => await setListOfItems(list => [
        post,
        ...list.filter(list => list.key != post.key)
      ]
      ))();
      setSettings(setting => setting = {
        priceFuel: post.priceFuel,
        averageFuel: post.averageFuel
      });

      red = red + 1;
    }
  }, [route.params?.post])

  useEffect(() => {
    showData();
  }, []);

  const [settings, setSettings] = useState(
    {
      priceFuel: 46,
      averageFuel: 9.5
    }
  )
  const item = {
    date: dayjs().format('DD.MM.YY'),
    priceFuel: settings.priceFuel,
    averageFuel: settings.averageFuel,
    proceeds: 0, //выручка
    odometerStart: 0, //спидометр старт
    odometerFinish: 0, //спидометр финиш
    profit: 0,
    odometer: 0,     //пробег
    expenses: 0,     //затраты
    key: keyGenerator()
  };

  const setData = (data) => {
    AsyncStorage.setItem('dataCalcCost', JSON.stringify(data));
    //console.log(data);
  }

  const showData = async () => {
    var data = await AsyncStorage.getItem('dataCalcCost');
    if (data) {
      data = JSON.parse(data)
      setListOfItems(data.listOfItems);
      setSettings(data.settings);
    }
  }

  const [listOfItems, setListOfItems] = useState([]);

  return (
    <Box>
      <Fab
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
        color="primary"
        aria-label="add"
        onClick={() => {
          navigation.navigate('Form', { item: JSON.stringify(item) })
        }}>
        <AddIcon />
      </Fab>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >Учет работы таксиста</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <FlatList data={listOfItems} renderItem={({ item }) =>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id='panel1a-header'
          >
            <Stack direction='row' spacing={2} sx={{ ml: 1 }}>
              <Typography variant='subtitle1'>{item.date}</Typography>
              <Stack direction='row' spacing={1}>
                <Typography variant='subtitle1'>Выручка</Typography>
                <Typography variant='subtitle1'>{item.proceeds}</Typography>
              </Stack>

              <Stack direction='row' spacing={1}>
                <Typography variant='subtitle1'>Доход</Typography>
                <Typography variant='subtitle1'>{item.profit}</Typography>
              </Stack>

            </Stack>

          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              <Stack direction='row' spacing={2}>
                <Stack direction='row' spacing={1}>
                  <Typography variant='subtitle1'>Цена топлива</Typography>
                  <Typography variant='subtitle1'>{item.priceFuel}</Typography>
                </Stack>

                <Stack direction='row' spacing={1}>
                  <Typography variant='subtitle1'>Средний расход</Typography>
                  <Typography variant='subtitle1'>{item.averageFuel}</Typography>
                </Stack>

              </Stack>
              <Stack direction='row' spacing={1}>
                <Typography variant='subtitle1'>Пробег</Typography>
                <Typography variant='subtitle1'>{item.odometer}</Typography>
              </Stack>

              <Stack direction='row' spacing={1}>
                <Typography variant='subtitle1'>Расходы</Typography>
                <Typography variant='subtitle1'>{item.expenses}</Typography>
              </Stack>


              <Stack direction='row-reverse' spacing={2}>
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => {
                    red = red + 1;
                    setListOfItems((list) => [
                      ...list.filter(listOfItems => listOfItems.key != item.key)
                    ])
                  }}
                  sx={{ mr: 1 }}>
                  <Delete />
                </IconButton>
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 1 }}
                  onClick={() => {
                    navigation.navigate('Form', { item: JSON.stringify(item) })
                  }}>
                  <Edit />
                </IconButton>

              </Stack>
            </Stack>

          </AccordionDetails>
        </Accordion>
      } />
    </Box>
  );
}

//const Styles = StyleSheet.create({
  //   main: {
  //     //flex: 1,
  //     paddingTop: 0,
  //     //height: 100,
  //     //backgroundColor: 'silver',
  //   },
  //   detail: {
  //     fontSize: 18,
  //     textAlign: 'left',
  //     //marginLeft: 10,
  //     paddingVertical: 5
  //   },
  //   header: {
  //     fontSize: 21,
  //     color: 'white'
  //     //textAlign: 'center',
  //     //paddingVertical: 20
  //   },
  //   profit: {
  //     fontSize: 18,
  //     //textAlign: 'left',
  //     //paddingVertical: 15,
  //     //backgroundColor: '#98FB98',
  //     //paddingHorizontal: 10,
  //   },
  //   summary: {
  //     fontSize: 18,
  //     fontStyle: '400',
  //     textAlign: 'left',
  //   },
  // iconAdd: {
  //   position: 'fixed',
  //   bottom: 16,
  //   right: 16,
    //textAlign: 'center',
    //marginVertical: 15
//  }
//})