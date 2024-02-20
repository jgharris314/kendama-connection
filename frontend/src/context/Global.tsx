import React, { createContext, useContext, useMemo, useState } from "react"

type GlobalContextProviderProps = {
  isLoggedIn: boolean
  user: any
  children: React.ReactNode
}

type GlobalContextData = {
  loggedInStatus: boolean
  setLoggedInStatus: React.Dispatch<React.SetStateAction<boolean>>
  user: any
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

export default function GlobalContextProvider({
  isLoggedIn,
  user,
  children,
}: GlobalContextProviderProps) {
  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(isLoggedIn)
  const value = useMemo(
    () => ({
      loggedInStatus,
      setLoggedInStatus,
      user,
    }),
    [loggedInStatus, user]
  )

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
