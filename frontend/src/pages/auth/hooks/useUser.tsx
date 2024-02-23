import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { QUERY_KEY } from "constants/queryKeys"
import * as userLocalStorage from "./user.localstore"
import get from "api/get"

export interface User {
  accessToken: string
  user: {
    email: string
    id: number
  }
}

interface IUseUser {
  message?: string
  error?: string
  user: User | null
}

export function useUser(): IUseUser {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: () => get("/auth/current"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStorage.getUser,
  })

  useEffect(() => {
    if (data) {
      if (data.error) {
        userLocalStorage.removeUser()
      }
    }
    if (!data) userLocalStorage.removeUser()
    else userLocalStorage.saveUser(data)
  }, [data])

  return data
}
