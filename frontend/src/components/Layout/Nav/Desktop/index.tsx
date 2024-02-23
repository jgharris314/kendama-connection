import { v4 as uuidv4 } from "uuid"
import SectionContainer from "../../../SectionContainer"
import {
  navItemChildStyles,
  navItemParentStyles,
  navOptions,
} from "../constants"
import { useNavigate } from "react-router-dom"

export default function DesktopNav() {
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
                className={navItemParentStyles}
              >
                <span className={navItemChildStyles}>{option}</span>
              </button>
            )
          })}
          <button
            key={uuidv4()}
            type="button"
            onClick={() => onClickHandler("auth/signup")}
            className={navItemParentStyles}
          >
            <span className={navItemChildStyles}>Sign Up</span>
          </button>
          <button
            key={uuidv4()}
            type="button"
            onClick={() => onClickHandler("auth/login")}
            className={navItemParentStyles}
          >
            <span className={navItemChildStyles}>login</span>
          </button>
        </ul>
      </div>
    </SectionContainer>
  )
}
