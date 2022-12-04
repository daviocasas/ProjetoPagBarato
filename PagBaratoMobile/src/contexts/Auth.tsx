import React, {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {setAuthTokens} from '../services/storage';

export interface AuthData {
  token: string;
  email: string;
  name: string;
}
interface AuthContextData {
  loading: boolean;
  authData?: AuthData;
  refreshToken: () => Promise<void>;
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
      console.error('refreshToken()', err);
    }
  }

  return (
    <AuthContext.Provider value={{authData, loading, refreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
