import React, { useState, useContext, useEffect } from 'react';
import { Box, VStack, Text, HStack, Button, Center, Heading, Stack, Pressable, Badge, Spacer, Flex } from 'native-base';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../controller/auth';
import { useNavigation } from "@react-navigation/native";

const IndexScreen = () => {
  const { user } = useContext(AuthContext);
  const [isHistoricoPressed, setIsHistoricoPressed] = useState(false);
  const [agenda, setAgenda] = useState([]);
  const [func, setFunc] = useState([]);
  const navigation = useNavigation();
  const [isFunc, setIsFunc] = useState(false); // Corrigido: Utilize useState, não somente a função useState

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://10.0.0.120/apiRest/agenda/exiberecente/${user.id}`;

      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          setAgenda(responseData.resposta);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFuncData = async () => {
      const url = `http://10.0.0.120/apiRest/funcionario/verificar/${user.id}`;

      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          setFunc(responseData.resposta);
          // console.log(responseData.resposta)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFuncData();
    fetchData();
  }, []); // Corrigido: Adicionado um array vazio como dependência para o useEffect

  useEffect(() => {
    if (user.id === func.usuario_id) {
      setIsFunc(true);
    }
  }, [user.id, func.usuario_id]); // Corrigido: Adicionado as dependências user.id e func.usuario_id para o segundo useEffect

  const handleNewPress = () => {
    navigation.navigate("Novo");
  };

  const handleHistoricoPress = () => {
    console.log("Histórico pressionado");
    setIsHistoricoPressed(!isHistoricoPressed);
  };

  return (
    <Center width="full">
      <Box width="full" bg={'primary.500'} justifyContent='center' alignItems='center' height={40}>
        <VStack>
          <Heading mt={2} color={'white'} size="md">Olá, {user.nome}</Heading>
        
             {isFunc ? (
                    <Text mt={2} color={'white'}>Voce tem um novo agendamento!</Text>
                  ) : (
                    <React.Fragment>
                      <Text mt={2} color={'white'}>Seu próximo agendamento é no dia:</Text>
                      <Box>
                        <HStack alignItems='center' mt={2}>
                          <MaterialCommunityIcons name="calendar" size={24} color="white" />
                          <Heading color={'white'} size="sm"> {agenda.data_hora} </Heading>
                        </HStack>
                      </Box>
                    </React.Fragment>
            )}


         
         
        </VStack>
      </Box>

      <Box alignItems="center" mt={10}>
        <HStack width={'full'} justifyContent={'space-evenly'} h={'200'}>
          <Pressable onPress={() => handleNewPress()} width={'40%'}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box height={'100%'} bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">

                  <Stack p="4" space={3} alignItems={'center'} height={'100%'} width={'100%'}>
                    <Stack space={2}>
                      <FontAwesome5 name="plus-circle" size={60} color="#06b6d4" />
                    </Stack>
                    <Stack alignItems={'center'} justifyContent={'center'} flexWrap="wrap" space={2}>
                      <Heading fontSize="md">Novo</Heading>
                    </Stack>
                  </Stack>
                </Box>
              );
            }}
          </Pressable>
          <Pressable width={'40%'} >
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box height={'100%'} bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">

                  <Stack p="4" space={3} alignItems={'center'} height={'100%'} width={'100%'}>
                    <Stack space={2}>
                      <MaterialCommunityIcons name="calendar-check-outline" size={60} color="#06b6d4" />
                    </Stack>
                    <Stack alignItems={'center'} justifyContent={'center'} flexWrap="wrap" space={2}>
                      <Heading fontSize="md">Proxima</Heading>
                      <Heading fontSize="md">agenda</Heading>
                    </Stack>
                  </Stack>

                </Box>
              );
            }}
          </Pressable>
        </HStack>
      </Box>

      <Box alignItems="center" mt={10}>
        <HStack width={'full'} justifyContent={'space-evenly'} h={'200'}>
          <Pressable width={'40%'}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box height={'100%'} bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">

                  <Stack p="4" space={3} alignItems={'center'} height={'100%'} width={'100%'}>
                    <Stack space={2}>
                      <MaterialCommunityIcons name="calendar-clock" size={60} color="#06b6d4" />
                    </Stack>
                    <Stack alignItems={'center'} justifyContent={'center'} space={2} flexWrap="wrap">
                      <Heading fontSize="md">Histórico</Heading>
                      <Heading fontSize="md">agenda</Heading>
                    </Stack>

                  </Stack>
                </Box>
              );
            }}
          </Pressable>
          <Pressable width={'40%'}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box height={'100%'} bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">

                  <Stack p="4" space={3} alignItems={'center'} height={'100%'} width={'100%'}>
                    <Stack space={2}>
                      <FontAwesome name="wechat" size={60} color="#06b6d4" />
                    </Stack>
                    <Stack alignItems={'center'} justifyContent={'center'} flexWrap="wrap" space={2}>
                      <Heading fontSize="md">Chat</Heading>
                    </Stack>
                  </Stack>

                </Box>
              );
            }}
          </Pressable>
        </HStack>
      </Box>

    </Center>
  );
};

export default IndexScreen;
