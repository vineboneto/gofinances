import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;

  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;

  align-items: center;
  flex-direction: row;

  margin-bottom: 16px;
`

export const ImageContainer = styled.View`
  height: 100%;

  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;

  border-color: ${(props) => props.theme.colors.background};

  border-right-width: 1px;
`

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${(props) => props.theme.fonts.middle};
  font-size: ${RFValue(14)}px;
`
