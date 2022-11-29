import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
  const { navigate } = useNavigation();

  const [groups, setGroups] = useState<string[]>([]);

  const handleNewGroup = useCallback(() => {
    navigate('newGroup');
  }, []);

  const handleOpenGroup = useCallback((group: string) => {
    navigate('players', { group });
  }, []);

  useFocusEffect(useCallback(() => {
    async function getStoredGroups() {
      try {
        const data = await groupGetAll();
        setGroups(data);
      } catch (error) {
        console.log(error);
      }
    }
    getStoredGroups();
  }, []));

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard onPress={() => handleOpenGroup(item)} title={item} />}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        showsVerticalScrollIndicator={false}
      />

      <Button onPress={handleNewGroup}>Criar nova turma</Button>
    </Container>
  );
}