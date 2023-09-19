import React from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { AccordionItem } from "react-native-accordion-list-view";
import { FAB, Text, Card, IconButton, useTheme, } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from 'dayjs';

const keyGenerator = () => (Math.random() * 10000000000000000).toString();
var red = 0;

export default function Main({ navigation, route }) {

  const {
    listOfItems,
    isStartScroll,
    startScroll,
    deleteItemOfListOfItems
  } = useAppContext();

  const editForm = key => navigation.navigate({
    name: 'Form',
    params: { key },
  }) 

  const theme = useTheme();
  //console.log(listOfItems)
  return (
    <View style={Styles.main} >
      <FAB
        style={Styles.fab}
        icon="plus"
        size="medium"
        visible={!isStartScroll}
        onPress={() => editForm('')}>
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
                      style={{
                        ...Styles.card,
                        backgroundColor: theme.colors.surfaceVariant
                      }}
                    //</View>mode='outlined'
                    >
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
                      style={{
                        ...Styles.card,
                        backgroundColor: theme.colors.surfaceVariant
                      }}
                     //mode='outlined' 
                    >
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
                      onPress={() => editForm(item.key)}
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
    marginLeft: 4
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
    marginTop: 6,
    marginBottom: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 22
  },

  accordionMain: {
   // marginHorizontal: 22,
    paddingBottom: 10,
    marginBottom: 8,
    // paddingHorizontal: 4
  },

  stackRow: {
    flexDirection: 'row',
    flex: 1
  }
})