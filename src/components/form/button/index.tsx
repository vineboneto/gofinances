import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Title } from './styles'

type Props = Omit<RectButtonProps, 'onPress'> & {
  title: string
  onPress: () => void
}

export function Button({ title, onPress, ...props }: Props) {
  return (
    <Container onPress={onPress} {...props}>
      <Title>{title}</Title>
    </Container>
  )
}
