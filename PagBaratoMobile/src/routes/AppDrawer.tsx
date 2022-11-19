import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {PostProductScreen} from '../screens/PostProductScreen/PostProductScreen';

const Drawer = createDrawerNavigator();

export function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="PostProductScreen" component={PostProductScreen} />
    </Drawer.Navigator>
  );
}
