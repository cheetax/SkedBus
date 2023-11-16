import React, { useState } from "react";
import { View, StyleSheet, FlatList, Touchable } from 'react-native';;
import { FAB, Text, Divider, IconButton, useTheme, Appbar, Menu, TouchableRipple } from 'react-native-paper';
import { useItemContext } from "../providers/ItemContextProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";

type Props = DrawerScreenProps<RootStackParamList, 'ListOdometer'>

interface MenuOdometerProps {
  keyItem: string
}

export default function ListOdometer({ navigation }: Props) {
  const {
    listOdometer,
    deleteOdometer
  } = useItemContext();

  const [isStartScroll, setIsStartScroll] = useState(false);
  const startScroll = (a: number) => setIsStartScroll(a !== 0)

  const editForm = (key: string) => navigation.navigate('FormOdometer', { key, params: { key } })


  const MenuOdometer = (props: MenuOdometerProps) => {
    const [visible, setVisible] = useState(false)

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    const del = () => deleteOdometer(props.keyItem)

    return (
      <View style={{ justifyContent: 'center' }} >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton onPress={openMenu} icon="dots-horizontal" style={Styles.iconButton} />
          }
        >
          {/* <Menu.Item leadingIcon="pencil" onPress={edit} title='Изменить' /> */}
          <Menu.Item leadingIcon="delete" onPress={del} title='Удалить' />
        </Menu>
      </View>)
  }

  const theme = useTheme();
  return (
    <View style={[Styles.main, { backgroundColor: theme.colors.surface }]} >
      <Appbar.Header
        style={{
          backgroundColor: isStartScroll ? theme.colors.elevation.level2 : theme.colors.surface
        }}
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
        onPress={() => editForm('')} />
      <FlatList
        onScroll={(e) => startScroll(e.nativeEvent.contentOffset.y)}
        data={listOdometer}

        renderItem={({ item }) => (
          <View>
            <TouchableRipple onPress={() => editForm(item.key)}>
              <View style={Styles.item} >
                <View style={Styles.itemContent} >
                  <Text variant="bodyLarge" >Пробег: {item.odometerFinish - item.odometerStart}</Text>
                  <View style={Styles.stackRow} >
                    <Text variant="bodyMedium" >Спидометр: начало - {item.odometerStart};</Text>
                    <Text variant="bodyMedium" > конец - {item.odometerFinish} </Text>
                  </View>
                </View>
                <MenuOdometer keyItem={item.key} />
              </View>
            </TouchableRipple>
            <Divider />
          </View>)
        }
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
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  itemContent: {
    height: 72,
    justifyContent: 'center',
  },

  item: {
    flexDirection: 'row',
    margin: 0,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  iconButton: {
    margin: 0,
  },
  stackRow: {
    flexDirection: 'row',
  }
})