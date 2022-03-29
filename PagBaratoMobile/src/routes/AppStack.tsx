import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { PostProductScreen } from '../screens/PostProductScreen/PostProductScreen';

const Stack = createNativeStackNavigator();

export function AppStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PostProductScreen" component={PostProductScreen} />
        </Stack.Navigator>
    );
}

