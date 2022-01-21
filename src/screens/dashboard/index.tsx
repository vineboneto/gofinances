import React from 'react'

import { HightLightCard, TransactionCard, TransactionCardProps } from '@/components'
import {
  Container,
  Header,
  UserInfo,
  UserWrapper,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles'

export type DataListProps = TransactionCardProps & {
  id: string
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2020',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: { name: 'Alimentação', icon: 'coffee' },
      date: '13/04/2020',
    },
    {
      id: '3',
      type: 'positive',
      title: 'Compras',
      amount: 'R$ 12.000,00',
      category: { name: 'Casa', icon: 'shopping-bag' },
      date: '13/04/2020',
    },
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/58813966?v=4' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Vinicius</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HightLightCard
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
          type="up"
        />
        <HightLightCard
          title="Saídas"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
          type="down"
        />
        <HightLightCard
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
          type="total"
        />
      </HighLightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          keyExtractor={(item: any) => item.id}
          data={data}
          renderItem={({ item }: any) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
