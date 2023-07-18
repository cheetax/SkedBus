import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { AccordionList } from "react-native-accordion-list-view";
import { Appbar, FAB, Text, Card, IconButton } from 'react-native-paper';

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
    profit: '2000', //доход
    profitPerOdometer: '0', //доход на километр
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
              <Text style={Styles.text} variant='bodyMedium'>{item.profit}</Text>
              <Text style={Styles.text} variant='bodyMedium'>Доход на пробег</Text>
              <Text style={Styles.text} variant='bodyMedium'>{item.profitPerOdometer}</Text>
            </View>
          </View>
        }
        customBody={item =>
          <View>
            <View style={Styles.stackRow}>
              <Card
                style={{ ...Styles.card, backgroundColor: '#90EE90' }}
                contentStyle={Styles.contentCard}
                mode='outlined' >
                <Card.Title
                  //titleStyle={Styles.contentCard}
                  title={
                    <View >
                      <Text style={Styles.text} variant='bodyLarge'>Выручка</Text>
                    </View>}
                />
                <Card.Content>
                  <Text style={Styles.text} variant='titleLarge'>{item.proceeds}</Text>
                </Card.Content>
              </Card>
              <Card
                style={{ ...Styles.card, backgroundColor: '#F08080' }}
                contentStyle={Styles.contentCard}
                mode='outlined' >
                <Card.Title title={
                  <Text variant='bodyLarge'>Расходы</Text>
                } />
                <Card.Content>
                  <Text variant='titleLarge'>{item.expenses}</Text>
                </Card.Content>
              </Card>

            </View>
            <View style={{...Styles.stackRow, justifyContent: 'flex-end'}} >
            <IconButton
                icon="pencil-outline"
                //size={20}
                onPress={() => {
                  navigation.navigate('Form', { item: JSON.stringify(item) })
                }}
              />
              <IconButton
                icon="delete-outline"
                //size={20}
                onPress={() => {
                  red = red + 1;
                  setListOfItems((list) => [
                    ...list.filter(listOfItems => listOfItems.key != item.key)
                  ])
                }}
              />
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
    // borderRadius: 48,
    right: 20,
    backgroundColor: '#1976d2',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'green'
  },
  item: {
    paddingHorizontal: 0,
    paddingRight: 0,
  },
  card: {
    // width: '50%', 
    //paddingBottom: '50%', 
    //height: 0,
    flex: 1,
    marginVertical: 8,
    marginRight: 8,
  },
  contentCard: {
    // width: '50%', 
    //paddingBottom: '50%', 
    //height: 0,
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center'
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
    //backgroundColor: 'red'
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
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#D3D3D3',
    padding: 0,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 16,
    shadowColor: '#D3D3D3',
    shadowOffset: {width: 1, height:2}, 
    //shadowOpacity: 0.2,
    //shadowRadius: 3
    
    //justifyContent: 'space-between'
  },

  accordionMain: {
    marginHorizontal: 22,
    paddingRight: 2,
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
    //justifyContent: 'space-around',
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