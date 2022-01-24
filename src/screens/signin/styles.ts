import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${(props) => props.theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`
export const TitleWrapper = styled.View`
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.middle};
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(30)}px;
  text-align: center;
  margin-top: 45px;
`

export const SignTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(16)}px;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 67px;
`

export const Footer = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 30%;
`

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
`
