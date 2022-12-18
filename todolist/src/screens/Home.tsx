import { useState, useCallback, useEffect, useRef } from 'react';
import {
  HStack,
  Image,
  Input,
  VStack,
  Icon,
  Button,
  Text,
  Box,
  FlatList,
  Checkbox,
  useToast
} from "native-base";
import { TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import logoPng from '@assets/Logo.png';
import ClipboardPng from '@assets/Clipboard.png';

import { AppError } from '@utils/AppError';

import { ITask } from '@storage/task/ITask';
import { taskCreate } from '@storage/task/taskCreate';
import { taskGetAll } from '@storage/task/taskGetAll';
import { taskRemove } from '@storage/task/taskRemove';
import { taskUpdate } from '@storage/task/taskUpdate';

export function Home() {
  const toast = useToast();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskName, setTaskName] = useState('');

  const inputRef = useRef<TextInput>(null);

  const handleGetTasks = useCallback(async () => {
    try {
      const storagedTasks = await taskGetAll();
      setTasks(storagedTasks);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreateTask = useCallback(async () => {
    if (!taskName.trim().length) {
      return toast.show({
        title: 'Informe um nome de tarefa válido.',
        bgColor: 'red.500'
      });
    }

    try {
      const task: ITask = { name: taskName, finished: false };
      await taskCreate(task);
      setTaskName('');
      inputRef?.current?.blur();
      await handleGetTasks();
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({ title: error.message, bgColor: 'red.500' });
      }
    }
  }, [taskName]);

  const handleUpdateTask = useCallback(async (item: ITask) => {
    try {
      const task: ITask = { name: item.name, finished: !item.finished };
      await taskUpdate(task);
      await handleGetTasks();
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({ title: error.message, bgColor: 'red.500' });
      }
    }
  }, []);

  const handleRemoveTask = useCallback(async (item: ITask) => {
    try {
      await taskRemove(item);
      await handleGetTasks();
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({ title: error.message, bgColor: 'red.500' });
      }
    }
  }, []);

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

  return (
    <VStack bg="gray.600" flex={1}>
      <VStack bg="gray.700" mb={6} pt={16} px={6} pb={6} alignItems="center">
        <Image source={logoPng} alt="Todo" />

        <HStack top={12}>
          <Input
            ref={inputRef}
            bg="gray.500"
            flex={1}
            h={14}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="white"
            fontFamily="body"
            placeholderTextColor="gray.300"
            placeholder="Adicione uma nova tarefa"
            value={taskName}
            onChangeText={setTaskName}
            _focus={{
              bg: 'gray.500',
              borderWidth: 1,
              borderColor: 'primary.500'
            }}
          />

          <Button
            bg="secondary.700"
            p={5}
            ml={1}
            rounded="md"
            _pressed={{ bg: 'secondary.500' }}
            onPress={handleCreateTask}
          >
            <Icon as={Feather} name="plus-circle" w={16} h={16} color="white" />
          </Button>
        </HStack>
      </VStack>

      <HStack
        mt={8}
        mx={6}
        pb={5}
        justifyContent="space-between"
        borderBottomWidth={!tasks.length ? 1 : 0}
        borderBottomColor="gray.500"
      >
        <HStack alignItems="center">
          <Text fontSize={14} color="secondary.500" fontFamily="heading">Criadas</Text>

          <Box bg="gray.500" px={2} rounded="lg" ml={2}>
            <Text color="white">{tasks.length}</Text>
          </Box>
        </HStack>

        <HStack alignItems="center">
          <Text fontSize={14} color="primary.500" fontFamily="heading">Concluidas</Text>

          <Box bg="gray.500" px={2} rounded="lg" ml={2}>
            <Text color="white">{tasks.filter(task => task.finished).length}</Text>
          </Box>
        </HStack>
      </HStack>

      <FlatList
        data={tasks}
        keyExtractor={item => item.name}
        _contentContainerStyle={{ px: 6 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUpdateTask(item)}>
            <HStack
              bg="gray.500"
              p={3}
              alignItems="center"
              borderWidth={1}
              borderColor="gray.400"
              rounded="md"
              mb={2}
            >
              <Checkbox
                value={String(item.finished)}
                isChecked={item.finished}
                accessibilityLabel="Tarefa"
                rounded="full"
                bg="transparent"
                borderColor="secondary.500"
                _checked={{
                  borderColor: 'primary.500',
                  bg: 'primary.500'
                }}
              />

              <Text
                color={item.finished ? 'gray.300' : 'white'}
                flexShrink={1}
                numberOfLines={2}
                ml={4}
                textDecorationLine={item.finished ? 'line-through' : 'initial'}
              >
                {item.name}
              </Text>

              <Button
                onPress={() => handleRemoveTask(item)}
                bg="transparent"
                ml="auto"
                _pressed={{ bg: 'gray.400' }}
              >
                <Icon as={Feather} name="trash-2" color="gray.300" w={16} h={16} />
              </Button>
            </HStack>
          </TouchableOpacity>
        )}
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