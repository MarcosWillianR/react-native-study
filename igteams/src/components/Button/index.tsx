import { TouchableOpacityProps } from 'react-native';

import { Container, Title, ButtonTypeStyleProps } from './styles';

type Props = TouchableOpacityProps & {
  type?: ButtonTypeStyleProps;
}

export function Button({ children, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Title>{children}</Title>
    </Container>
  )
}