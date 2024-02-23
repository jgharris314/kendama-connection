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
import { SignupFormData } from "../Signup"
import Post from "api/post"

async function signUp(formData: SignupFormData): Promise<User> {
  const response = await Post<SignupFormData>("/users/new", formData)

  const resJson = await response.json()

  if (!response.ok) throw new ResponseError(resJson.error, response)

  return resJson
}

type IUseSignUp = UseMutateFunction<User, unknown, SignupFormData, unknown>

export function useSignUp(): IUseSignUp {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { mutate: signUpMutation } = useMutation<
    User,
    unknown,
    SignupFormData,
    unknown
  >({
    mutationFn: (data: SignupFormData) => signUp(data),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data)
      navigate("/")
    },
    onError: (error) => {
      enqueueSnackbar(error.toString(), {
        variant: "error",
      })
    },
  })

  return signUpMutation
}
