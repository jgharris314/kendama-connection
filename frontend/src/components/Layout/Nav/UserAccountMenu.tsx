import NavItem from "./Desktop/NavItem"
import { useUser } from "pages/auth/hooks/useUser"
import { useSignOut } from "pages/auth/hooks/useSignOut"
import { getLoggedInStatus } from "utils/UserAuth/functions"
import {
  desktopNavItemParentStyles,
  desktopNavItemChildStyles,
} from "./constants"

export default function UserAccountMenu() {
  const logout = useSignOut()

  const userData = useUser()

  const loggedInStatus = getLoggedInStatus(userData)

  return loggedInStatus ? (
    <button
      type="button"
      className={desktopNavItemParentStyles}
      onClick={() => logout()}
    >
      <span className={desktopNavItemChildStyles}>Logout</span>
    </button>
  ) : (
    <>
      <div className="hidden md:flex">
        <NavItem href="/auth/signup" title="sign up" />
        <NavItem href="/auth/login" title="login" />
      </div>

      <div className="flex flex-col w-full md:hidden">
        <a
          type="button"
          href="/auth/signup"
          className={
            "capitalize w-full mb-4 pb-4 text-[20px] font-semibold border-white border-b-2 text-center"
          }
        >
          Sign Up
        </a>
        <a
          type="button"
          href="/auth/login"
          className={
            "capitalize w-full  pb-4 text-[20px] font-semibold border-white border-b-2 text-center"
          }
        >
          login
        </a>
      </div>
    </>
  )
}
