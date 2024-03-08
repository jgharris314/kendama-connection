import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { QUERY_KEY } from "constants/queryKeys"
import { ResponseError } from "utils/Errors/ResponseError"
import { User } from "./useUser"
import type { LoginFormData } from "../Login"
import Post from "api/post"

async function signIn(formData: LoginFormData): Promise<User> {
  const response = await Post<LoginFormData>("/auth/login", formData)
  const resJson = await response.json()
  if (!response.ok) {
    throw new ResponseError(resJson.error, response)
  }

  return resJson
}

type IUseSignIn = UseMutateFunction<User, unknown, LoginFormData, unknown>

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { mutate: signInMutation } = useMutation<
    User,
    unknown,
    LoginFormData,
    unknown
  >({
    mutationFn: (data: LoginFormData) => signIn(data),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data)
      navigate("/")
    },
    onError: (error: any) => {
      enqueueSnackbar(error.toString(), {
        variant: "error",
      })
    },
  })

  return signInMutation
}
