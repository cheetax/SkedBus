import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const Context = React.createContext(null);
const ContextScroll = React.createContext(null);

const keyGenerator = () => (Math.random() * 10000000000000000).toString();

export const AppContextProvider = ({ children, ...props }) => {
    const context = useCreateAppContext(props);
    return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const AppContextProviderScroll = ({ children, ...props }) => {
    const context = useCreateAppContextScroll(props);
    return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useAppContext = () => {
    const context = React.useContext(Context);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useAppContextScroll = () => {
    const context = React.useContext(ContextScroll);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateAppContextScroll = (props) => {
    const [isStartScroll, setIsStartScroll] = useState(false);
    const startScroll = (a) => setIsStartScroll(a !== 0)   

    return {        
        isStartScroll,
        startScroll
    };
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
            data.listOfItems.forEach(item => item.date = dayjs(item.date).toDate())
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
        setData({ listOfItems, settings, isDarkTheme });
    }, [listOfItems, isDarkTheme]);

    const [item, setItem] = useState({
        date: '', //dayjs().format('DD.MM.YY'),
        priceFuel: '',
        averageFuel: '',
        proceeds: '', //выручка
        odometerStart: '', //спидометр старт
        odometerFinish: '', //спидометр финиш
        profit: '', //доход
        profitPerOdometer: '', //доход на километр
        odometer: '',     //пробег
        expenses: '',     //затраты
        key: ''
    })

    const getItem = (key) => {
        
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

    const appliedListOfItems = (item) => {
        console.log(item)
        setListOfItems(list => [
            item,
            ...list.filter(list => list.key != item.key)
        ].sort((a, b) => dayjs(b.date).toDate() - dayjs(a.date).toDate())
        );
    }

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