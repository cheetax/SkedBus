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
  //console.log(listOdometer)
  return (
    <View style={[Styles.main, { backgroundColor: theme.colors.surface }]} >
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
        renderItem={({ item, index, separators }) => (
          <View  >
            <View style={Styles.item} >
              <View style={Styles.itemContent} >
                <Text variant="bodyLarge" >Пробег: {item.odometerFinish - item.odometerStart}</Text>
                <View style={Styles.stackRow} >
                  <Text variant="bodyMedium" >Спидометр: начало - {item.odometerStart};</Text>
                  <Text variant="bodyMedium" > конец - {item.odometerFinish} </Text>
                </View>
              </View>
              <IconButton icon="dots-vertical" style={Styles.iconButton} />
            </View>
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
  itemContent: {
    height: 72,
    justifyContent: 'center',
  },  
   
  item: {
    flexDirection: 'row',
    margin: 0,
    paddingHorizontal: 16,
  },
  iconButton: {
    margin: 0,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end'
  },
  stackRow: {
    flexDirection: 'row',
  }
})