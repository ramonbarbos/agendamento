import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

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
    <View style={styles.container}>
      <Text style={styles.title}>Novo Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
        <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
     
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  btn: {
    width: '100%',
    flex:1,
    height: 40,
    backgroundColor:'red',
    marginBottom: 16,
  },

});

export default RegisterScreen;
