import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Box, Center, Select, CheckIcon, Button } from 'native-base';

import { AuthContext } from '../controller/auth';

const SelectServico = ({ onValueChange }) => {
  const { user, nome } = useContext(AuthContext);
  const [service, setService] = useState('');
  const [users, setUsers] = useState([]);


  const url = `http://10.0.0.120/apiRest/servico/listar`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          setUsers(responseData.resposta);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleValueChange = (itemValue) => {
    setService(itemValue);
    onValueChange(itemValue);
  };

  return (
    <Box>
      <Select
        selectedValue={service}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Serviços"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={handleValueChange}
      >
        {users.map((item) => (
          <Select.Item key={item.id} label={item.nm_servico} value={item.id} />
        ))}
      </Select>
    </Box>
  );
};

export default SelectServico;
