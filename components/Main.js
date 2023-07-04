import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Accordion, AccordionSummary, AccordionDetails, Stack, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Edit, Delete} from '@mui/icons-material';

export default function Main({param}) {
    const loadScene = () => {
      navigation.navigate('Detail');
    }
    
    console.log(param);    
    

    return (
        <FlatList data={param.listOfItems} renderItem={({item}) =>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id='panel1a-header'
              >
                <Text style={styles.summary} >{ item.date} Выручка: { item.proceeds } Пробег: { item.odometer }</Text>
              </AccordionSummary>
              <AccordionDetails>
                <View>
                  <Text style={styles.detail}>Цена топлива {param.settings.priceFuel} | Средний расход {param.settings.averageFuel}</Text>
                  <Text style={styles.detail}>Расходы: {item.expenses}</Text>
                  <Text style={styles.detail}>Доход: {item.profit}</Text>
                  <Stack direction='row-reverse' spacing={2}>
                    <IconButton edge='start' color='inherit' aria-label='menu' sx={{mr: 1}}>
                      <Delete />
                    </IconButton>
                    <IconButton edge='start' color='inherit' aria-label='menu' sx={{mr: 1}}>
                      <Edit />
                    </IconButton>
                    
                  </Stack>
                </View>
                
              </AccordionDetails>
            </Accordion> 
          }/>
    );
  }
 
  const styles = StyleSheet.create({
    main: {
      //flex: 1,
      paddingTop: 0,
      //height: 100,
      //backgroundColor: 'silver',
    },
    detail:{
      fontSize: 18,
      textAlign: 'left',
      //marginLeft: 10, 
      paddingVertical: 5
    },
    header:{
      fontSize: 20,
      //backgroundColor: '#E0FFFF',
      //textAlign: 'center',
      //paddingVertical: 20 
    },
    profit: {
        fontSize: 18,
        //textAlign: 'left',
        //paddingVertical: 15,
        //backgroundColor: '#98FB98',
        //paddingHorizontal: 10,
    },
    summary: {
      fontSize: 18,
      fontStyle: '400',
      textAlign: 'left',
    },
    iconAdd:{
      textAlign: 'center',
      marginVertical: 15
    }
  });