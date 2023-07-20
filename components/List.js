import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { AccordionList, AccordionItem } from "react-native-accordion-list-view";
import { FAB, Text, Card, IconButton, Surface } from 'react-native-paper';

import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';

const keyGenerator = () => (Math.random() * 10000000000000000).toString();
var red = 0;

export default function Main({ navigation, route }) {
  //console.log(route)

  useEffect(() => {
    if (listOfItems.length !== 0) {
      setData({ listOfItems, settings });
    }
  }, [red, listOfItems]);

  useEffect(() => {
    if (route.params?.post) {

      const post = JSON.parse(route.params.post);
      setListOfItems(list => [
        post,
        ...list.filter(list => list.key != post.key)
      ]
      );
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
    date: dayjs().toDate(), //dayjs().format('DD.MM.YY'),
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
          navigation.navigate('Form', { item: JSON.stringify(item) })
        }}>
      </FAB>
      <FlatList
        data={listOfItems}
        style={Styles.accordionMain}
        renderItem={({ item, index, separators }) => (
          <Surface style={Styles.surface} elevation={2} >
            <AccordionItem
              containerStyle={Styles.accordion}

              customTitle={() =>
                <View style={Styles.accordionTitle} >
                  <Text style={Styles.text} variant='bodyLarge'>{dayjs(item.date).format('DD.MM.YY')}</Text>
                  <View style={Styles.stackRow}>
                    <Text style={Styles.text} variant='bodyMedium'>Доход</Text>
                    <Text style={Styles.text} variant='bodyMedium'>{item.profit}</Text>
                    <Text style={Styles.text} variant='bodyMedium'>Доход на пробег</Text>
                    <Text style={Styles.text} variant='bodyMedium'>{item.profitPerOdometer}</Text>
                  </View>
                </View>
              }
              customBody={() =>
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
                  <View style={{ ...Styles.stackRow, justifyContent: 'flex-end' }} >
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
          </Surface>

        )}
      >

      </FlatList>

    </View >
  );
}

const Styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 1000,
    alignSelf: 'flex-end',
    bottom: 20,
    right: 20,
    backgroundColor: '#1976d2',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  item: {
    paddingHorizontal: 0,
    paddingRight: 0,
  },
  card: {
    flex: 1,
    marginVertical: 8,
    marginRight: 8,
  },
  contentCard: {
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
    flex: 1,
    marginBottom: 0,
    //borderRadius: 12,
    padding: 0,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },

  surface: {
    flex: 1,
    marginTop: 8,
    //marginBottom: 8,
    borderRadius: 12,
  },

  accordionMain: {
    marginHorizontal: 22,
    paddingBottom: 10,
    //paddingRight: 2,
    marginBottom: 8
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
    flex: 1
  }
})