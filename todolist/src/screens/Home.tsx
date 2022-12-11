import { useState } from 'react';
import { HStack, Image, Input, VStack, Icon, Button, Text, Box, FlatList } from "native-base";
import { Feather } from '@expo/vector-icons';

import logoPng from '@assets/Logo.png';
import ClipboardPng from '@assets/Clipboard.png';

export function Home() {
  const [tasks, setTasks] = useState<string[]>([]);

  return (
    <VStack bg="gray.600" flex={1}>
      <VStack bg="gray.700" mb={6} pt={16} px={6} pb={6} alignItems="center">
        <Image source={logoPng} alt="Todo" />

        <HStack top={12}>
          <Input
            bg="gray.500"
            flex={1}
            h={14}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="white"
            fontFamily="body"
            placeholderTextColor="gray.300"
            _focus={{
              bg: 'gray.500',
              borderWidth: 1,
              borderColor: 'primary.500'
            }}
          />

          <Button bg="secondary.700" p={5} rounded="md" ml={1} _pressed={{ bg: 'secondary.500' }}>
            <Icon as={Feather} name="plus-circle" w={16} h={16} color="white" />
          </Button>
        </HStack>
      </VStack>

      <HStack mt={8} mx={6} pb={5} justifyContent="space-between" borderBottomWidth={1} borderBottomColor="gray.500">
        <HStack alignItems="center">
          <Text fontSize={14} color="secondary.500" fontFamily="heading">Criadas</Text>

          <Box bg="gray.500" px={2} rounded="lg" ml={2}>
            <Text color="white">2</Text>
          </Box>
        </HStack>

        <HStack alignItems="center">
          <Text fontSize={14} color="primary.500" fontFamily="heading">Concluidas</Text>

          <Box bg="gray.500" px={2} rounded="lg" ml={2}>
            <Text color="white">4</Text>
          </Box>
        </HStack>
      </HStack>

      <FlatList
        data={tasks}
        keyExtractor={item => item}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListEmptyComponent={() => (
          <VStack alignItems="center" justifyContent="center" mt={12}>
            <Image source={ClipboardPng} alt="Todo" />
            <Text color="gray.300" fontSize={14} mt={4}>
              <Text fontFamily="heading">Você ainda não tem tarefas cadastradas</Text>{`\n`}
              Crie tarefas e organize seus itens a fazer
            </Text>
          </VStack>
        )}
      />
    </VStack>
  )
}