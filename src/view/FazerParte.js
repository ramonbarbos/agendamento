import React, { useState, useContext,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Center, Input, Heading, FormControl, VStack, Icon, Button } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import SelectCidade from '../components/SelectCidade';

import { AuthContext } from '../controller/auth';

const FazerParte = () => {
  const [nm_funcionario, setNm_funcionario] = useState('');
  const [nm_cargo, setNm_cargo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState(null);
  const [contato, setContato] = useState('');


  const { user } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleSelectCidade = (value) => {
    setCidade(value.nm_cidade);
  };

  const handleRegister = async () => {
    try {

      const requestBody = {
        usuario_id: user.id,
        nm_funcionario: nm_funcionario,
        nm_cargo:nm_cargo,
        endereco:endereco,
        bairro:bairro,
        cidade:cidade,
        contato:contato
      };

      const response = await fetch('http://10.0.0.120/apiRest/funcionario/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
 

      if (data.tipo === 'sucesso') {

        alert("Solicitação enviada!")
        navigation.navigate("Main");
      } else {
        console.log('Request failed:', data.resposta);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <Center height="full">
      <VStack width="full" p={10}>
        <Heading color="primary.500">
          Solicitação {user.id}
        </Heading>
        <Box width="full">
          <FormControl>
            <Input
              placeholder='Nome'
              size="md"
              variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="user" color="black" />}
                  size={5}
                  ml={2}
                />
              }
              onChangeText={setNm_funcionario}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder='Cargo'
              size="md"
              variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="briefcase" color="black" />}
                  size={5}
                  ml={2}
                />
              }
              onChangeText={setNm_cargo}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder='Endereço'
              size="md"
              variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="map-marker" color="black" />}
                  size={5}
                  ml={2}
                />
              }
              onChangeText={setEndereco}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder='Bairro'
              size="md"
              variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="location-arrow" color="black" />}
                  size={5}
                  ml={2}
                />
              }
              onChangeText={setBairro}
            />
          </FormControl>

          <SelectCidade onValueChange={handleSelectCidade} />

          <FormControl>
            <Input
              placeholder='Contato'
              size="md"
              variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="phone" color="black" />}
                  size={5}
                  ml={2}
                />
              }
              onChangeText={setContato}
            />
          </FormControl>

          <Button size="sm" mt={7} variant="subtle" onPress={() => handleRegister()}>Solicitar</Button>
        </Box>
      </VStack>
    </Center>
  );
};

export default FazerParte;
