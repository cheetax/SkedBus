import React, { useState } from "react";

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
    const [isStartScroll, setIsStartScroll] = useState(false);
    const startScroll = (a) => setIsStartScroll(a !== 0)

    return {
        isStartScroll,
        startScroll
    };
}

