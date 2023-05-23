import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';


import { AuthContext } from '../controller/auth';


const IndexScreen = () => {
  const { user, nome } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Criador {nome}</Text>
      <Text>Seja bem Vindo {user.login}</Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    width: '100%',
    height: 100,
  },
  list: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
  },
});

export default IndexScreen;
