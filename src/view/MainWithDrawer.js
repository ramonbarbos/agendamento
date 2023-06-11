import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons ,FontAwesome5,Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../controller/auth';

import IndexScreen from './Index';
import FazerParte from './FazerParte';
import New from './New';

const Drawer = createDrawerNavigator();

const MainWithDrawer = ({ navigation }) => {
  const { user, resetData } = useContext(AuthContext);

  const handleLogout = () => {
    resetData(); // Redefine todos os dados
    navigation.navigate('Login');
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label=""
        />
        <DrawerItemList {...props} />
        <DrawerItem
          label="Ajustes"
          icon={({ color, size }) => <Ionicons  name="settings" color={color} size={size} />}
        />
        <DrawerItem
          label="Sair"
          onPress={handleLogout}
          icon={({ color, size }) => <Icon name="exit" color={color} size={size} />}
        />
       
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator 
      drawerContent={CustomDrawerContent}
      screenOptions={{
      headerTintColor:'white',
      headerStyle:{
        backgroundColor: '#06b6d4'
      }
    }}>
      <Drawer.Screen
        name="Inicio"
        component={IndexScreen}
        options={({ navigation }) => ({
          headerTitle: false,
          headerRight: () => (
            <Icon
              name="notifications" // Ícone de notificação
              type="material" // O tipo de ícone pode variar dependendo do pacote que você está usando
              color="white"
              size={25}
              style={{ marginRight: 14 }} 
              onPress={() => navigation.navigate("Notifications")} // Ajuste a rota correta para as notificações
            />
          ),
          drawerIcon: ({ color, size, focused }) => (
            <Icon name="home" color={color} size={size} />
          ),
        })}
      />
  
      <Drawer.Screen
        name="Fazer parte"
        component={FazerParte}
        options={{
          drawerIcon: ({ color, size, focused }) => <Icon name="star" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainWithDrawer;
