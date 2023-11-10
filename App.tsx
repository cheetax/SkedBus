import 'react-native-gesture-handler';
import React, { FC } from "react";
import MainStack from './Navigate';
import { AppContextProvider } from "./providers/AppContextProvider";
import { ScrollContextProvider } from "./providers/ScrollContextProvider";

const App : FC = () => {
  return (
    <AppContextProvider>
      <ScrollContextProvider>
        <MainStack />
      </ScrollContextProvider>
    </AppContextProvider>
  );
}

export default App;