import React, { useEffect, useState, createContext, ReactNode } from "react";

interface ScrollContext {
    isScrolling: boolean,
    startScroll?: (a: number) => void,
    setScreen?: (screen: string) => void,        
}

interface ScrollContextProviderProps{
    children: ReactNode
}

interface IsStartScroll {
    [key: string]: boolean
}

const ContextScroll = createContext<ScrollContext>({isScrolling: false});

export const ScrollContextProvider = ({ children}: ScrollContextProviderProps ) => {
    const context = useCreateScrollContext();
    return <ContextScroll.Provider value={context}>{children}</ContextScroll.Provider>;
};

export const useScrollContext = () => {
    const context = React.useContext(ContextScroll);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}


export const useCreateScrollContext = () => {
    const [screen, setScreenState] = useState('main')

    const setScreen = (screen: string) => setScreenState(screen)
    
    const [isStartScroll, setIsStartScroll] =  useState<IsStartScroll>({
        main: false,
        chart: false
    });
    const [isScrolling, setIsScrolling] = useState<boolean>(isStartScroll[screen]);

    const startScroll = (a: number) => setIsStartScroll({[screen]: a !== 0})



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

