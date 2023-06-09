import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Box, VStack, Divider, Heading, HStack, Center, Stack, Pressable, Modal, Button, Alert, IconButton, CloseIcon } from 'native-base';
import { format } from 'date-fns';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../controller/auth';

const AgendaScreen = ({ navigation }) => {
  const [registro, setRegistro] = useState([]);
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isVoid, setIsVoid] = useState(false);
  const [isFunc, setIsFunc] = useState(false);
  const [func, setFunc] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const url = `http://10.0.0.120/apiRest/agenda/proximos/${user.id}`;
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData.tipo == 'sucesso' && responseData.resposta != 'Sem Resultado') {
          setRegistro(responseData.resposta);
          console.log(responseData.resposta);
        } else if (responseData.resposta == 'Sem Resultado') {
          setIsVoid(true);
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFuncData();
    fetchData();

    const timer = setInterval(fetchData, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [user.id]);

  useEffect(() => {
    if (user.id === func.usuario_id) {
      setIsFunc(true);
    }
  }, [user.id, func.usuario_id]);

  const handleDeleteAgenda = async (id) => {
    try {
      const response = await fetch(`http://10.0.0.120/apiRest/agenda/deletar/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Resposta da API:', response);

      if (response.ok) {
        alert(`Agendamento deletado.`);
        setModalVisible(false);
      } else {
        console.log('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const renderUserItem = ({ item }) => {
    const formattedDate = format(new Date(item.data_hora), 'dd/MM/yyyy');
    const formattedTime = format(new Date(item.data_hora), 'HH:mm');

    const handleNewPress = (itemId) => {
      setSelectedItemId(itemId);
      setModalVisible(true);
    };

    return (
      <Pressable onPress={() => handleNewPress(item.id)}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box height={145} borderRadius="lg" mt={3} border={1} p={2} bg={isPressed ? '#fff' : isHovered ? '#fff' : '#fff'} style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
              <HStack p={3} space={2} alignItems="center">
                <MaterialCommunityIcons name="calendar" size={24} color="#06b6d4" />
                <Text fontSize="2xl" size="xs" color="white">
                  {formattedDate}
                </Text>

                <Divider orientation="vertical" mx={2} bg="#e3e7e8" />

                <MaterialCommunityIcons name="clock-check-outline" size={24} color="#06b6d4" />
                <Text fontSize="2xl" color="white">
                  {formattedTime}
                </Text>
              </HStack>

              <Box bg="#e3e7e8" w="100%" h={0.5}></Box>

              <HStack p={2} space={2} justifyContent="space-between" alignItems="center">
                <VStack>
                {isFunc ? (
                    <React.Fragment>
                        <Heading  size="lg">{item.nm_usuario}</Heading>
                        <Text italic fontSize="2xl" > {item.id_servico}</Text>
                    </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Heading  size="lg">{item.nm_funcionario}</Heading>
                        <Text italic fontSize="2xl" > {item.id_servico}</Text>
                      </React.Fragment>
                )}

                </VStack>

                <Stack>
                  <Heading size="sm">R$ {item.valor},00</Heading>
                </Stack>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
    );
  };

      // AVISO ALERT
      // status: 'success',
      // status: 'error',
      // status: 'info',
      // status: 'warning',
    
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
                             Você ainda não possui agendamentos!
                           
                          </Text>
                        </HStack>
                        <IconButton variant="unstyled" _focus={{ borderWidth: 0 }} icon={<CloseIcon size="3" />} _icon={{ color: 'coolGray.600' }} />
                      </HStack>
                    </VStack>
                  </Alert>
              
        </Box>
      ) : (
        <React.Fragment>
          <Box pl={6} pr={6} mt={1} borderRadius="md" width="full">
            <FlatList data={registro} renderItem={renderUserItem} keyExtractor={(item) => item.id.toString()} />
          </Box>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Opções</Modal.Header>
              <Modal.Body>
               

                <Button
                  leftIcon={<FontAwesome name="trash-o" size={24} color="white" />}
                  bg="#ba2a1a"
                  onPress={() => handleDeleteAgenda(selectedItemId)}
                >
                  Cancelar Agendamento
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button onPress={() => setModalVisible(false)}>Sair</Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </React.Fragment>
      )}
    </Center>
  );
};

export default AgendaScreen;
