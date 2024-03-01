import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import { QUERY_KEY } from "constants/queryKeys"
import post from "api/post"
import { useGlobalContext } from "context/Global"

type IUseSignOut = () => void

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setUser } = useGlobalContext()

  const onSignOut = useCallback(() => {
    post("/auth/logout", {})
    queryClient.setQueryData([QUERY_KEY.user], null)
    setUser({ error: "Not authenticated", user: null })
    navigate("/auth/login")
  }, [navigate, queryClient, setUser])

  return onSignOut
}
