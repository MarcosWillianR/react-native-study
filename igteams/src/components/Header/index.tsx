import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Logo, BackButton, BackIcon } from './styles';

import logoImg from '@assets/logo.png';

type Props = {
  backButton?: boolean;
}

export function Header({ backButton = false }: Props) {
  const { navigate } = useNavigation();

  const handleGoBack = useCallback(() => {
    navigate('groups');
  }, []);

  return (
    <Container>
      {backButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}