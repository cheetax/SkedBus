//android: '972891890305-2jf1bn92gqhg84nqq517otlscsrj29mu.apps.googleusercontent.com'

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';
//import { useFormik } from "formik";
import { Button, Appbar, Text, useTheme, MD3Theme as Theme, Avatar, Switch } from 'react-native-paper';
//import { InputField } from "./InputField";
//import { useUserContext } from "../providers/UserContexProvider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../typesNavigation";
//import { GoogleSignin, GoogleSigninButton, statusCodes, User } from "@react-native-google-signin/google-signin";
import SyncBaseCloud from "./DriveSaveProvider";


type Props = DrawerScreenProps<RootStackParamList, 'FormProfile'>

interface LoginViewProps {
    onPress: () => void
}

// interface ProfileViewProps {
//     user: User,
//     isSyncBaseOn: boolean,
//     onSyncBaseOn: () => void,
//     theme?: Theme
//     onPress?: () => void
// }
// const ProfileView = (props: ProfileViewProps) => {
//     const {
//         user,
//         theme = useTheme(),
//         onPress,
//         isSyncBaseOn,
//         onSyncBaseOn
//     } = props

//     return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
//         <Avatar.Image
//             source={{ uri: user.user.photo ?? '' }}
//             style={{ backgroundColor: theme?.colors.surfaceVariant, marginBottom: 16 }}
//             size={160}
//         />
//         <Text style={{ marginBottom: 4 }} variant="titleLarge" >{user.user.name}</Text>
//         <Text variant="bodyMedium" >{user.user.email}</Text>
//         {/* <View style={Style.stackRow}>
//             <Text variant="bodyMedium" >Синхронизация с облаком</Text>
//             <Switch value={isSyncBaseOn} onValueChange={onSyncBaseOn} />
//         </View> */}
//         <SyncBaseCloud/>
//         <Button mode="contained" style={{ marginTop: 16 }} onPress={props.onPress} >Выйти </Button>
//         {/* <Button mode="contained" onPress={() => GetFiles(user)}>+</Button> */}
//     </View>
// }

const LoginView = (props: LoginViewProps) => {

    const theme = useTheme()

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={theme.dark ? GoogleSigninButton.Color.Dark : GoogleSigninButton.Color.Light}
            onPress={props.onPress}
        //disabled={this.state.isSigninInProgress}
        /> */}
    </View>
}

const FormProfile = ({ navigation }: Props) => {

   // const { userInfo, setUser, deleteUser, isSyncBaseOn, setIsSyncOn, signIn, signOut } = useUserContext()
    // const [userInfo, setUserInfo] = useState<User>(),
    const theme = useTheme()

    // GoogleSignin.configure({
    //     scopes: [
    //         //'https://www.googleapis.com/auth/drive.readonly',
    //         // 'https://www.googleapis.com/auth/drive.appdata'
    //     ], // what API you want to access on behalf of the user, default is email and profile
    //     webClientId: '972891890305-2jf1bn92gqhg84nqq517otlscsrj29mu.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access. 
    // })

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

            {/* {userInfo.idToken ?
                <ProfileView
                    user={userInfo}
                    onPress={() => signOut()}
                    isSyncBaseOn={isSyncBaseOn}
                    onSyncBaseOn={setIsSyncOn} /> :
                <LoginView onPress={() => signIn()} />
            } */}

        </View>
    )
}

const Style = StyleSheet.create({
    stackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
        //flex: 1
    }
})

export default FormProfile