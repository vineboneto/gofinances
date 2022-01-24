import React from 'react'

import { categories } from '@/utils'
import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from './styles'

export type TransactionCardProps = {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

type Props = {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  const category = categories.find((item) => item.key === data.category)!

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>{data.type === 'negative' ? `- ${data.amount}` : data.amount}</Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
