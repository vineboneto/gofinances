import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'

type IconsProps = {
  type: 'up' | 'down'
}

type ContainerProps = {
  isActive: boolean
  type: 'up' | 'down'
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-width: ${(props) => (props.isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.text};
  border-radius: 5px;

  ${(props) =>
    props.isActive &&
    props.type === 'up' &&
    css`
      background-color: ${(props) => props.theme.colors.success_light};
    `};
  ${(props) =>
    props.isActive &&
    props.type === 'down' &&
    css`
      background-color: ${(props) => props.theme.colors.attention_light};
    `};
`

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${(props) => (props.type === 'up' ? props.theme.colors.success : props.theme.colors.attention)};
`

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`
