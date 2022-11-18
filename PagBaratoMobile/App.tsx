import React from 'react';

import { AuthProvider } from './src/contexts/Auth';
import { Router } from './src/routes/Router';

const App = ({ navigation, route }) => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
};

export default App;
