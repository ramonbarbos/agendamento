import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from "native-base";

// Importe suas telas aqui
import Login from './src/view/Login';
import Register from './src/view/Register';
import MainWithDrawer from './src/view/MainWithDrawer';
import Update from './src/view/Update';
import AgendaHistory from './src/view/AgendaHistory';
import Agenda from './src/view/Agenda';

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
              <Stack.Screen
                name="AgendaHistory" 
                component={AgendaHistory}
              />
              <Stack.Screen
                name="Agenda" 
                component={Agenda}
              />
            </Stack.Navigator>
          </AuthProvider> 
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
