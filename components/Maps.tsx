import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, NativeSyntheticEvent, Image } from 'react-native';
import { AccordionItem } from "react-native-accordion-list-view";
import { FAB, Text, Card, IconButton, useTheme, Divider } from 'react-native-paper';
import { useAppContext } from "../providers/AppContextProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../typesNavigation";
import { URALCHEMLOGO, SELECTBUSSTOP } from '../assets/index'
import YaMap, { CameraPosition, InitialRegion, MapLoaded, Marker } from 'react-native-yamap';
import { MarkerType } from "@/providers/models/Models";
import ViewBottomSheet from "./bottomSheet";
import Geolocation from '@react-native-community/geolocation';
import Token from '../token.env.json'
import dayjs from 'dayjs';

type Props = DrawerScreenProps<RootStackParamList, 'Maps'>

YaMap.init(Token.ymap.key);

//let initialPosition : InitialRegion = {lat: 0, lon: 0}

//Geolocation.getCurrentPosition((position) => initialPosition = {lat: position.coords.latitude, lon:position.coords.longitude, zoom: 15.5 })

const MarkerView = <Image source={URALCHEMLOGO} />

const SelectMarkerView = <Image source={SELECTBUSSTOP} />

export default function Maps({ navigation }: Props) {

  const {
    base,
    selectMarker,
    onSelectMarker
  } = useAppContext();

  const [initialPosition, setInitialPosition] = useState<InitialRegion>()

  const [scale, setScale] = useState<number>(0.5)

  useEffect(() => {
    Geolocation.getCurrentPosition((position) => setInitialPosition({ lat: position.coords.latitude, lon: position.coords.longitude, zoom: 15.5 }))
  }, []);

  //Geolocation.getCurrentPosition((position) => setInitialPosition({lat: position.coords.latitude, lon:position.coords.longitude, zoom: 15.5 }))
  //Geolocation.getCurrentPosition(info => console.log(info));

  const map = React.createRef<YaMap>();

  const point = (loc: string): { lat: number, lon: number } => {
    const point = loc.split(',')
    return { lat: +point[0], lon: +point[1] }

  }

  const onMapLoaded = (event: NativeSyntheticEvent<MapLoaded>) => {
    //console.log(eve
    //map.current?.fitAllMarkers()
  }

  const marker = (index: number, selectMarker: number | undefined): MarkerType => (index == selectMarker) ? { scale: 1, source: SelectMarkerView } : { scale: scale, source: MarkerView }

  const onCameraPositionChange = (event: NativeSyntheticEvent<CameraPosition>) => {
    const zoom = event.nativeEvent.zoom
    setScale((zoom >= 15.5) ? 0.4 + (Math.floor(event.nativeEvent.zoom - 15.5) * 0.07) : 0)
  }
  //const { isScrolling, startScroll } = useScrollContext();  
  const theme = useTheme();
  //console.log(listOfItems)
  return (
    <View style={[
      Styles.main,
      {
       // backgroundColor: theme.colors.surface
      }
    ]} >
      <YaMap
        //userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
        initialRegion={initialPosition}
        ref={map}
        //onMapLoaded={onMapLoaded}
        onCameraPositionChange={onCameraPositionChange}
        followUser
        showUserPosition
        style={{ flex: 1 }}>
        {base.BusStops.map((rec, index) => {
          const source = marker(index, selectMarker)
          //console.log(source)
          return <Marker
            key={index}
            point={point(rec.locPosition)}
            scale={source.scale}
            //source={source.source}
            children={source.source}
            onPress={() => onSelectMarker(index)}
          />
        })}
      </YaMap>
      < ViewBottomSheet />
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
    //marginRight: 8,
    marginLeft: 4
  },
  dividerCard: {
    marginBottom: 8,
    marginTop: 8
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
    paddingLeft: 16,
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
    //paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 22
  },

  accordionMain: {
    // marginHorizontal: 22,
    paddingBottom: 10,
    // marginBottom: 8,
    // paddingHorizontal: 4
  },

  stackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  }
})