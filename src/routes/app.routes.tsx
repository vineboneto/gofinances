import React from 'react'
import { Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Pages from '@/screens'
const { Navigator, Screen } = createBottomTabNavigator()

export type RootBottomTabsParamsList = {
  Listagem: undefined
  Cadastrar: undefined
  Resumo: undefined
}

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Pages.Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons name="format-list-bulleted" color={color} size={size} />,
        }}
      />
      <Screen
        name="Cadastrar"
        component={Pages.Register}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons name="attach-money" color={color} size={size} />,
        }}
      />
      <Screen
        name="Resumo"
        component={Pages.Resume}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons name="pie-chart" color={color} size={size} />,
        }}
      />
    </Navigator>
  )
}
