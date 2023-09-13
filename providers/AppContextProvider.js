import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const Context = React.createContext(null);

const keyGenerator = () => (Math.random() * 10000000000000000).toString();

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
            
        }
        setData({ listOfItems, settings, isDarkTheme });
    }, [listOfItems, isDarkTheme]);

    const [item, setItem] = useState()

    const getItem = (key) => {
        //console.log(listOfItems.filter(list => list.key === key)[0] )
        setItem(key !== '' ? listOfItems.filter(list => list.key === key)[0] : {
            date: dayjs().toDate(), //dayjs().format('DD.MM.YY'),
            priceFuel: settings.priceFuel,
            averageFuel: settings.averageFuel,
            proceeds: '', //выручка
            odometerStart: '', //спидометр старт
            odometerFinish: '', //спидометр финиш
            profit: '', //доход
            profitPerOdometer: '', //доход на километр
            odometer: '',     //пробег
            expenses: '',     //затраты
            key: keyGenerator()
        })
    }

    const appliedListOfItems = (item) => setListOfItems(list => [
        item,
        ...list.filter(list => list.key != item.key)
    ].sort((a, b) => dayjs(b.date).toDate() - dayjs(a.date).toDate())
    );

    const deleteItemOfListOfItems = (key) => setListOfItems(list => [
        ...list.filter(listOfItems => listOfItems.key != key)
    ])

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
        getItem,
        appliedListOfItems,
        deleteItemOfListOfItems
    };
}