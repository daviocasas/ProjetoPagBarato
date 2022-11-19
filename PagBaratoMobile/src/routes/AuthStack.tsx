import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateAccount} from '../screens/CreateAccount/CreateAccount';
import {LoginScreen} from '../screens/LoginScreen/LoginScreen';
import {ForgotPassword} from '../screens/ForgotPassword/ForgotPassword';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
