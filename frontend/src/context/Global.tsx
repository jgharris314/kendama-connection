import { IUseUser, useUser } from "pages/auth/hooks/useUser"
import React, { createContext, useContext, useMemo, useState } from "react"

type GlobalContextProviderProps = {
  children: React.ReactNode
}

type GlobalContextData = {
  isLoggedIn: boolean
  user: IUseUser
  setUser: React.Dispatch<React.SetStateAction<IUseUser>>
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

function getLoggedInStatus(user: IUseUser) {
  return user?.message?.toLowerCase()?.includes("successfully") ? true : false
}

export default function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const initalUser = useUser()

  const [user, setUser] = useState(initalUser)

  const isLoggedIn = getLoggedInStatus(user)

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      setUser,
    }),
    [isLoggedIn, user]
  )

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGlobalContext() {
  return useContext(GlobalContext)
}
