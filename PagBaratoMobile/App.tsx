import React from 'react';

import { } from 'react-native/Libraries/NewAppScreen';
import { AuthProvider } from './src/contexts/Auth';
import { Router } from './src/routes/Router';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
};

export default App;
