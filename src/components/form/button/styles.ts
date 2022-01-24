import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};

  padding: 18px;
  border-radius: 5px;
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.middle};
  font-size: ${RFValue(14)}px;

  color: ${(props) => props.theme.colors.shape};
`
