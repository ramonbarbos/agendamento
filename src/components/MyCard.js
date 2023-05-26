import React from 'react';
import { VStack, Box, Divider } from 'native-base';

const MyCard = () => {
  return (
    <Box border={9} m={10} borderRadius="md" bg="amber.100"> {/* Adicionado bg="gray.200" para definir a cor de fundo */}
    <VStack space={4} divider={<Divider />}>
      <Box px={4} pt={4}>
        NativeBase
      </Box>
      <Box px={4}>
        NativeBase is a free and open source framework that enable developers
        to build high-quality mobile apps using React Native iOS and Android
        apps with a fusion of ES6.
      </Box>
      <Box px={4} pb={4}>
        GeekyAnts
      </Box>
    </VStack>
  </Box>
  );
}

export default MyCard;