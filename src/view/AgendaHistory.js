import React, { useState, useContext,useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Box, VStack, Divider, Heading, HStack, Center } from 'native-base';

import { format } from 'date-fns'; // Importa a função format da biblioteca date-fns

import { AuthContext } from '../controller/auth';

const AgendaHistory = ({ navigation }) => {
  const [registro, setRegistro] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://10.0.0.120/apiRest/agenda/historico/${user.id}`;
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
  }, [user.id]);

  const renderUserItem = ({ item }) => {
    // Formata a data e hora usando a função format da biblioteca date-fns
    const formattedDate = format(new Date(item.data_hora), 'dd/MM/yyyy');
    const formattedTime = format(new Date(item.data_hora), 'HH:mm');

    return (
      <Center borderRadius="lg" bg="amber.300" mt={3} border={1}>
        <Box height={40}>
          <HStack mt={4}>
            <VStack space={1}>
              <Heading size="xs" color="white">{item.nm_funcionario}</Heading>
              <Text color="white">Local</Text>
            </VStack>
          </HStack>
  
          <VStack mt={5}>
            <Heading size="xs" color="white">{item.nm_usuario}</Heading>
          </VStack>
  
          <HStack mt={2}>
            <VStack space={1}>
              <Text color="white">Data</Text>
              <Heading size="xs" color="white">{formattedDate}</Heading>
            </VStack>
            <Divider orientation="vertical" mx={2} />
            <VStack space={1}>
              <Text color="white">Preço</Text>
              <Heading size="xs" color="white">R$ {item.valor},00</Heading>
            </VStack>
          </HStack>
        </Box>
      </Center>
    );
  };

  return (
    <Center>
      <Box p={8} m={1} borderRadius="md" width='full'>
        <FlatList
          data={registro}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Box>
    </Center>
  );
};

export default AgendaHistory;
