import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import {  Box, Center, Input, Heading, FormControl, VStack, Icon,Button, Checkbox, HStack,Image} from "native-base";

import { FontAwesome , Entypo, MaterialIcons } from '@expo/vector-icons';

import SelectCidade from '../components/SelectCidade';

const RegisterScreen = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState(null);

  const navigation = useNavigation();


  

  const handleSelectCidade = (value) => {
    setCidade(value.nm_cidade);
  };

  const handleRegister = async () => {
    console.log(login, senha,nome,cidade);

    try {
      const requestBody = {
        login: login,
        senha: senha,
        nome: nome,
        cidade: cidade
      };

      const response = await fetch('http://10.0.0.120/apiRest/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('Resposta da API:', responseData);


      if (responseData.tipo == 'sucesso') {
        alert("Cadastrado. Faça seu Login!")
        navigation.navigate('Login')
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
          <FormControl>
            <Input
              placeholder='Nome'
              size="md" variant="underlined"
              mt={5}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="tag" color="black" />}
                  size={5}
                  ml={2}
                />
                  }
                  onChangeText={setNome}
            />
            
          </FormControl>


          <SelectCidade  onValueChange={handleSelectCidade}/>
            
          <Button size="sm" mt={7}  variant="subtle"  onPress={() => handleRegister()} >Criar</Button>

        </Box>
      </VStack>
    </Center>
  );
};


export default RegisterScreen;
