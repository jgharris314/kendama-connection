import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import { useSignIn } from "./hooks/useSignIn"
import { useEffect } from "react"
import { getLoggedInStatus } from "utils/UserAuth/functions"
import { useUser } from "./hooks/useUser"
import { useNavigate } from "react-router-dom"
export interface LoginFormData {
  username: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const methods = useForm<LoginFormData>({ mode: "onSubmit" })
  const signIn = useSignIn()
  const user = useUser()

  const onSignIn = (form: LoginFormData) => {
    const username = form.username
    const password = form.password

    if (typeof username === "string" && typeof password === "string") {
      signIn({
        username,
        password,
      })
    }
  }

  useEffect(() => {
    if (getLoggedInStatus(user)) {
      navigate("/")
    }
  }, [navigate, user])

  const parentClasses = "text-white items-center flex flex-col"
  const inputClasses = "h-10 rounded  text-black max-w-[200px]"
  const labelClasses = "text-m0othGrey- whitespace-nowrap p-1"
  return (
    <div className="flex flex-col w-full items-center">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSignIn)}
          className="flex flex-col max-w-[700px]"
        >
          {" "}
          <Input
            name="username"
            id="username"
            parentClasses={parentClasses}
            inputClasses={inputClasses}
            label="Username"
            labelClasses={labelClasses}
            validation={{ required: "Username is required" }}
          />
          <Input
            name="password"
            id="password"
            parentClasses={parentClasses}
            inputClasses={inputClasses}
            label="Password"
            labelClasses={labelClasses}
            validation={{ required: "Password is required" }}
            type="password"
          />
          <button
            type="submit"
            className="bg-kenConnect-yellow h-16 w-32 rounded mx-auto my-4"
          >
            Log In
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
