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

    const newItem = () => ({
        date: dayjs().toDate(), //dayjs().format('DD.MM.YY'),
        priceFuel: settings.priceFuel,
        averageFuel: settings.averageFuel,
        proceeds: '', //выручка
        profit: '', //доход
        profitPerOdometer: '', //доход на километр
        odometer: {
            resultOdometer: 0,
            data: []
        },     //пробег
        expenses: '',     //затраты
        key: keyGenerator()
    })

    const newItemOdometer = () => ({
        odometerStart: '', //спидометр старт
        odometerFinish: '', //спидометр финиш
        key: keyGenerator()
    })

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

    const [item, setItem] = useState(newItem())
    const [itemOdometer, setItemOdometer] = useState(newItemOdometer())
    const [listOdometer, setListOdometer] = useState([])

    const getItem = key => {
        setItem(item => {
            const i = key !== '' ? listOfItems.filter(list => list.key === key)[0] : newItem()
            setListOdometer(i.odometer.data)
            console.log(i)
            return i
        })
    }
    const getItemOdometer = key => setItemOdometer(key !== '' ? item.odometer.data.filter(list => list.key === key)[0] : newItemOdometer())

    const appliedListOfItems = i => setListOfItems(list => [
        i,
        ...list.filter(list => list.key != i.key)
    ].sort((a, b) => dayjs(b.date).toDate() - dayjs(a.date).toDate())
    );

    const appliedSettings = i => setSettings(settings => {

        setItem(item => {
            const expenses = Math.round(i.averageFuel * i.priceFuel / 100 * item.odometer.resultOdometer)
            const profit = item.proceeds - expenses
            const profitPerOdometer = profit / item.odometer.resultOdometer
            return {
                ...item,
                ...i,
                expenses,
                profit,
                profitPerOdometer
            }
        })
        return i
    })

    const appliedOdometer = i => setListOdometer(list => {
        const newList = [
            i,
            ...list.filter(list => list.key != i.key)
        ]
        const odometer = {
            resultOdometer: newList.length !== 0 ? newList.reduce((val, item) => val + (item.odometerFinish - item.odometerStart), 0) : 0,
            data: newList
        }
        setItem(item => {
            const expenses = Math.round(i.averageFuel * i.priceFuel / 100 * odometer.resultOdometer)
            const profit = item.proceeds - expenses
            const profitPerOdometer = profit / odometer.resultOdometer
            return {
                ...item,
                odometer,
                expenses,
                profit,
                profitPerOdometer
            }
        })
        return newList
    })

    const deleteOdometer = key => setListOdometer(list => {
        //console.log(key)
        const newList = [
            ...list.filter(list => list.key != key)
        ]
        const odometer = {
            resultOdometer: newList.length !== 0 ? newList.reduce((val, item) => val + (item.odometerFinish - item.odometerStart), 0) : 0,
            data: newList
        }

        setItem(item => {
            //console.log(item)
            const expenses = Math.round(item.averageFuel * item.priceFuel / 100 * odometer.resultOdometer)
            const profit = item.proceeds - expenses
            const profitPerOdometer = profit / odometer.resultOdometer
            return {
                ...item,
                odometer,
                expenses,
                profit,
                profitPerOdometer
            }
        })
        return newList
    })

    const appliedItem = i => setItem(item => {
        //console.log(i)
        const expenses = Math.round(i.averageFuel * i.priceFuel / 100 * i.odometer.resultOdometer)
        const profit = i.proceeds - expenses
        const profitPerOdometer = profit / i.odometer.resultOdometer
        return {
            ...i,
            expenses,
            profit,
            profitPerOdometer
        }
    })

    const deleteItemOfListOfItems = key => setListOfItems(list => [
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
        appliedSettings,
        item,
        getItem,
        appliedListOfItems,
        deleteItemOfListOfItems,
        appliedOdometer,
        itemOdometer,
        getItemOdometer,
        listOdometer,
        deleteOdometer,
        appliedItem
    };
}