import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerContentOptions } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'; // Importe o pacote de ícones que você está usando
import { MaterialIcons } from '@expo/vector-icons';

import IndexScreen from './Index';
import ListenScreen from './Listen';
import UpdateScreen from './Update';
import AgendaScreen from './Agenda';


const Drawer = createDrawerNavigator();

const MainWithDrawer = ({ navigation }) => {
  const handleLogout = () => {
    // Implemente a lógica de logout aqui, como limpar o token de autenticação ou redefinir o estado do aplicativo.
    // Após o logout, você pode navegar para a tela de login ou qualquer outra tela necessária.
    navigation.navigate('Login');
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
         <DrawerItem
        label=""
        icon={({ color, size }) => <MaterialIcons name="person" color={color} size={size} />}
      />
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sair"
          onPress={handleLogout}
          icon={({ color, size }) => <Icon name="exit" color={color} size={size} />} // Adicione o ícone ao item "Sair"
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Home"
        component={IndexScreen}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Listagem"
        component={ListenScreen}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />


   
    </Drawer.Navigator>
  );
};




export default MainWithDrawer;