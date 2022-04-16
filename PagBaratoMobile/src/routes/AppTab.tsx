import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { PostProductScreen } from '../screens/PostProductScreen/PostProductScreen';


const Tab = createBottomTabNavigator();

export default function AppTab() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="PostProductScreen" component={PostProductScreen} />
        </Tab.Navigator>
    );
}