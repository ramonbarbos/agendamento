import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const UpdateScreen = () => {
  
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params.userId; 
  const userLogin = route.params.userLogin; 
  const userSenha = route.params.userSenha; 

  const handleUpdate = async () => {
    try {
      // Lógica para atualizar o usuário com o ID fornecido
      console.log(userId, login, senha);

      if(login == '' && senha == '' ){
        putLogin = userLogin
        putSenha = userSenha
      }else if(login == '' ){
        console.log('Login está vazio');
        putLogin = userLogin
        putSenha = senha


      }else if(senha == ''){
        console.log('Senha está vazio');
        putSenha = userSenha
        putLogin = login

      }else{
        putLogin = login
        putSenha = senha
      }
  
      const requestBody = {
        login: putLogin,
        senha: putSenha,
      };
  
      const response = await fetch(`http://10.0.0.120/apiRest/usuarios/atualizar/${userId}`, {
        method: 'PUT', // Utilize o método correto para atualização de dados
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
  
      if (response.ok) {
        alert("Atualizado.");
        navigation.navigate('Main');
      } else {
        console.log('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Usuario</Text>
      <TextInput
        style={styles.input}
        value={userId}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder={userLogin}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder={userSenha}
        secureTextEntry
        onChangeText={setSenha}
      />

      <Button title="Atualizar" onPress={handleUpdate} />
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
});

export default UpdateScreen;
