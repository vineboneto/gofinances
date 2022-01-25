import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { ActivityIndicator } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  LogoutButton,
  LoadingContainer,
} from './styles'
import { useAuth } from '@/hooks'

export type DataListProps = TransactionCardProps & {
  id: string
}

type HighlightProps = {
  amount: string
  lastTransaction: string
}

type HighlightData = {
  entries: HighlightProps
  expensive: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const theme = useTheme()
  const { signOut, user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [transaction, setTransaction] = useState<DataListProps[]>([])
  const [highlightData, setHighLightData] = useState<HighlightData>({} as HighlightData)

  const getLastTransactionDate = (collection: DataListProps[], type: 'positive' | 'negative') => {
    const collectionFiltered = collection.filter((e) => e.type === type)
    if (collectionFiltered.length === 0) {
      return 0
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFiltered.map((e) => new Date(e.date).getTime())
      )
    )
    const lastTransactionFormatted = `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString('pt-BR', {
      month: 'long',
    })}`

    return lastTransactionFormatted
  }

  const loadTransactions = async () => {
    let entriesTotal = 0
    let expensiveTotal = 0
    const dataKey = `@gofinances:transactions_user=${user.id}`

    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []
    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount)
      } else {
        expensiveTotal += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        type: item.type,
        category: item.category,
        amount,
        date,
      }
    })
    setTransaction(transactionsFormatted)

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative')

    const totalInterval = lastTransactionExpensive === 0 ? 'Não há transações' : `01 a ${lastTransactionExpensive}`

    const total = entriesTotal - expensiveTotal
    setHighLightData({
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransactionExpensive === 0 ? 'Não há transações' : `Última entrada dia ${lastTransactionExpensive}`,
      },
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransactionEntries === 0 ? 'Não há transações' : `Última saída dia ${lastTransactionEntries}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    })
    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighLightCards>
            <HightLightCard
              title="Entrada"
              amount={highlightData.entries?.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HightLightCard
              title="Saídas"
              amount={highlightData.expensive?.amount}
              lastTransaction={highlightData.expensive.lastTransaction}
              type="down"
            />
            <HightLightCard
              title="Total"
              amount={highlightData.total?.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </HighLightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getBottomSpace(),
              }}
              keyExtractor={(item: any) => item.id}
              data={transaction}
              renderItem={({ item }: any) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  )
}
