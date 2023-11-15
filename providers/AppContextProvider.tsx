import React, { useState, useEffect, SetStateAction } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextProviderProps, Func, Item, Settings } from "./models/Models";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface AppContext {
    listOfItems: Item[],
    setListOfItems?: Func<Item[]>,
    isDarkTheme?: boolean,
    toggleTheme?: () => void,
    setIsDarkTheme?: Func<boolean>,
    appliedListOfItems?: Func<Item>,
    deleteItemOfListOfItems?: Func<string>,
    settings: Settings,
    saveSettings: Func<Settings>
}

type StorageData = {
    listOfItems: Item[];
    settings: Settings;
    isDarkTheme: boolean;
}

const settingsDef: Settings = {
    priceFuel: 46,
    averageFuel: 9.5
}

const Context = React.createContext<AppContext>({ listOfItems: [], settings: settingsDef, saveSettings: (s) => {}});

export const AppContextProvider = ({ children }: ContextProviderProps) => {
    const context = useCreateAppContext();
    return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useAppContext = () => {
    const context = React.useContext(Context);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateAppContext = () => {
    const [listOfItems, setListOfItems] = useState<Item[]>([]);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [settings, setSettings] = useState<Settings>(settingsDef)

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

    const showData = async () => {
        const result = await AsyncStorage.getItem('dataCalcCost');
        if (result) {
            const storageData: StorageData = JSON.parse(result)
            setListOfItems(storageData.listOfItems.map(item => {
                item.date = dayjs(item.date).toDate()
                return item
            }));
            setSettings(storageData.settings);
            setIsDarkTheme(storageData.isDarkTheme)
        }
    }

    useEffect(() => {
        showData();
    }, []);

    const setData = (data: StorageData) => {
        AsyncStorage.setItem('dataCalcCost', JSON.stringify(data));
    }

    useEffect(() => {
        setData({ listOfItems, settings, isDarkTheme });
    }, [listOfItems, isDarkTheme, settings]);

    const appliedListOfItems = (i: Item) => setListOfItems(list => [
        i,
        ...list.filter(list => list.key != i.key)
    ].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
    );

    const deleteItemOfListOfItems = (key: string) => setListOfItems(list => [
        ...list.filter(listOfItems => listOfItems.key != key)
    ])

    const saveSettings = (s: Settings) => setSettings(s)

    return {
        listOfItems,
        isDarkTheme,
        toggleTheme,
        appliedListOfItems,
        deleteItemOfListOfItems,
        settings,
        saveSettings
    };
}