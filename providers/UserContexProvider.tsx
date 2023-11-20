import React, { useEffect, useState, createContext, ReactNode } from "react";
import { ContextProviderProps, Func, User } from "./models/Models";

interface UserContext {
    user: User,
    setUser: (user: User) => void,
    deleteUser: () => void
}

const userDefault = {
    name: '',
    email: '',
    avatar: '../assets/UserAvatar.png'
}

const userContextDefault = {
    user: userDefault,
    setUser: () => {},
    deleteUser: () => {}
}

const ContextUser = createContext<UserContext>(userContextDefault);

export const ScrollContextProvider = ({ children }: ContextProviderProps): ReactNode => {
    const context = useCreateUserContext();
    return <ContextUser.Provider value={context}>{children}</ContextUser.Provider>;
};

export const useUserContext = (): UserContext => {
    const context = React.useContext(ContextUser);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateUserContext = (): UserContext => {
    const [user, setUserState] = useState<User>(userDefault)

    const setUser: Func<User> = (user) => setUserState(user)

    const deleteUser = () => setUserState(userDefault)
    
    return {
        user,
        setUser,
        deleteUser,
    };
}

