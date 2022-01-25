import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as GoogleAuthentication from 'expo-google-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string
  name: string
  email: string
  photo?: string
}

type Props = {
  children: ReactNode
}

type AuthContextProps = {
  user: User
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  signOut: () => Promise<void>
  userStorageLoading: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setStorageLoading] = useState(true)

  const userStorageKey = '@gofinances:user'

  async function signInWithGoogle() {
    try {
      const result = await GoogleAuthentication.logInAsync({
        androidClientId: process.env.EXPO_ANDROID_ID,
        iosClientId: process.env.EXPO_APPLE_ID,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id)!,
          email: result.user.email!,
          name: result.user.givenName!,
          photo: result.user.photoUrl,
        }
        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      if (credential) {
        const name = credential.fullName!.givenName!
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo: `https://ui-avatars.com/api?name=${name}&length=1`,
        }
        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    async function loadStorage() {
      const user = await AsyncStorage.getItem(userStorageKey)
      if (user) {
        setUser(JSON.parse(user))
      }
      setStorageLoading(false)
    }
    loadStorage()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut, userStorageLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, AuthContext, useAuth }
