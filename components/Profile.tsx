//android: '972891890305-2jf1bn92gqhg84nqq517otlscsrj29mu.apps.googleusercontent.com'

import React, { useEffect, useState } from "react";
import { View } from 'react-native';
//import { useFormik } from "formik";
import { Button, Appbar, Text, useTheme, MD3Theme as Theme, Avatar } from 'react-native-paper';
//import { InputField } from "./InputField";
import { useUserContext } from "../providers/UserContexProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from "@react-native-google-signin/google-signin";
import  GetFiles from '../providers/DriveSaveProvider'

type Props = DrawerScreenProps<RootStackParamList, 'FormProfile'>

interface LoginViewProps {
    onPress: () => void
}

interface ProfileViewProps {
    user: User,
    theme?: Theme
    onPress?: () => void
}
const ProfileView = (props: ProfileViewProps) => {
    const {
        user,
        theme = useTheme(),
        onPress
    } = props

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Avatar.Image
            source={{ uri: user.user.photo ?? '' }}
            style={{ backgroundColor: theme?.colors.surfaceVariant, marginBottom: 16 }}
            size={160}
        />
        <Text style={{ marginBottom: 4 }} variant="titleLarge" >{user.user.name}</Text>
        <Text variant="bodyMedium" >{user.user.email}</Text>
        <Button mode="contained" style={{ marginTop: 16, marginBottom: 8 }} onPress={props.onPress} >Выйти </Button>
        <Button mode="contained" onPress={() => GetFiles(user)}>Синхронизировать</Button>
    </View>
}

const LoginView = (props: LoginViewProps) => {

    const theme = useTheme()

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={theme.dark ? GoogleSigninButton.Color.Dark : GoogleSigninButton.Color.Light}
            onPress={props.onPress}
        //disabled={this.state.isSigninInProgress}
        />
    </View>
}

const FormProfile = ({ navigation }: Props) => {

    const { userInfo, setUser, deleteUser } = useUserContext()
    // const [userInfo, setUserInfo] = useState<User>()
    const theme = useTheme()

    GoogleSignin.configure({
        scopes: [
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/drive.appdata'
        ], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '972891890305-2jf1bn92gqhg84nqq517otlscsrj29mu.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access. 
    })

    const signIn = async () => {
        //setUser({ name: 'Дмитрий Гребенев', email: 'dmitriy.grebenev@gmail.com', avatar: 'https://photo-pict.com/wp-content/uploads/2019/05/kartinki-dlya-stima-12.jpg' })

        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            setUser(user);
            //console.log((await GoogleSignin.getTokens()).accessToken)
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
            await GoogleSignin.signOut();
            deleteUser(); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }

    //console.log(theme.dark)
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.surface }} >
            <Appbar.Header>
                <Appbar.Action
                    icon='arrow-left'
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title={
                        <Text
                            variant='titleLarge'>Профиль</Text>}
                />
            </Appbar.Header>

            {userInfo.idToken ?
                <ProfileView user={userInfo} onPress={signOut} /> :
                <LoginView onPress={() => signIn()} />
            }

        </View>
    )
}

export default FormProfile