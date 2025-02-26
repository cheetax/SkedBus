import React, { useState, useEffect, SetStateAction } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextProviderProps, Func, Settings, Base, BaseType, Schedules, SelectMarker } from "./models/Models";
import { Supabase } from "./Supabase";
import { GeoAPIlogin } from "./glonasAPI";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface AppContext {
    base: Base,
    selectMarker: SelectMarker,
    onSelectMarker: Func<SelectMarker>,
    isDarkTheme?: boolean,
    toggleTheme?: () => void,
    setIsDarkTheme?: Func<boolean>,
    settings: Settings,
    saveSettings: Func<Settings>
}

const settingsDef: Settings = {
    priceFuel: 46,
    averageFuel: 9.5
}

class StorageData {
    base: Base = new Base();
    settings: Settings = settingsDef;
    isDarkTheme: boolean = false;
}

const Context = React.createContext<AppContext>({
    base: new Base,
    selectMarker: undefined,
    onSelectMarker: (props: SelectMarker): void => { },
    settings: settingsDef,
    saveSettings: (s) => { }
});

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

    const [base, setBase] = useState<Base>(new Base());
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [settings, setSettings] = useState<Settings>(settingsDef)

    const [selectMarker, setSelectMarker] = useState<SelectMarker>(undefined)

    const onSelectMarker = (select: SelectMarker) => {
        if (selectMarker != undefined) setSelectMarker(undefined)
        if (select != selectMarker) setTimeout(() => setSelectMarker(selectMarker => select), 100)
    }

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

    const showData = async () => {
        const result = await AsyncStorage.getItem('dataSkedBus');
        const resultBase = await getBase()
        let storageData = new StorageData()
        if (result) {
            storageData = JSON.parse(result)
            //setBase(storageData.base);
            setSettings(storageData.settings);
            setIsDarkTheme(storageData.isDarkTheme)
        }
        (resultBase) ? setBase(resultBase) : setBase(storageData.base)
    }

    const getBase = async () : Promise<Base> => {
        const {data, error} = await Supabase.rpc('Base')
        if (error) console.log(error) 
        return (!error) ? data : null
    }

    // const getDataToBase = async (): Promise<Base> => {
    //     const result =  
    //     //return result || new Base()
    // }

    const getBaseTest = async () => {
        const {data, error} = await Supabase.rpc('Base')
        //console.log(data)
    }

    useEffect(() => {
        showData();
        GeoAPIlogin();
        //getDataToBase();        
    }, []);

    const setData = (data: StorageData) => {
        AsyncStorage.setItem('dataSkedBus', JSON.stringify(data));
    }

    useEffect(() => {
        //console.log(1, base)
        setData({ base, settings, isDarkTheme });
    }, [base, isDarkTheme, settings]);

    const saveSettings = (s: Settings) => setSettings(s)

    return {
        base,
        selectMarker,
        onSelectMarker,
        isDarkTheme,
        toggleTheme,
        settings,
        saveSettings
    };
}