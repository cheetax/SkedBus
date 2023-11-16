import React, { ReactNode } from "react";
import { TextInput, TextInputProps } from 'react-native-paper';

export const InputField = (props: TextInputProps): ReactNode => <TextInput
    keyboardType="numeric"
    style={{ marginTop: 8 }}
    contentStyle={{ height: 56 }}
    outlineStyle={{ backgroundColor: 'none' }}
    mode="outlined"
    {...props}
/>

