import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

type CategoryProps = {
  isActive: boolean
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
`

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  background-color: ${(props) => (props.isActive ? props.theme.colors.secondary_light : props.theme.colors.background)};

  flex-direction: row;
  align-items: center;
`
export const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`

export const Separator = styled.View`
  height: 1px;
  width: 100%;

  background-color: ${(props) => props.theme.colors.text};
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`
