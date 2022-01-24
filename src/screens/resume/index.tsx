import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'styled-components/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { HistoryCard } from '@/components'
import {
  Container,
  Content,
  Header,
  Title,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadingContainer,
} from './styles'
import { categories } from '@/utils'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

export type TransactionData = {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

type CategoryData = {
  key: string
  name: string
  total: number
  totalFormatted: string
  percent: string
  color: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const theme = useTheme()

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate])
  )

  function handleChangeDate(action: 'next' | 'back') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    setIsLoading(true)
    const dataKey = '@gofinances:transactions'

    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter(
      (e: TransactionData) =>
        e.type === 'negative' &&
        new Date(e.date).getMonth() === selectedDate.getMonth() &&
        new Date(e.date).getFullYear() === selectedDate.getFullYear()
    )

    const expensiveTotal = expensives.reduce((accumulator: number, expensive: TransactionData) => {
      return accumulator + Number(expensive.amount)
    }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0

      expensives.forEach((e: TransactionData) => {
        if (e.category === category.key) {
          categorySum += Number(e.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(1)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          percent,
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <Content
          contentContainerStyle={{ paddingHorizontal: 24, flex: 1, paddingBottom: useBottomTabBarHeight() }}
          showsVerticalScrollIndicator={false}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('back')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percent"
              y="total"
              labelRadius={50}
              colorScale={totalByCategories.map((e) => e.color)}
              style={{
                labels: { fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape },
              }}
            />
          </ChartContainer>

          {totalByCategories.map((e) => (
            <HistoryCard key={e.key} title={e.name} amount={e.totalFormatted} color={e.color} />
          ))}
        </Content>
      )}
    </Container>
  )
}
