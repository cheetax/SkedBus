import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [isDarkTheme, setIsDarkTheme] = useState();
    const [isStartScroll, setIsStartScroll] = useState(false);
    const [settings, setSettings] = useState(
        {
            priceFuel: '46',
            averageFuel: '9.5'
        }
    )

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

    const startScroll = (a) => setIsStartScroll(a !== 0)

    const showData = async () => {
        var data = await AsyncStorage.getItem('dataCalcCost');
        if (data) {
            data = JSON.parse(data)
            setListOfItems(data.listOfItems);
            setSettings(data.settings);
            setIsDarkTheme(data.isDarkTheme)
        }
    }

    useEffect(() => {
        showData();
    }, []);

    const setData = (data) => {
        AsyncStorage.setItem('dataCalcCost', JSON.stringify(data));
    }

    useEffect(() => {
        if (listOfItems.length !== 0) {
            setData({ listOfItems, settings, isDarkTheme });
        }
    }, [listOfItems, isDarkTheme]);

    const [item, setItem] = useState({})

    const getItem = () => setItem({
        date: dayjs().toDate(), //dayjs().format('DD.MM.YY'),
        priceFuel: settings.priceFuel,
        averageFuel: settings.averageFuel,
        proceeds: '3000', //выручка
        odometerStart: '0', //спидометр старт
        odometerFinish: '0', //спидометр финиш
        profit: '2000', //доход
        profitPerOdometer: '0', //доход на километр
        odometer: '0',     //пробег
        expenses: '0',     //затраты
        key: keyGenerator()
      })

    const appliedListOfItems = (item) => {

    }

    return {
        listOfItems,
        setListOfItems,
        isDarkTheme,
        toggleTheme,
        isStartScroll,
        startScroll,
        setIsDarkTheme,
        settings,
        setSettings,
        item,
        getItem
    };
}