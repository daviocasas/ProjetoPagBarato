import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { ProductMapScreen } from '../screens/ProductMapScreen/ProductMapScreen';

import Feather from 'react-native-vector-icons/Feather';

import { color } from '../config/theme.json';




const Tab = createBottomTabNavigator();

export default function AppTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#367315',
                tabBarInactiveTintColor: '#666666',
                tabBarActiveBackgroundColor: '#f3f3f3',
                tabBarInactiveBackgroundColor: '#f3f3f3',
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
                name="Mapa"
                component={ProductMapScreen}
                options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: () => (
                        <Feather name="user" size={22} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}