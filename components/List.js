import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { AccordionList, AccordionItem } from "react-native-accordion-list-view";
import { FAB, Text, Card, IconButton, useTheme, } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';

const keyGenerator = () => (Math.random() * 10000000000000000).toString();
var red = 0;

export default function Main({ navigation, route }) {

  const {
    listOfItems,
    setListOfItems,
    isStartScroll,
    startScroll,
    setIsDarkTheme,
    isDarkTheme,
    settings,
    setSettings,
    deleteItemOfListOfItems
  } = useAppContext();

  // useEffect(() => {
  //   if (route.params?.post) {
  //     const post = JSON.parse(route.params.post);
  //     setListOfItems(list => [
  //       post,
  //       ...list.filter(list => list.key != post.key)
  //     ].sort((a, b) => dayjs(b.date).toDate() - dayjs(a.date).toDate())
  //     );
  //     setSettings(setting => setting = {
  //       priceFuel: post.priceFuel,
  //       averageFuel: post.averageFuel
  //     });
  //   }
  //   //navigation.reset()
  // }, [route.params?.post] )  

  const theme = useTheme();

  return (
    <View style={Styles.main} >
      <FAB
        style={Styles.fab}
        //theme={theme}
        //color="white"
        icon="plus"
        size="medium"
        onPress={() => navigation.navigate({
          name: 'Form',
          params: { key: '' },
        })
        }>
      </FAB>
      <FlatList
        onScroll={(e) => startScroll(e.nativeEvent.contentOffset.y)}
        data={listOfItems}
        style={Styles.accordionMain}
        renderItem={({ item, index, separators }) => (
          <Card
            theme={theme}
            style={Styles.surface}
          //elevation={1} 
          >
            <AccordionItem
              containerStyle={Styles.accordion}
              customIcon={() => <MaterialCommunityIcons name={'chevron-right'} color={theme.colors.onSurface} size={26} />}
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
                      mode='outlined' >
                      <Card.Title
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
                        navigation.navigate('Form', { key: item.key })
                      }}
                    />
                    <IconButton
                      icon="delete-outline"
                      onPress={() => deleteItemOfListOfItems(item.key)}
                    />
                  </View>
                </View>
              }
            />
          </Card>

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
    bottom: 16,
    right: 16,
    //backgroundColor: '#1976d2',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: '#f2f2f2',
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

  accordion: {
    flex: 1,
    padding: 0,
    backgroundColor: 'none',
  },

  surface: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  accordionMain: {
    marginHorizontal: 22,
    paddingBottom: 10,
    marginBottom: 8
  },

  stackRow: {
    flexDirection: 'row',
    flex: 1
  }
})