import React, { useState, useContext,useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Box, VStack, Divider, Heading, HStack, Center, Stack, Alert,  IconButton, CloseIcon  } from 'native-base';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { format } from 'date-fns'; // Importa a função format da biblioteca date-fns

import { AuthContext } from '../controller/auth';

const AgendaHistory = ({ navigation }) => {
  const [registro, setRegistro] = useState([]);
  const { user } = useContext(AuthContext);
  const [isVoid, setIsVoid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://10.0.0.120/apiRest/agenda/historico/${user.id}`;
      try {
        const response = await fetch(url);
        const responseData = await response.json();

       
        if (responseData.tipo == 'sucesso' && responseData.resposta != 'Sem Resultado') {
          setRegistro(responseData.resposta);
        } else if (responseData.resposta == 'Sem Resultado') {
          setIsVoid(true);
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

      {isVoid ? (
            <Box mt={2} >
                      
            <Alert w="100%" status='info' >
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                        Você ainda não possui historico!          
                    </Text>
                  </HStack>
                  <IconButton variant="unstyled" _focus={{ borderWidth: 0 }} icon={<CloseIcon size="3" />} _icon={{ color: 'coolGray.600' }} />
                </HStack>
              </VStack>
            </Alert>

            </Box>
      ) : (
        <React.Fragment>
          <Box pl={6} pr={6} mt={1}  borderRadius="md" width='full'>
          <FlatList
            data={registro}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </React.Fragment>
        )}

     
    </Center>
  );
};

export default AgendaHistory;
