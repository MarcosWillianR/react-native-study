import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  return (
    <Container>
      <Header backButton />

      <Content>
        <Icon />

        <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas" />

        <Input placeholder="Nome da turma" />

        <Button style={{ marginTop: 20 }}>Criar</Button>
      </Content>
    </Container>
  )
}