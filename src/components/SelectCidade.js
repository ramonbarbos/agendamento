import React, { useState, useContext, useEffect } from 'react';
import { Box, Select, CheckIcon } from 'native-base';

const SelectCidade = ({ onValueChange }) => {
  const [service, setService] = useState('');
  const [users, setUsers] = useState([]);

  const url = `http://10.0.0.120/apiRest/cidade/listar`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          setUsers(responseData.resposta);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleValueChange = (itemValue) => {
    const user = users.find((item) => item.id === itemValue);

    if (user) {
      const newItem = {
        id: user.id,
        nm_cidade: user.nm_cidade,
      };

      setService(itemValue);
      onValueChange(newItem);
    }
  };

  return (
    <Box mt={5}> 
      <Select
        selectedValue={service}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Cidade"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={handleValueChange}
      >
        {users.map((item) => (
          <Select.Item key={item.id} label={item.nm_cidade} value={item.id} />
        ))}
      </Select>
    </Box>
  );
};

export default SelectCidade;
