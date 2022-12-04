import React from 'react';
import {enableLatestRenderer} from 'react-native-maps';

import { AuthProvider } from './src/contexts/Auth';
import { Router } from './src/routes/Router';

enableLatestRenderer();

const App = ({ navigation, route }) => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
};

export default App;
