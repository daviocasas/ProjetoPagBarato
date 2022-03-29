import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { useAuth } from '../contexts/Auth';

export function Router() {
    const { authData, loading } = useAuth();
    if (loading) {
        return (
            <View>
                <Text>Carregando</Text>
            </View>
        )
    }
    return (
        <NavigationContainer>
            {authData ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}