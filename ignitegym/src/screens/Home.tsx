import { useState } from "react";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import Group from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [activeGroupName, setActiveGroupName] = useState('');
  const [groups, setGroups] = useState(['costas', 'ombro', 'biceps']);

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
            4
          </Text>
        </HStack>

        <ExerciseCard />

        <ExerciseCard />
      </VStack>
    </VStack>
  )
}