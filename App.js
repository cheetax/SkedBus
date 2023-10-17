import 'react-native-gesture-handler';
import React from "react";
import MainStack from './Navigate';
import { registerRootComponent } from 'expo';
//import { StatusBar } from "react-native";
//import { NativeBaseProvider } from 'native-base'
import { AppContextProvider } from "./providers/AppContextProvider";

export default function App() {
  //StatusBar.setHidden(false)
  return (
    <AppContextProvider>
      <MainStack />
    </AppContextProvider>
  );
}
//registerRootComponent(Main);