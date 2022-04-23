import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';




const Tab = createBottomTabNavigator();

export default function AppTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}