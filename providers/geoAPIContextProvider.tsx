import React, { useState, createContext, useContext } from "react";
import { ContextProviderProps, Func, BusesGeo } from "./models/Models";
import { useAppContext } from "./AppContextProvider";

interface geoAPIContext {
    busesGeo: BusesGeo[] | undefined
}

const ContextItem = createContext<geoAPIContext>({
    busesGeo: []
});

const keyGenerator = () => (Math.random() * 10000000000000000).toString();

export const ItemContextProvider = ({ children }: ContextProviderProps) => {
    const context = useCreateItemContext();
    return <ContextItem.Provider value={context}>{children}</ContextItem.Provider>;
};

export const useItemContext = (): geoAPIContext => {
    const context = useContext(ContextItem);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateItemContext = () => {

    const { base } = useAppContext();
 

    const [busesGeo, setBusesGeo] = useState<BusesGeo>()

    return {
        busesGeo
    };
}
