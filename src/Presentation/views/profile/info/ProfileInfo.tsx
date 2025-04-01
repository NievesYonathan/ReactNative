import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../../../../../App";
import useviewModel from "./ViewModel"

interface Props extends StackScreenProps<RootStackParamList, 'ProfileInfoScreen'> {};

export const ProfileInfoScreen = ({ navigation, route }: Props) => {
    
    const { removeSession } = useviewModel();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button
            onPress={() => {
                removeSession();
            navigation.navigate('HomeScreen');
            }}
            title="Cerrar Sessión"
            />
        </View>
    )
}
            