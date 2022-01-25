import React from 'react'
import { Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import AppleSvg from '@/assets/apple.svg'
import GoogleSvg from '@/assets/google.svg'
import LogoSvg from '@/assets/logo.svg'
import { SignInSocialButton } from '@/components'
import { Container, Header, TitleWrapper, Title, SignTitle, Footer, FooterWrapper } from './styles'
import { useAuth } from '@/hooks'

export function SignIn() {
  const { signInWithGoogle } = useAuth()

  async function handleSignInWIthGoogle() {
    try {
      await signInWithGoogle()
    } catch (err: any) {
      console.log(err.message)
      Alert.alert('Não foi possível conectar na conta google')
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
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWIthGoogle} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
