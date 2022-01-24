import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { AppRoutes } from '@/routes'
import theme from '@/global/theme'
import { StatusBar } from 'react-native'

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}
