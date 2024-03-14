import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import { useSignIn } from "hooks/useSignIn"
import { useUser } from "hooks/useUser"
import { getLoggedInStatus } from "utils/UserAuth/functions"
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

  const parentClasses = "text-kenConnect-white items-center flex flex-col"
  const inputClasses = "h-10 rounded  text-black max-w-[200px]"
  const labelClasses = "whitespace-nowrap p-1"
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="standard-header underline-offset-[1.25rem] text-center leading-[60px] md:leading-[96px]">
        Welcome Back, Slayer!
      </h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSignIn)}
          className="flex flex-col w-full lg:w-3/4 items-center rounded border border-kenConnect-white bg-kenConnect-white/5 py-4"
        >
          <div className="flex flex-col  max-w-[700px]">
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
          </div>
          <button type="submit" className="button button-yellow my-4">
            Log In
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
