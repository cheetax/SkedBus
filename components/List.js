import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { AccordionList, AccordionItem } from "react-native-accordion-list-view";
import { Appbar, FAB, Text } from 'react-native-paper';

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
      priceFuel: '46',
      averageFuel: '9.5'
    }
  )
  const item = {
    date: dayjs().format('DD.MM.YY'),
    priceFuel: settings.priceFuel,
    averageFuel: settings.averageFuel,
    proceeds: '3000', //выручка
    odometerStart: '0', //спидометр старт
    odometerFinish: '0', //спидометр финиш
    profit: '2000',
    odometer: '0',     //пробег
    expenses: '0',     //затраты
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
        <Appbar.Content title={<Text style={{ color: 'white' }} variant='titleLarge'>Учет работы таксиста</Text>} color='white' />
      </Appbar.Header>
      <AccordionList
        style={Styles.accordionMain}
        containerItemStyle={Styles.accordion}
        //contentContainerStyle={Styles.accordion}
        data={listOfItems}
        customTitle={item =>
          <View style={Styles.accordionTitle} >
            <Text style={Styles.text} variant='bodyLarge'>{item.date}</Text>
            <View style={Styles.stackRow}>
              <Text style={Styles.text} variant='bodyMedium'>Доход</Text>
              <Text variant='bodyMedium'>{item.profit}</Text>
            </View>
          </View>
        }
        customBody={item =>
          <View style={Styles.accordionDetail}>
            <View style={Styles.itemDetail} >
              <View style={Styles.stackRow}>

                <Text variant='headlineSmall'>Выручка</Text>
                <Text variant='headlineSmall'>{item.proceeds}</Text>
              </View>
            </View>

            <AccordionItem
              containerStyle={Styles.accordionItem}

              customTitle={() =>
                <View style={Styles.accordionItemTitle}>
                  <Text variant='headlineSmall'>Расходы</Text>
                  <Text variant='headlineSmall'>{item.expenses}</Text>
                </View>}
              customBody={() =>
                <View>
                  <View style={Styles.itemDetail}>

                    <View style={Styles.stackRow} >
                      <Text variant='headlineSmall'>Цена топлива</Text>
                      <Text variant='headlineSmall'>{item.priceFuel}</Text>
                    </View>

                    <View style={Styles.stackRow}>
                      <Text variant='headlineSmall'>Средний расход</Text>
                      <Text variant='headlineSmall'>{item.averageFuel}</Text>
                    </View>
                  </View>
                  <AccordionItem
                    containerStyle={Styles.accordionItem}
                    customTitle={() =>
                      <View style={Styles.accordionItemTitle}>
                        <Text variant='headlineSmall'>Пробег</Text>
                        <Text variant='headlineSmall'>{item.odometer}</Text>
                      </View>}
                    customBody={() =>
                      <View style={Styles.itemDetail} >
                        <View style={Styles.stackRow}>
                          <Text variant='headlineSmall'>Спидометр начало</Text>
                          <Text variant='headlineSmall'>{item.odometerStart}</Text>
                        </View>
                        <View style={Styles.stackRow}>
                          <Text variant='headlineSmall'>Спидометр конец</Text>
                          <Text variant='headlineSmall'>{item.odometerFinish}</Text>
                        </View>
                      </View>
                    }
                  />
                </View>
              }
            />
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
    // borderRadius: 48,
    right: 20,
    backgroundColor: '#1976d2',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green'
  },
  item: {
    paddingHorizontal: 0,
    paddingRight: 0,
  },
  text: {
    paddingHorizontal: 0,
    paddingRight: 8,
  },
  itemDetail: {
    paddingRight: 32,
    paddingTop: 16
  },
  accordionTitle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    //alignSelf: 'center',
    //alignItems: 'center',
    marginVertical: 0,
    paddingHorizontal: 0,
    marginBottom: 0,
    padding: 0,
    height: 56,
    margin: 0,
    backgroundColor: 'red'
  },

  accordionItemTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0,
    
  },

  accordion: {
    marginHorizontal: 0,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    //borderBottomWidth: 1,
    
    padding: 0,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 16,
    

    //justifyContent: 'space-between'
  },

  accordionMain: {
    marginHorizontal: 24,
    paddingRight: 0,
  },

  accordionItem: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingTop: 16,
    paddingRight: 0,
    marginBottom: 0,
    borderRadius: 0,
  },

  accordionDetail: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 0,
    marginRight: 0,
    paddingVertical: 0
  },

  stackRow: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    flex: 1
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