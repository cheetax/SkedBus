import 'react-native-gesture-handler';
import React from "react";
import MainStack from './Navigate';
//import { StatusBar } from "react-native";
//import { NativeBaseProvider } from 'native-base'
import { AppContextProvider } from "./providers/AppContextProvider";
import { ScrollContextProvider } from "./providers/ScrollContextProvider";

export default function App() {
  //StatusBar.setHidden(false)
  return (
    <AppContextProvider>
      <ScrollContextProvider>
        <MainStack />
      </ScrollContextProvider>
    </AppContextProvider>
  );
}
//registerRootComponent(Main);