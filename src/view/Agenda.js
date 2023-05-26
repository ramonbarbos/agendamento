import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Box, VStack, Divider } from 'native-base';

const AgendaScreen = ({ navigation }) => {
  const [registro, setRegistro] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://10.0.0.120/apiRest/agenda/listar';
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          setRegistro(responseData.resposta);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const timer = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos

    return () => {
      clearInterval(timer); // Limpa o temporizador quando o componente é desmontado
    };
  }, []);

  const renderUserItem = ({ item }) => (
    <Box border={1} m={10} borderRadius="md" bg="gray.200">
      <VStack space={4} divider={<Divider />}>
        <Text px={4} pt={4}>
          ID: {item.id}
        </Text>
        <Text px={4}>ID Funcionário: {item.id_funcionario}</Text>
        <Text px={4}>ID Usuário: {item.id_usuario}</Text>
        <Text px={4}>Data e Hora: {item.data_hora}</Text>
        <Text px={4} pb={4}>ID Serviço: {item.id_servico} </Text>
        <Text px={4} pb={4}>Valor: {item.valor} </Text>
      </VStack>
    </Box>
  );

  return (
    <View>
      <FlatList
        data={registro}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AgendaScreen;
