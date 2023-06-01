import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons ,FontAwesome5 } from '@expo/vector-icons';

import { AuthContext } from '../controller/auth';

import IndexScreen from './Index';
import AgendaScreen from './Agenda';
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
          icon={({ color, size }) => <MaterialIcons name="person" color={color} size={size} />}
        />
        <DrawerItemList {...props} />
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
        name="Home"
        component={IndexScreen}
        options={{
          drawerIcon: ({ color, size, focused }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Novo"
        component={New}
        options={{
          drawerIcon: ({ color, size, focused }) => <FontAwesome5  name="plus-circle" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          drawerIcon: ({ color, size, focused }) => <Icon name="list" color={color} size={size} />,
        }}
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
