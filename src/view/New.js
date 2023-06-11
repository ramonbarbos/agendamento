import React, { useState, useContext } from 'react';
import { Box, VStack, Text, HStack, Button, Center } from 'native-base';
import SelectFunc from '../components/SelectFunc';
import SelectServico from '../components/SelectServico';
import DataTime from '../components/DataTime';

import { AuthContext } from '../controller/auth';


const New = () => {
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [selectedServ, setSelectedServ] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSelectFunc = (value) => {
    setSelectedFunc(value);
  };

  const handleSelectServ = (value) => {
    setSelectedServ(value);

  };

  const handleDateTimeSelected = (selectedDateTime) => {
    setSelectedDateTime(selectedDateTime);
    
  };

  const handleAgendar = async () => {
  
    if (selectedFunc && selectedServ && selectedDateTime) {
      
        const requestBody = {
          id_funcionario: selectedFunc.id,
          nm_funcionario: selectedFunc.nm_funcionario,
          id_usuario: user.id,
          nm_usuario: user.nome,
          data_hora: selectedDateTime,
          id_servico: selectedServ.nm_servico,
          valor: selectedServ.valor
        };
  
        const response = await fetch('http://10.0.0.120/apiRest/agenda/cadastrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();

        if (responseData.tipo === 'sucesso') {
          alert("Agendado");
          //navigation.navigate('Login')
        } else {
          console.log('Request failed:', responseData.resposta);
        }
      
    } else {
      alert(
        `Não é possível agendar sem completar as informações.`
      );
    }
  };

  return (
    <Center width="full" h={'100%'} >
     
      <Box  w={'80%'} >
        <SelectFunc mt={2} onValueChange={handleSelectFunc} />
        <SelectServico onValueChange={handleSelectServ}/>
        <DataTime onDateTimeSelected={handleDateTimeSelected} />
      </Box>

     
      <Button w={'80%'} size="sm" mt={7} variant="subtle" onPress={handleAgendar}>
        Agendar 
      </Button>
      
    </Center>
    
  );
};

export default New;
