import React, { useState, useContext, useEffect } from 'react';
import { Ionicons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Box, Center, Select, CheckIcon, Button, VStack,Text, HStack } from 'native-base';


import SelectFunc from '../components/SelectFunc';
import SelectServico from '../components/SelectServico';

const IndexScreen = () => {
  const [selectedFunc, setSelectedFunc] = useState('');
  const [selectedServ, setSelectedServ] = useState('');


  const handleSelectFunc = (value) => {
    setSelectedFunc(value);
    console.log("ID Servidor:", selectedFunc)

  };
  const handleSelectServ = (value) => {
    setSelectedServ(value);
    console.log("ID Serviço:", selectedServ)

  };

  const handleAgendar = () => {
    console.log("Agendado")

  };


  return (
    <Center width="full">
      <Box>
        <SelectFunc onValueChange={handleSelectFunc} />
        <SelectServico  onValueChange={handleSelectServ}/>
    
      </Box>

      <Box  minWidth="200">
        <HStack justifyContent={'space-between'}>
          <Text color="primary.500" >Servidor:</Text>
          <Text color="primary.500">{selectedFunc}</Text>
        </HStack>

        <HStack mt={5} justifyContent={'space-between'}>
          <Text color="tertiary.400" >Serviço:</Text>
          <Text color="tertiary.400">{selectedServ}</Text>
        </HStack>
      </Box>

      

      <Button size="sm" mt={7} variant="subtle" onPress={() => handleAgendar()}>
          Agendar
        </Button>
    </Center>
  );
};



export default IndexScreen;
