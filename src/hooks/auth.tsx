import React, { createContext, ReactNode, useContext, useState } from 'react'
import * as AuthSession from 'expo-auth-session'

type User = {
  id: string
  name: string
  email: string
  photo?: string
}

type AuthorizationResponse = {
  params: {
    access_token: string
  }
  type: string
}

type Props = {
  children: ReactNode
}

type AuthContextProps = {
  user: User
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User)

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.EXPO_CLIENT_ID}&redirect_uri=${process.env.EXPO_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      const { type, params } = (await AuthSession.startAsync({ authUrl })) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        )
        const userInfo = await response.json()
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        })
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, AuthContext, useAuth }
