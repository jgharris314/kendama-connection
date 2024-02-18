"use client"
import { useGlobalContext } from "@/app/context/Global"
import fetcher from "@/app/api/fetcher"
import { useRouter } from "next/navigation"
import NavItem from "./Desktop/NavItem"

export default function UserAccountMenu() {
  const router = useRouter()
  const { loggedInStatus, setLoggedInStatus } = useGlobalContext()

  async function handleLogout() {
    try {
      const res = await fetcher("/auth/logout", {})
      if (res.message === "Logged out successfully") {
        setLoggedInStatus(false)
        router.push("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return loggedInStatus ? (
    <button
      type="button"
      className="bg-black bg-gradient-to-t from-black/90 to-black/50 h-16 w-40 text-white"
      onClick={() => handleLogout()}
    >
      Logout
    </button>
  ) : (
    <NavItem href="/auth/login" title="login" />
  )
}
