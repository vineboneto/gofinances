import React from 'react'
import { SvgProps } from 'react-native-svg'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Button, ImageContainer, Text } from './styles'

type Props = RectButtonProps & {
  title: string
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg, ...props }: Props) {
  return (
    <Button {...props}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  )
}
