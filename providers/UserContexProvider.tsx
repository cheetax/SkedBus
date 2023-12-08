import React, { useEffect, useState, createContext, ReactNode } from "react";
import { ContextProviderProps, Func } from "./models/Models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userAvatar from '../assets/userAvatar.json'
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from "@react-native-google-signin/google-signin";

//import getFiles from '../providers/DriveSaveProvider'

interface UserContext {
    userInfo: User,
    isSyncBaseOn: boolean
    setUser: Func<User>,
    deleteUser: () => void,
    setIsSyncOn: () => void,
    signIn: () => void,
    signOut: () => void
}

const userDefault: User = {
    user: {
        id: '',
        email: '',
        familyName: '',
        givenName: '',
        name: '',
        photo: userAvatar.image
    },
    idToken: null,
    serverAuthCode: ''
}

const userContextDefault: UserContext = {
    userInfo: userDefault,
    isSyncBaseOn: false,
    setUser: () => { },
    deleteUser: () => { },
    setIsSyncOn: () => { },
    signIn: () => { },
    signOut: () => { }
}

const ContextUser = createContext<UserContext>(userContextDefault);

GoogleSignin.configure({
    scopes: [
        //'https://www.googleapis.com/auth/drive.readonly',
        // 'https://www.googleapis.com/auth/drive.appdata'
    ], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '972891890305-2jf1bn92gqhg84nqq517otlscsrj29mu.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access. 
})

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

    const setUser: Func<User> = (user) => setUserState(user)

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

    const signIn = async () => {
        //setUser({ name: 'Дмитрий Гребенев', email: 'dmitriy.grebenev@gmail.com', avatar: 'https://photo-pict.com/wp-content/uploads/2019/05/kartinki-dlya-stima-12.jpg' })

        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            setUser(user);
            console.log(user.idToken)
        } catch (error: any) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    const signOut = async () => {
        try {
            const userSignOut = await GoogleSignin.signOut();
            //console.log(userSignOut)
            if (!userSignOut) {
                if (isSyncBaseOn) setIsSyncOn()
                deleteUser()
            }; // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        readUserlocalStor()
    }, [])

    useEffect(() => {
        saveUserLocalStor(userInfo)
    }, [userInfo])

    // useEffect(() => {
    //     getFiles(userInfo, isSyncBaseOn)
    // }, [isSyncBaseOn])

    return {
        userInfo,
        setUser,
        deleteUser,
        isSyncBaseOn,
        setIsSyncOn,
        signIn,
        signOut
    };
}

