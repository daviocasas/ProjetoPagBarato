import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import Feather from 'react-native-vector-icons/Feather';

import { color } from '../config/theme.json';




const Tab = createBottomTabNavigator();

export default function AppTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBarOptions={{
                activeTintColor: '#47E181',
                inactiveTintColor: '#666666',
                activeBackgroundColor: '#f3f3f3',
                inactiveBackgroundColor: '#f3f3f3',

            }}

        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Feather name="home" size={22} />
                    ),
                }}

            />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: () => (
                        <Feather name="user" size={22} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}