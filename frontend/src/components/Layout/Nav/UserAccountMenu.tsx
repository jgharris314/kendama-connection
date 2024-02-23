import NavItem from "./Desktop/NavItem"
import { useUser } from "pages/auth/hooks/useUser"
import { useSignOut } from "pages/auth/hooks/useSignOut"
import { getLoggedInStatus } from "utils/UserAuth/functions"

export default function UserAccountMenu() {
  const logout = useSignOut()

  const userData = useUser()

  const loggedInStatus = getLoggedInStatus(userData)

  return loggedInStatus ? (
    <button
      type="button"
      className="bg-black bg-gradient-to-t from-black/90 to-black/50 h-16 w-40 text-white"
      onClick={() => logout()}
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
