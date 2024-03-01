import { useUser } from "pages/auth/hooks/useUser"
import React, { createContext, useContext, useMemo, useState } from "react"

type GlobalContextProviderProps = {
  children: React.ReactNode
}

type GlobalContextData = {
  isLoggedIn: boolean
  user: unknown
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

function getLoggedInStatus(user: Record<string, any>) {
  return user?.message?.toLowerCase().includes("successfully")
}

export default function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const user = useUser()

  const isLoggedIn = getLoggedInStatus(user)

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
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
