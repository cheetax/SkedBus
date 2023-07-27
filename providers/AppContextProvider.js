import React, {useState, useEffect} from "react";
import { useTheme } from "react-native-paper";
import dayjs from 'dayjs'

const Context = React.createContext(null);

export const AppContextProvider = ({ children, ...props }) => {
    const context = useCreateAppContext(props);
    return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useAppContext() {
    const context = React.useContext(Context);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateAppContext = function (props) {
    const [listOfItems, setListOfItems] = useState([]);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [isStartScroll, setIsStartScroll] = useState(false);

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

    const startScroll = (a) => setIsStartScroll(a !== 0)
    
    return {
        listOfItems,
        setListOfItems,
        isDarkTheme, 
        toggleTheme,
        isStartScroll,
        startScroll
    };
}