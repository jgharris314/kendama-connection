import fetcher from "@/app/api/fetcher"
import Image from "next/image"

export default async function Home() {
  const data = await fetcher("/users")

  console.dir(data)
  return (
    <main>
      <div className="flex w-full h-[10rem] items-center justify-center bg-blue-500">
        Kendama Connetion
      </div>
    </main>
  )
}
