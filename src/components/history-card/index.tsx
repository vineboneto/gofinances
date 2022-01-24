import React from 'react'
import { Container, Title, Amount } from './styles'

type Props = {
  title: string
  amount: string
  color: string
}

export function HistoryCard({ title, amount, color }: Props) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
