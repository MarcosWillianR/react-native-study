import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import Group from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [activeGroupName, setActiveGroupName] = useState('');
  const [groups, setGroups] = useState(['costas', 'ombro', 'biceps']);
  const [exercises, setExercises] = useState(['1', '2', '3', '4', '5', '6']);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const navigateToExerciseDetail = useCallback(() => {
    navigation.navigate('exercise');
  }, []);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setActiveGroupName(item)}
            isActive={activeGroupName === item}
          />
        )}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercicios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => <ExerciseCard onPress={navigateToExerciseDetail} />}
        />
      </VStack>
    </VStack>
  )
}