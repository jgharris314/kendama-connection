import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { useSignOut } from "hooks/useSignOut"
import { useUser } from "hooks/useUser"
import SectionContainer from "../../../SectionContainer"
import {
  desktopNavItemChildStyles,
  desktopNavItemParentStyles,
  navOptions,
} from "../constants"

import { getLoggedInStatus } from "utils/UserAuth/functions"

export default function DesktopNav() {
  const user = useUser()
  const isLoggedIn = getLoggedInStatus(user)
  const onSignOut = useSignOut()
  const navigate = useNavigate()

  function onClickHandler(option: string) {
    const route = option.toLowerCase() === "home" ? "/" : `/${option}`
    navigate(route)
  }

  return (
    <SectionContainer bgClasses="hidden lg:block bg-kenConnect-black bg-gradient-to-t from-black/50 to-black/10 fixed h-[3.5rem] w-screen left-0 top-0 z-50 !pt-0 shadow-lg shadow-kenConnect-black ">
      <div className="relative flex w-full justify-between h-[3.5rem] items-center">
        <div className="w-full">[LOGO]</div>
        <ul className="flex w-full justify-end gap-4">
          {navOptions.map((option) => {
            return (
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onClickHandler(option)}
                className={desktopNavItemParentStyles}
              >
                <span className={desktopNavItemChildStyles}>{option}</span>
              </button>
            )
          })}
          {isLoggedIn ? (
            <>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onClickHandler("account")}
                className={desktopNavItemParentStyles}
              >
                <span className={desktopNavItemChildStyles}>Account</span>
              </button>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onSignOut()}
                className={desktopNavItemParentStyles}
              >
                <span className={desktopNavItemChildStyles}>logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onClickHandler("auth/signup")}
                className={desktopNavItemParentStyles}
              >
                <span className={desktopNavItemChildStyles}>Sign Up</span>
              </button>
              <button
                key={uuidv4()}
                type="button"
                onClick={() => onClickHandler("auth/login")}
                className={desktopNavItemParentStyles}
              >
                <span className={desktopNavItemChildStyles}>login</span>
              </button>
            </>
          )}
        </ul>
      </div>
    </SectionContainer>
  )
}
