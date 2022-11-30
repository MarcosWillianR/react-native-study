import { useState, useCallback, useMemo } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';

import { Container, Form, HeaderList, TotalPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [activeTeam, setActiveTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleGetPlayersByGroup = useCallback(async () => {
    try {
      const data = await playersGetByGroup(group);
      setPlayers(data);
    } catch (error) {
      console.log(error);
    }
  }, [group]);

  const handleRemovePlayer = useCallback(async (playerName: string) => {
    const newPlayer: PlayerStorageDTO = { name: playerName, team: activeTeam }
    await playerRemoveByGroup(newPlayer, group);
    await handleGetPlayersByGroup();
  }, [activeTeam, handleGetPlayersByGroup]);

  const handleAddPlayer = useCallback(async () => {
    try {
      if (!newPlayerName.trim().length) {
        return Alert.alert('Novo Jogador', 'Informe o nome do jogador.');
      }
      const newPlayer: PlayerStorageDTO = { name: newPlayerName, team: activeTeam }
      await playerAddByGroup(newPlayer, group)
      await handleGetPlayersByGroup();
      setNewPlayerName('');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Jogador', error.message)
      } else {
        Alert.alert('Novo Jogador', 'Não foi possível criar um novo jogador');
        console.log(error);
      }
    }
  }, [newPlayerName, activeTeam, group]);

  const filteredPlayersByGroup = useMemo(() => {
    return players.filter(player => player.team === activeTeam);
  }, [players, activeTeam]);

  useFocusEffect(useCallback(() => {
    handleGetPlayersByGroup();
  }, []));

  return (
    <Container>
      <Header backButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === activeTeam}
              onPress={() => setActiveTeam(item)}
            />
          )}
        />
        <TotalPlayers>{filteredPlayersByGroup.length}</TotalPlayers>
      </HeaderList>

      <FlatList
        data={filteredPlayersByGroup}
        keyExtractor={item => item.name}
        renderItem={({ item }) => <PlayerCard name={item.name} onRemove={handleRemovePlayer} />}
        ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          filteredPlayersByGroup.length === 0 && { flex: 1 }
        ]}
      />

      <Button type="SECONDARY">Remover Turma</Button>
    </Container>
  )
}