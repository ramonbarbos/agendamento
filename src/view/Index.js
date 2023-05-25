import React, { useState } from 'react';
import { Box, VStack, Text, HStack, Button, Center } from 'native-base';
import SelectFunc from '../components/SelectFunc';
import SelectServico from '../components/SelectServico';

import DataTime from '../components/DataTime';

const IndexScreen = () => {
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [selectedServ, setSelectedServ] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleSelectFunc = (value) => {
    setSelectedFunc(value);
    console.log("ID Servidor:", value.id); // Acessa o id selecionado
    console.log("Login:", value.nm_funcionario); // Acessa o login selecionado
  };

  const handleSelectServ = (value) => {
    setSelectedServ(value);
    console.log("ID Serviço:", value.id); // Acessa o id selecionado
    console.log("Serviço:", value.nm_servico); // Acessa o login selecionado
    console.log("Valor:", value.valor); // Acessa o login selecionado
  };

  const handleDateTimeSelected = (selectedDateTime) => {
    setSelectedDateTime(selectedDateTime);
    console.log('Data e hora selecionadas:', selectedDateTime);
  };

  const handleAgendar = () => {
    console.log("Agendado");
    if (selectedFunc && selectedServ && selectedDateTime) {
      alert(
        `Funcionário: ${selectedFunc.nm_funcionario}\nServiço: ${selectedServ.nm_servico}\nValor: R$ ${selectedServ.valor}\nData e Hora: ${selectedDateTime}`
      );
    } else {
      alert(
        `Não é possível agendar sem completar as informações.`
      );
    }
  };

  return (
    <Center width="full">
      <Box>
        <SelectFunc onValueChange={handleSelectFunc} />
        <SelectServico onValueChange={handleSelectServ}/>
        <DataTime onDateTimeSelected={handleDateTimeSelected} />
      </Box>

      <Box mt={5} minWidth="200">
        <HStack justifyContent="space-between">
          <Text color="primary.500">Servidor:</Text>
          <Text color="primary.500">{selectedFunc ? selectedFunc.nm_funcionario : '-'}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color="primary.500">Serviço:</Text>
          <Text color="primary.500">{selectedServ ? selectedServ.nm_servico : '-'}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color="primary.500">Valor:</Text>
          <Text color="primary.500">R$ {selectedServ ? selectedServ.valor : '-'}</Text>
        </HStack>
      </Box>

      <Button size="sm" mt={7} variant="subtle" onPress={handleAgendar}>
        Agendar
      </Button>
    </Center>
  );
};

export default IndexScreen;
