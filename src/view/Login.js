import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.0.120/apiRest/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: user,
          senha: pass,
        }),
      });
  
      const data = await response.json();
  
      // Verifique a resposta da API para determinar o sucesso do login
      if (data.tipo === 'sucesso') {
        // Login bem-sucedido, faça o redirecionamento
        alert(data.resposta.mensagem);
        navigation.navigate('Main');
      } else {
        // Exiba uma mensagem de erro ao usuário
        alert('Login inválido. Verifique suas credenciais.');
      }
    } catch (error) {
      // Ocorreu um erro na requisição
      console.error('Erro de login:', error);
      alert('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    }
  };
  

  const handleCadastrar = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />
      <Button style={styles.btn} title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={handleCadastrar} />
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
    flex: 1,
    height: 40,
    backgroundColor: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;
