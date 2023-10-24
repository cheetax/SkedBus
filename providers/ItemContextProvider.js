import React, { useState, useEffect } from "react";
import { useAppContext } from "./AppContextProvider";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const ContextItem = React.createContext(null);

const keyGenerator = () => (Math.random() * 10000000000000000).toString();

export const ItemContextProvider = ({ children, ...props }) => {
    const context = useCreateItemContext(props);
    return <ContextItem.Provider value={context}>{children}</ContextItem.Provider>;
};

export const useItemContext = () => {
    const context = React.useContext(ContextItem);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateItemContext = function (props) {
    //const 
    const { listOfItems } = useAppContext();
   
    //const [isStartScroll, setIsStartScroll] = useState(false);
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

    //const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

    //const startScroll = (a) => setIsStartScroll(a !== 0)

    const [item, setItem] = useState(newItem())
    const [itemOdometer, setItemOdometer] = useState(newItemOdometer())
    const [listOdometer, setListOdometer] = useState([])

    const getItem = key => {
        setItem(item => {
            const i = key !== '' ? listOfItems.filter(list => list.key === key)[0] : newItem()
            setListOdometer(i.odometer.data)
            return i
        })
    }
    const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

    const calcProfit = (item) => {
        const expenses = Math.round(item.averageFuel * item.priceFuel / 100 * item.odometer.resultOdometer)
        const profit = item.proceeds - expenses
        const profitPerOdometer = item.odometer.resultOdometer !== 0 ? round(profit / item.odometer.resultOdometer, 2) : '-'
        return { expenses, profit, profitPerOdometer }
    }

    const getItemOdometer = key => setItemOdometer(key !== '' ? item.odometer.data.filter(list => list.key === key)[0] : newItemOdometer())
    
    const appliedSettings = i => setSettings(settings => {

        setItem(item => {
            const calc = calcProfit({
                ...item,
                averageFuel: i.averageFuel,
                priceFuel: i.priceFuel,
            });
            return {
                ...item,
                ...i,
                ...calc
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
            const calc = calcProfit({
                ...item,
                averageFuel: i.averageFuel,
                priceFuel: i.priceFuel,
                odometer
            });
            return {
                ...item,
                odometer,
                ...calc
            }
        })
        return newList
    })

    const deleteOdometer = key => setListOdometer(list => {
        const newList = [
            ...list.filter(list => list.key != key)
        ]
        const odometer = {
            resultOdometer: newList.length !== 0 ? newList.reduce((val, item) => val + (item.odometerFinish - item.odometerStart), 0) : 0,
            data: newList
        }

        setItem(item => {
            const calc = calcProfit({
                ...item,
                averageFuel: item.averageFuel,
                priceFuel: item.priceFuel,
                odometer
            });
            return {
                ...item,
                odometer,
                ...calc
            }
        })
        return newList
    })

    const appliedItem = i => setItem(item => {
        const calc = calcProfit({
            ...item,
            averageFuel: i.averageFuel,
            priceFuel: i.priceFuel,
            odometer: i.odometer
        });
        return {
            ...i,
            ...calc
        }
    })

    return {
       // isStartScroll,
        //startScroll,
       // setIsDarkTheme,
        settings,
        appliedSettings,
        item,
        getItem,
        appliedOdometer,
        itemOdometer,
        getItemOdometer,
        listOdometer,
        deleteOdometer,
        appliedItem,
        round
    };
}
