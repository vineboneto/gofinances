import React, { useState } from 'react'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import AppleSvg from '@/assets/apple.svg'
import GoogleSvg from '@/assets/google.svg'
import LogoSvg from '@/assets/logo.svg'
import { SignInSocialButton } from '@/components'
import { Container, Header, TitleWrapper, Title, SignTitle, Footer, FooterWrapper } from './styles'
import { useAuth } from '@/hooks'

export function SignIn() {
  const theme = useTheme()
  const { signInWithGoogle, signInWithApple } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignInWithGoogle() {
    try {
      if (isLoading) return

      setIsLoading(true)

      return await signInWithGoogle()
    } catch (err: any) {
      console.log(err.message)
      Alert.alert('Não foi possível conectar na conta google')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      if (isLoading) return

      setIsLoading(true)

      return await signInWithApple()
    } catch (err: any) {
      console.log(err.message)
      Alert.alert('Não foi possível conectar na conta apple')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignTitle>Faça seu login {'\n'} uma das contas abaixo</SignTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
          {Platform.OS === 'ios' && (
            <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWithApple} />
          )}
        </FooterWrapper>
        {isLoading && <ActivityIndicator style={{ marginTop: 18 }} color={theme.colors.shape} size="large" />}
      </Footer>
    </Container>
  )
}
