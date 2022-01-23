import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { Input } from '../input'
import { Container, Error } from './styles'

type Props = TextInputProps & {
  control: Control
  name: string
  error: string
}

export function InputForm({ control, name, error, ...props }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => <Input onChangeText={onChange} value={value} {...props} />}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}
