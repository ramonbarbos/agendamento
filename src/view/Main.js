import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { Ionicons,MaterialIcons,Entypo } from '@expo/vector-icons';


const MainScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = `http://10.0.0.120/apiRest/usuarios/listar`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          setUsers(responseData.resposta);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, );

  const handleDelete = async (id, user) => {

    console.log(id)

    try {
 
      const response = await fetch(`http://10.0.0.120/apiRest/usuarios/deletar/${id}`, {
        method: 'DELETE', // Utilize o método correto para atualização de dados
        headers: {
          'Content-Type': 'application/json',
        }
        
      });
  
      console.log('Resposta da API:', response);
  
      if (response.ok) {
        alert(`o Usuario ${user} foi deletado.`);
        navigation.navigate('Main');
      } else {
        console.log('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  const renderUserItem = ({ item }) => (
    <View style={styles.content}>
      <View style={styles.list} >
        <View  >
          <Text  style={styles.text} >Login: {item.login}</Text>
          <Text style={styles.text}>Senha: {item.senha}</Text>
        </View>
        <View style={styles.icons}  >


          <TouchableOpacity style={styles.button}
             onPress={() => navigation.navigate('Update',
              {
                 userId: item.id,
                 userLogin: item.login,
                 userSenha: item.senha
                 })}
             >
              <Entypo name="edit" size={30} color="blue" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() =>  handleDelete(item.id, item.login)}>
            <MaterialIcons name="delete-forever" size={30} color="red" />
          </TouchableOpacity>


        </View>

  
      </View>
      <View style={styles.line}></View>

    </View>

  );

  return (
    <View  style={styles.container}>
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },

  content:{
    width:'100%',
    height:100,
  },
  list:{
    height:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    flex: 1,
    flexDirection: 'row'

  },
  line:{
    width:'100%',
    height:2,
    backgroundColor:'grey'
  },
  text:{
    fontSize:25,
    fontWeight: '600'
  }
});

export default MainScreen;
