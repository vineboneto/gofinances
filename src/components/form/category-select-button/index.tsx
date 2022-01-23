import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Container, Category, Icon } from './styles'

type Props = TouchableOpacityProps & {
  title: string
}

export function CategorySelectButton({ title, ...props }: Props) {
  return (
    <Container {...props}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
