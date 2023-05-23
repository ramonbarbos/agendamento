import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import {  Box, Center, Input, Heading, FormControl, VStack, Icon,Button, Checkbox, HStack,Image} from "native-base";

import { FontAwesome , Entypo, MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();


  const handleRegister = async () => {
    console.log(login, senha);

    try {
      const requestBody = {
        login: login,
        senha: senha,
      };

      const response = await fetch('http://10.0.0.120/apiRest/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Resposta da API:', response);

      if (response.ok) {
        alert("Cadastrado. Faça seu Login!")
        navigation.navigate('Login')

        // Lógica para lidar com a resposta da API
      } else {
        console.log('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };



  return (
    <Center height="full">
     

      <VStack width="full" p={10}>
        <Heading color="primary.500">
            Criar conta
        </Heading>
        <Box width="full">
          <FormControl>
            <Input
              placeholder='Login'
              size="md" variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="user" color="black" />}
                  size={5}
                  ml={2}
                />
                  }
                  onChangeText={setLogin}

            />
            
          </FormControl>

          <FormControl>
            <Input
              placeholder='Senha'
              size="md" variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="lock" color="black" />}
                  size={5}
                  ml={2}
                />
                  }
                  onChangeText={setSenha}

            />
            
          </FormControl>
            
          <Button size="sm" mt={7}  variant="subtle"  onPress={() => handleRegister()} >Criar</Button>

        </Box>
      </VStack>
    </Center>
  );
};


export default RegisterScreen;
