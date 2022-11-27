import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, TotalPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [activeTeam, setActiveTeam] = useState('');
  const [players, setPlayers] = useState([]);

  const handleRemovePlayer = useCallback((playerName: string) => {
    setPlayers(state => state.filter(player => player !== playerName))
  }, []);

  return (
    <Container>
      <Header backButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
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
        <TotalPlayers>{players.length}</TotalPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => <PlayerCard name={item} onRemove={handleRemovePlayer} />}
        ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button type="SECONDARY">Remover Turma</Button>
    </Container>
  )
}