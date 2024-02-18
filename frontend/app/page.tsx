import fetcher from "@/app/api/fetcher"
import Nav from "@/app/components/Nav"
import Image from "next/image"

export default async function Home() {
  const data = await fetcher("/users")

  console.dir(data)
  return (
    <main className="relative flex min-h-screen flex-col items-center w-full pb-[200px] bg-black bg-gradient-to-t from-black/50 to-black/10">
      <div className="flex w-full h-[10rem] items-center justify-center bg-blue-500">
        Kendama Connetion
      </div>
    </main>
  )
}
