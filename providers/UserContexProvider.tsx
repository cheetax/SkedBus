import React, { useEffect, useState, createContext, ReactNode } from "react";
import { ContextProviderProps, Func, } from "./models/Models";
import { User } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userAvatar from '../assets/userAvatar.json'
import getFiles from '../providers/DriveSaveProvider'

interface UserContext {
    userInfo: User,
    isSyncBaseOn: boolean
    setUser: Func<User> ,
    deleteUser: () => void,
    setIsSyncOn: () => void
}

const userDefault : User = {
    user: {
        id:'',
        email: '',
        familyName:'',
        givenName: '',
        name:'',
        photo: userAvatar.image
    },
    idToken: null,
    serverAuthCode: ''
}

const userContextDefault: UserContext = {
    userInfo: userDefault,
    isSyncBaseOn: false,
    setUser: () => {},
    deleteUser: () => {},
    setIsSyncOn: () => {}
}

const ContextUser = createContext<UserContext>(userContextDefault);

export const UserContextProvider = ({ children }: ContextProviderProps): ReactNode => {
    const context = useCreateUserContext();
    return <ContextUser.Provider value={context}>{children}</ContextUser.Provider>;
};

export const useUserContext = (): UserContext => {
    const context = React.useContext(ContextUser);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

export const useCreateUserContext = (): UserContext => {
    const [userInfo, setUserState] = useState<User>(userDefault)
    const [isSyncBaseOn, setIsSyncBaseOn] = useState<boolean>(false)

    const setUser = (user: User) => setUserState(user)

    const setIsSyncOn = () => setIsSyncBaseOn(!isSyncBaseOn)

    const deleteUser = () => setUserState(userDefault)

    const readUserlocalStor = async () => {
        const user = await AsyncStorage.getItem('userInfo')
        if (user) setUserState(JSON.parse(user))
    }

    const saveUserLocalStor = async (user: User) => {
        //console.log('save user', userInfo)
        await AsyncStorage.setItem('userInfo', JSON.stringify(user))
    }

    useEffect(() => {
        readUserlocalStor()
    }, [])

    useEffect(() => {
        saveUserLocalStor(userInfo)
    }, [userInfo])

    useEffect(() => {
        getFiles(userInfo, isSyncBaseOn)
    }, [isSyncBaseOn])
    
    return {
        userInfo,
        setUser,
        deleteUser,
        isSyncBaseOn,
        setIsSyncOn
    };
}

