import { useGlobalContext } from "context/Global"
import fetcher from "api/fetcher"
import { useNavigate } from "react-router-dom"
import NavItem from "./Desktop/NavItem"

export default function UserAccountMenu() {
  const navigate = useNavigate()
  const { loggedInStatus, setLoggedInStatus } = useGlobalContext()

  async function handleLogout() {
    try {
      const res = await fetcher("/auth/logout", {})
      if (res.message === "Logged out successfully") {
        setLoggedInStatus(false)
        navigate("/")
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
    <>
      <NavItem href="/auth/signup" title="Create Account" /> or
      <NavItem href="/auth/login" title="login" />
    </>
  )
}
