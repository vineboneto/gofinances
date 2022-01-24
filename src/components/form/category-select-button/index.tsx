import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Container, Category, Icon } from './styles'

type Props = RectButtonProps & {
  title: string
}

export function CategorySelectButton({ title, ...props }: Props) {
  return (
    <Container {...props} activeOpacity={0.7}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
