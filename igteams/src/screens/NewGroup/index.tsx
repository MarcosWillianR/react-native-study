import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { groupCreate } from '@storage/group/groupCreate';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const { navigate } = useNavigation();

  const [group, setGroup] = useState('');

  const handleNew = useCallback(async () => {
    try {
      await groupCreate(group);
      navigate('players', { group });
    } catch (error) {
      console.log(error);
    }
  }, [group]);

  return (
    <Container>
      <Header backButton />

      <Content>
        <Icon />

        <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas" />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button onPress={handleNew} style={{ marginTop: 20 }}>Criar</Button>
      </Content>
    </Container>
  )
}