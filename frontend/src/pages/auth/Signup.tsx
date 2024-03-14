import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import { useSignUp } from "hooks/useSignUp"
import { useUser } from "hooks/useUser"
import { useEffect } from "react"
import { getLoggedInStatus } from "utils/UserAuth/functions"
import { useNavigate } from "react-router-dom"
export interface SignupFormData {
  username: string
  email: string
  password: string
  password_confirmation: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const methods = useForm<SignupFormData>({ mode: "onSubmit" })

  const signUp = useSignUp()
  const user = useUser()

  const onSignUp = (form: SignupFormData) => {
    const username = form.username
    const password = form.password
    const email = form.email
    const passwordConfirmation = form.password_confirmation

    if (username && password && passwordConfirmation && email) {
      signUp(form)
    }
  }

  useEffect(() => {
    if (getLoggedInStatus(user)) {
      navigate("/")
    }
  })

  const parentClasses = "text-white items-center flex flex-col"
  const inputClasses = "h-10 rounded  text-black max-w-[200px]"
  const labelClasses = "text-m0othGrey- whitespace-nowrap p-1"
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="standard-header">Create an account!</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSignUp)}
          className="flex flex-col w-full lg:w-3/4 items-center rounded border border-kenConnect-white bg-kenConnect-white/5 py-4"
        >
          <div className="max-w-[700px]">
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
              name="email"
              id="email"
              parentClasses={parentClasses}
              inputClasses={inputClasses}
              label="Email"
              labelClasses={labelClasses}
              validation={{ required: "Email is required" }}
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
            <Input
              name="password_confirmation"
              id="password_confirmation"
              parentClasses={parentClasses}
              inputClasses={inputClasses}
              label="Confirm Password"
              labelClasses={labelClasses}
              validation={{ required: "Password confirmation is required" }}
              type="password"
            />
          </div>
          <button className="button button-yellow my-4" type="submit">
            Sign up!
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
