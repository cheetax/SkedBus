import React, { useEffect, useState, createContext, ReactNode } from "react";
import { ContextProviderProps, Func } from "./models/Models";

interface ScrollContext {
    isScrolling: boolean,
    startScroll: (t: number) => void,
    setScreen?: Func<string>,        
}

interface IsStartScroll {
    [key: string]: boolean
}

const ContextScroll = createContext<ScrollContext>({isScrolling: false, startScroll: () =>{}});

export const ScrollContextProvider = ({ children}: ContextProviderProps ): ReactNode => {
    const context = useCreateScrollContext();
    return <ContextScroll.Provider value={context}>{children}</ContextScroll.Provider>;
};

export const useScrollContext = ():ScrollContext => {
    const context = React.useContext(ContextScroll);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateScrollContext = ():ScrollContext => {
    const [screen, setScreenState] = useState('main')

    const setScreen: Func<string> = (screen) => setScreenState(screen)
    
    const [isStartScroll, setIsStartScroll] =  useState<IsStartScroll>({
        main: false,
        chart: false
    });
    const [isScrolling, setIsScrolling] = useState<boolean>(isStartScroll[screen]);

    const startScroll: Func<number> = (a) => setIsStartScroll({[screen]: a !== 0})

    useEffect(() => {
        setIsScrolling(isStartScroll[screen])
        //console.log(screen)
    },[screen, isStartScroll ])    

    return {
        isScrolling,
        startScroll,
        setScreen,        
    };
}

