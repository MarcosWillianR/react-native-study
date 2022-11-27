import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const { navigate } = useNavigation();

  const [group, setGroup] = useState('');

  const handleNew = useCallback(() => {
    navigate('players', { group });
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