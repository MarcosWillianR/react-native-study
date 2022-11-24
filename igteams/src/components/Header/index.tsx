import { Container, Logo, BackButton, BackIcon } from './styles';

import logoImg from '@assets/logo.png';

type Props = {
  backButton?: boolean;
}

export function Header({ backButton = false }: Props) {
  return (
    <Container>
      {backButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}