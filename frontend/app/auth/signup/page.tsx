"use client"
import { FormProvider, useForm } from "react-hook-form"
import Input from "@/app/components/elements/Input"
import fetcher from "@/app/api/fetcher"
import { useRouter } from "next/navigation"

interface FormData {
  username: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const methods = useForm<FormData>({ mode: "onSubmit" })

  async function onSubmit(data: FormData) {
    try {
      const res = await fetcher("/users/new", data)
      if (res.data) {
        if (window.confirm("User Created Successfully")) {
          router.push("/auth/login")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const parentClasses = "text-white items-center flex flex-col"
  const inputClasses = "h-10 rounded  text-black max-w-[200px]"
  const labelClasses = "text-m0othGrey- whitespace-nowrap p-1"
  return (
    <div className="flex flex-col w-full items-center">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col max-w-[700px]"
        >
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
          />
          <Input
            name="password_confirmation"
            id="password_confirmation"
            parentClasses={parentClasses}
            inputClasses={inputClasses}
            label="Confirm Password"
            labelClasses={labelClasses}
            validation={{ required: "Password confirmation is required" }}
          />
          <button className="h-10" type="submit">
            Log In
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
