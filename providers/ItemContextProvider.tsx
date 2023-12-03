import React, { useState, createContext, useContext } from "react";
import { useAppContext } from "./AppContextProvider";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { round } from "../helpers";
import { ContextProviderProps, Func, Item, OdometerItem, Settings } from "./models/Models";

interface ItemContext {
    item: Item,
    getItem: Func<string>,
    appliedOdometer: Func<OdometerItem>,
    itemOdometer: OdometerItem,
    getItemOdometer: Func<string>,
    listOdometer?: OdometerItem[],
    deleteOdometer: Func<string>,
    appliedItem: Func<Item>,
    appliedSettings: Func<Settings>,
}

const itemDefault: Item = {
    date: dayjs().toDate(), //dayjs().format('DD.MM.YY'),
    priceFuel: 0,
    averageFuel: 0,
    proceeds: 0, //выручка
    profit: 0, //доход
    profitPerOdometer: 0, //доход на километр
    odometer: {
        resultOdometer: 0,
        data: []
    },     //пробег
    expenses: 0,     //затраты
    key: '',
    id: '',
    isUpdate: false
}

const itemOdometerDefault = {
    odometerStart: 0, //спидометр старт
    odometerFinish: 0, //спидометр финиш
    key: ''
}

const ContextItem = createContext<ItemContext>({
    item: itemDefault,
    itemOdometer: itemOdometerDefault,
    appliedItem: () => { },
    appliedSettings: () => { },
    getItem: () => { },
    deleteOdometer: () => { },
    getItemOdometer: () => { },
    appliedOdometer: () => { }
});

const keyGenerator = () => (Math.random() * 10000000000000000).toString();

export const ItemContextProvider = ({ children }: ContextProviderProps) => {
    const context = useCreateItemContext();
    return <ContextItem.Provider value={context}>{children}</ContextItem.Provider>;
};

export const useItemContext = (): ItemContext => {
    const context = useContext(ContextItem);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateItemContext = () => {

    const { listOfItems, settings, saveSettings } = useAppContext();

    const newItem = (): Item => ({
        ...itemDefault,
        date: dayjs().toDate(), //dayjs().format('DD.MM.YY'),
        priceFuel: settings?.priceFuel ?? 0,
        averageFuel: settings?.averageFuel ?? 0,
        key: keyGenerator()
    })

    const newItemOdometer = (): OdometerItem => ({
        ...itemOdometerDefault,
        key: keyGenerator()
    })

    const [item, setItem] = useState<Item>(newItem())
    const [itemOdometer, setItemOdometer] = useState<OdometerItem>(newItemOdometer())
    const [listOdometer, setListOdometer] = useState<OdometerItem[]>([])

    const getItem: Func<string> = key => {
        // console.log(key)
        setItem((Item) => {
            const i = key !== '' ? listOfItems?.filter(list => list.key === key)[0] : newItem()
            setListOdometer(i.odometer.data)
            return i
        })
    }

    const calcProfit = (item: Item) => {
        const expenses = Math.round(item.averageFuel * item.priceFuel / 100 * item.odometer.resultOdometer)
        const profit = item.proceeds - expenses
        const profitPerOdometer = item.odometer.resultOdometer !== 0 ? round(profit / item.odometer.resultOdometer) : 0
        return { expenses, profit, profitPerOdometer }
    }

    const getItemOdometer = (key: string) => setItemOdometer(key !== '' ? item.odometer.data.filter(list => list.key === key)[0] : newItemOdometer())

    const appliedSettings = (i: Settings) => {
        saveSettings(i)
        appliedItem({
            ...item,
            ...i
        })
        // setItem(item => {
        //     const calc = calcProfit({
        //         ...item,
        //         averageFuel: i.averageFuel,
        //         priceFuel: i.priceFuel,
        //     });
        //     return {
        //         ...item,
        //         ...i,
        //         ...calc,
        //         isUpdate: true
        //     }
        // })
    }

    const odometer = (newList: OdometerItem[]) => ({
        resultOdometer: newList.length !== 0 ? newList.reduce((val, item) => val + (item.odometerFinish - item.odometerStart), 0) : 0,
        data: newList
    })

    const appliedOdometer = (i: OdometerItem) => setListOdometer(list => {
        const newList = [
            i,
            ...list.filter(list => list.key != i.key)
        ]
        // const odometer = {
        //     resultOdometer: newList.length !== 0 ? newList.reduce((val, item) => val + (item.odometerFinish - item.odometerStart), 0) : 0,
        //     data: newList
        // }
        appliedItem({
            ...item,
            odometer: odometer(newList)
        })
        // setItem(item => {
        //     const calc = calcProfit({
        //         ...item,
        //         odometer
        //     });
        //     return {
        //         ...item,
        //         odometer,
        //         ...calc,
        //         isUpdate: true
        //     }
        // })
        return newList
    })

    const deleteOdometer = (key: string) => setListOdometer(list => {
        const newList = [
            ...list.filter(list => list.key != key)
        ]
        // const odometer = {
        //     resultOdometer: newList.length !== 0 ? newList.reduce((val, item) => val + (item.odometerFinish - item.odometerStart), 0) : 0,
        //     data: newList
        // }
        appliedItem({
            ...item,
            odometer: odometer(newList)
        })
        // setItem(item => {
        //     const calc = calcProfit({
        //         ...item,
        //         averageFuel: item.averageFuel,
        //         priceFuel: item.priceFuel,
        //         odometer
        //     });
        //     return {
        //         ...item,
        //         odometer,
        //         ...calc,
        //         isUpdate: true
        //     }
        // })
        return newList
    })

    const appliedItem = (i: Item) => setItem(item => {
        const calc = calcProfit({
            ...item,
            averageFuel: i.averageFuel,
            priceFuel: i.priceFuel,
            odometer: i.odometer
        });
        return {
            ...i,
            ...calc,
            isUpdate: true
        }
    })

    return {
        item,
        getItem,
        appliedOdometer,
        itemOdometer,
        getItemOdometer,
        listOdometer,
        deleteOdometer,
        appliedItem,
        appliedSettings,
    };
}
