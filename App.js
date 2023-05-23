import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from "native-base";

// Importe suas telas aqui
import Login from './src/view/Login';
import Register from './src/view/Register';
import MainWithDrawer from './src/view/MainWithDrawer';
import Update from './src/view/Update';
import Listen from './src/view/Listen';

import AuthProvider from './src/controller/auth'; // Importe o AuthProvider

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
          <AuthProvider> 
            <Stack.Navigator>
              <Stack.Screen 
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Main" 
                component={MainWithDrawer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Update" 
                component={Update}
              />
              <Stack.Screen
                name="Register" 
                component={Register}
              />
            </Stack.Navigator>
          </AuthProvider> 
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
