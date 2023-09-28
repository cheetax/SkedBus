import React from "react";
import { View, StyleSheet, FlatList } from 'react-native';
//import { AccordionItem } from "react-native-accordion-list-view";
import { FAB, Text, Divider, IconButton, useTheme, Appbar } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from 'dayjs';

export default function ListOdometer({ navigation, route }) {
  // console.log(1)
  const {
    listOdometer,
    isStartScroll,
    startScroll,
    deleteItemOfListOfItems
  } = useAppContext();

  const editForm = key => navigation.navigate({
    name: 'FormOdometer',
    params: { key },
  })

  const theme = useTheme();
  console.log(listOdometer)
  return (
    <View style={Styles.main} >
      <Appbar.Header
      >
        <Appbar.Action
          icon='arrow-left'
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={
            <Text
              variant='titleLarge'>Пробеги</Text>}
        />
      </Appbar.Header>
      <FAB
        style={Styles.fab}
        icon="plus"
        size="medium"
        visible={!isStartScroll}
        onPress={() => editForm('')}>
      </FAB>
      <FlatList
        onScroll={(e) => startScroll(e.nativeEvent.contentOffset.y)}
        data={listOdometer}
        style={Styles.accordionMain}
        renderItem={({ item, index, separators }) => (
          <View >
            <Text>{item.odometerStart}</Text>
            <Text>{item.odometerFinish} </Text>
            <Divider />
          </View>
        )}
      >
      </FlatList >

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