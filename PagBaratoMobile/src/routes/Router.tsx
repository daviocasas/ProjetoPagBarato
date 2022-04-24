import React, { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { useAuth } from '../contexts/Auth';
import { AppDrawer } from './AppDrawer';

export function Router() {
    const { authData, loading } = useAuth();

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((_user) => {
            setUser(_user);
        });

        return unsubscribe;
    }, [])

    if (loading) {
        return (
            <View>
                <Text>Carregando</Text>
            </View>
        )
    }
    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}