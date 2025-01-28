import 'react-native-gesture-handler';
import React, { FC } from "react";
import MainStack from './Navigate';
import { AppContextProvider } from "./providers/AppContextProvider";
import { ScrollContextProvider } from "./providers/ScrollContextProvider";
import { UserContextProvider } from './providers/UserContexProvider';

const App: FC = () => {
  return (
    <AppContextProvider>
      <ScrollContextProvider>
        <UserContextProvider>
          <MainStack />
        </UserContextProvider>

      </ScrollContextProvider>
    </AppContextProvider>
  );
}

export default App;