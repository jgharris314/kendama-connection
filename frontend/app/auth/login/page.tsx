"use client"
import { FormProvider, useForm } from "react-hook-form"
import Input from "@/app/components/elements/Input"
import fetcher from "@/app/api/fetcher"
import { useRouter } from "next/navigation"
import { useGlobalContext } from "@/app/context/Global"
interface FormData {
  username: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const methods = useForm<FormData>({ mode: "onSubmit" })
  const { setLoggedInStatus } = useGlobalContext()

  async function onSubmit(data: FormData) {
    try {
      const res = await fetcher("/auth/login", data)

      if (res.message === "Logged in successfully") {
        setLoggedInStatus(true)
        router.push("/")
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
          />
          <button className="h-10" type="submit">
            Log In
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
