import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'

import AppLoading from 'expo-app-loading'
import { Routes } from '@/routes'
import { AuthProvider, useAuth } from '@/hooks'
import theme from '@/global/theme'
import { StatusBar } from 'react-native'

export default function App() {
  const { userStorageLoading } = useAuth()
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}
