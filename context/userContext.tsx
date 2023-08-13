import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies } from 'nookies'

type userContextProviderProps = {
  children: ReactNode
}

type userContextProps = {
  setUser: any
  user: User | null
}

type User = {
  username: string
  email: string
  photo: string
  number: string
  _id: string
  uid: string
  doc: string
}

export const UserContext = createContext({} as userContextProps)

export const UserContextProvider: React.FC<userContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const { US: token } = parseCookies()


  useEffect(() => {
    if (token) {
      setUser(JSON.parse(token))
    }
  }, [token])

  return <UserContext.Provider value={{ setUser, user }}>{children}</UserContext.Provider>
}