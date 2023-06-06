import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Box, VStack, Divider, Heading, HStack, Center, Stack } from 'native-base';
import { format } from 'date-fns'; // Importa a função format da biblioteca date-fns
import { MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';


import { AuthContext } from '../controller/auth';

const AgendaScreen = ({ navigation }) => {
  const [registro, setRegistro] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://10.0.0.120/apiRest/agenda/proximos/${user.id}`;
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
      <Box height={145} borderRadius="lg" bg="#fff" mt={3} border={1} p={2}>

        
        
  
      <HStack p={3} space={2} alignItems={'center'}>
          <MaterialCommunityIcons name="calendar" size={24} color="#06b6d4" />
          <Text fontSize="2xl" size="xs" color="white">{formattedDate}</Text>

        <Divider orientation="vertical" mx={2} bg={'#e3e7e8'}/>
          
         <MaterialCommunityIcons name="clock-check-outline" size={24} color="#06b6d4" />
          <Text fontSize="2xl" color="white"> {formattedTime}</Text>
          
      </HStack>

      <Box bg="#e3e7e8" w={'100%'} h={0.5}></Box> 

    <HStack p={2} space={2} justifyContent={'space-between'}  alignItems={'center'}>
      <VStack  >
        <Heading  size="lg">{item.nm_funcionario}</Heading>
        <Text italic fontSize="2xl" > {item.id_servico}</Text>
      </VStack>

        <Stack>
        <Heading  size="sm">R$ {item.valor},00</Heading>

        </Stack>
      </HStack>
    </Box>
    );
  };

  return (
    <Center>
      <Box pl={6} pr={6} mt={1}  borderRadius="md" width='full'>
        <FlatList
          data={registro}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Box>
    </Center>
  );
};

export default AgendaScreen;
