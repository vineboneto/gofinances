import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { TextInput } from 'react-native'

export const Container = styled(TextInput)`
  width: 100%;

  padding: 16px 18px;
  margin-bottom: 8px;

  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text_dark};

  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;
`
