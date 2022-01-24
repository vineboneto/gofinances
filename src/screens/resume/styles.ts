import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
`
export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;

  padding: 24px;
`

export const Fields = styled.View``

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`

export const Content = styled.ScrollView``

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 24px;
`

export const MonthSelectButton = styled(BorderlessButton)``

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`

export const Month = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
