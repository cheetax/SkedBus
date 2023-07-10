import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from 'react-native';
//import { Stack, Flex } from "native-base";
import { AccordionList } from "react-native-accordion-list-view";
import { Appbar, List, FAB, IconButton, MD3Elevation, Text } from 'react-native-paper';

import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';

const keyGenerator = () => (Math.random() * 10000000000000000).toString();
var red = 0;

export default function Main({ navigation, route }) {
a
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
    proceeds: 3000, //выручка
    odometerStart: 0, //спидометр старт
    odometerFinish: 0, //спидометр финиш
    profit: 2000,
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

  const [listOfItems, setListOfItems] = useState([{ ...item }]);


  return (
    <View style={Styles.main} >
      <FAB
        style={Styles.fab}
        color="white"
        icon="plus"
        size="medium"
        onPress={() => {
          console.log(1)
          navigation.navigate('Form', { item: JSON.stringify(item) })
        }}>
      </FAB>
      <Appbar.Header
        elevated={true}
        dark={true}
        style={{
          backgroundColor: '#1976d2',

        }}
      >
        <Appbar.Action icon='menu' onPress={() => { }} color='white' />
        <Appbar.Content title='Учет работы таксиста' color='white' />
      </Appbar.Header>
      <AccordionList
        data={listOfItems}
        customTitle={item =>
          <View style={Styles.stackRow} >           

              <Text style={Styles.item} variant='headlineMedium'>{item.date}</Text>
              <Text style={Styles.item} variant='headlineMedium'>Доход</Text>
              <Text style={Styles.item} variant='headlineMedium'>{item.profit}</Text>
           
          </View>}
        customBody={item =>
          <View style={Styles.accordionDetail}>
            <View style={Styles.accordionDetail} >
              <View style={Styles.stackRow}>
                <Text style={Styles.item} variant='headlineSmall'>Выручка</Text>
                <Text style={Styles.item} variant='headlineSmall'>{item.proceeds}</Text>
              </View>
              <View style={Styles.stackRow} >
                <Text variant='headlineSmall'>Цена топлива</Text>
                <Text variant='headlineSmall'>{item.priceFuel}</Text>
              </View>

              <View style={Styles.stackRow}>
                <Text variant='headlineSmall'>Средний расход</Text>
                <Text variant='headlineSmall'>{item.averageFuel}</Text>
              </View>
            </View>

            <View style={Styles.stackRow}>
              <Text variant='headlineSmall'>Пробег</Text>
              <Text variant='headlineSmall'>{item.odometer}</Text>
            </View>

            <View style={Styles.stackRow}>
              <Text variant='headlineSmall'>Расходы</Text>
              <Text variant='headlineSmall'>{item.expenses}</Text>
            </View>
          </View>
        }
      />
    </View >
  );
}

const Styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 1000,
    alignSelf: 'flex-end',
    bottom: 20,
    borderRadius: 48,
    right: 20,
    backgroundColor: '#1976d2',
  },
  main: {
    flex: 1,
    flexDirection: 'column'
  },
  item: {
    //flex: 1,
    alignContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    paddingLeft: 8,
  },
  accordionTitle: {
    //flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },

  accordionDetail: {
    //flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },

  stackRow: {
    flexDirection: 'row',
    //display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    //alignContent: 'space-between',
    //flex: 1
  }
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
})