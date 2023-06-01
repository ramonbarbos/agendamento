import React, { useState, useContext } from 'react';
import { Box, VStack, Text, HStack, Button, Center, Heading, Stack, Pressable,Badge,Spacer,Flex } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../controller/auth';

const IndexScreen = () => {
  const { user } = useContext(AuthContext);
  const [isAgendaPressed, setIsAgendaPressed] = useState(false);
  const [isHistoricoPressed, setIsHistoricoPressed] = useState(false);

  const handleAgendaPress = () => {
    console.log("Agenda pressionada");
    setIsAgendaPressed(!isAgendaPressed);
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
          <Text mt={2} color={'white'}>Seu próximo agendamento é no dia:</Text>
          <HStack alignItems='center' mt={2}>
            <MaterialCommunityIcons name="calendar" size={24} color="white" />
            <Heading color={'white'} size="sm"> 01/01/2023</Heading>
          </HStack>
        </VStack>
      </Box>
      <Box alignItems="center" mt={10}>
        <HStack width={'full'} justifyContent={'space-evenly'}  p={1}>
        <Pressable width={'45%'} >
              {({
              isHovered,
              isFocused,
              isPressed
            }) => {
              return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                  
                  
                  <Stack p="4" space={3} alignItems={'center'} width={'100%'}>
                    <Stack space={2}>
                      <MaterialCommunityIcons name="calendar-cursor" size={60} color="#06b6d4" />
                    </Stack>
                    <Stack alignItems={'center'} space={2}>
                      <Heading size="md" ml="-1">Próxima</Heading>
                      <Heading size="md" ml="-1">agenda</Heading>
                    </Stack>
                  </Stack>
                  </Box>;
            }}
            </Pressable>
                <Pressable width={'45%'} >
              {({
              isHovered,
              isFocused,
              isPressed
            }) => {
              return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                  
                  
                  <Stack p="4" space={3} alignItems={'center'} width={'100%'}>
                    <Stack space={2}>
                      <MaterialCommunityIcons name="calendar-clock" size={60} color="#06b6d4" />
                    </Stack>
                    <Stack alignItems={'center'} space={2}>
                      <Heading size="md" ml="-1">Histórico</Heading>
                      <Heading size="md" ml="-1">da agenda</Heading>
                    </Stack>
                  </Stack>
                    
                  </Box>;
            }}
            </Pressable>
        </HStack>
      </Box>
    </Center>
  );
};

export default IndexScreen;
