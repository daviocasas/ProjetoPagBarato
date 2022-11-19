import React, {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {authService} from '../services/authService';
import auth from '@react-native-firebase/auth';
import {setAuthTokens} from '../services/storage';

export interface AuthData {
  token: string;
  email: string;
  name: string;
}
interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuth] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
  }, []);

  async function loadFromStorage() {
    const auth = await AsyncStorage.getItem('@AuthData');
    if (auth) setAuth(JSON.parse(auth) as AuthData);
    setLoading(false);
  }

  async function refreshToken() {
    try {
      if (auth().currentUser) {
        const idTokenResult = await auth().currentUser?.getIdTokenResult();
        if (idTokenResult) setAuthTokens(idTokenResult.token, '');
      }
    } catch (err) {
      console.log('refreshToken()', err);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const auth = await authService.signIn(email, password);
      AsyncStorage.setItem('@AuthData', JSON.stringify(auth));
      setAuth(auth);
      return auth;
    } catch (error) {
      Alert.alert(error.message, 'Tente novamente');
    }
  }
  async function signOut(): Promise<void> {
    setAuth(undefined);
    AsyncStorage.removeItem('@AuthData');
  }
  return (
    <AuthContext.Provider
      value={{authData, loading, signIn, signOut, refreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
