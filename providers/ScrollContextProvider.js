import React, { useEffect, useState } from "react";

const ContextScroll = React.createContext(null);

export const ScrollContextProvider = ({ children, ...props }) => {
    const context = useCreateScrollContext(props);
    return <ContextScroll.Provider value={context}>{children}</ContextScroll.Provider>;
};

export const useScrollContext = () => {
    const context = React.useContext(ContextScroll);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateScrollContext = (props) => {
    const [screen, setScreen] = useState('main')
    
    const [isStartScroll, setIsStartScroll] =  useState({
        main: false,
        chart: false
    });
    const [isScrolling, setIsScrolling] = useState(isStartScroll[screen]);

    const startScroll = (a) => setIsStartScroll({[screen]: a !== 0})

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

